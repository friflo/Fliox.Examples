using System;
using Friflo.Json.Fliox.Hub.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Hosting.Server.Features;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace DemoHub
{
    /// <summary>
    /// Bootstrapping of ASP.NET Core 3, 3.1, 5 and adding the Hub returned by <see cref="Program.CreateHttpHost"/>.
    /// </summary> 
    public class Startup
    {
        internal static void Run(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        private static IHostBuilder CreateHostBuilder(string[] args)
        {
            return Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder => 
                        webBuilder.UseStartup<Startup>()
                            // .UseKestrel(options => {options.Listen(IPAddress.Loopback, 8010); }) // use http instead of https
                            .UseKestrel()
                            .UseUrls("http://*:8010") // required for Docker
                ).ConfigureLogging(logging => {
                    // single line logs
                    logging.ClearProviders();
                    logging.AddConsole(configure => { configure.FormatterName = "Systemd"; }); 
                });
        }
        
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
        {
            if (env.IsDevelopment()) {
                app.UseDeveloperExceptionPage();
            }
            var httpHost = Program.CreateHttpHost();
            var startPage = httpHost.GetStartPage(app.ServerFeatures.Get<IServerAddressesFeature>()!.Addresses);
            Console.WriteLine($"Hub Explorer - {startPage}\n");
            httpHost.sharedEnv.Logger = new HubLoggerAspNetCore(loggerFactory);

            app.UseRouting();
            app.UseWebSockets();

            app.UseEndpoints(endpoints => {
                endpoints.MapGet("hello/", () => "Hello World");
                // add redirect only to enable using http://localhost:8010 for debugging
                endpoints.MapGet("/", async context => {
                    context.Response.Redirect(httpHost.endpoint, false);
                    await context.Response.WriteAsync("redirect");
                });
                endpoints.Map("/fliox/{*path}", async context => {
                    var requestContext = await context.ExecuteFlioxRequest(httpHost).ConfigureAwait(false);
                    await context.WriteFlioxResponse(requestContext).ConfigureAwait(false);
                });
            });
        }
    }
}
