FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /app
# EXPOSE 8010
# ENV ASPNETCORE_URLS=http://+:8010
#
# copy csproj and restore as distinct layers
COPY *.sln .
COPY Demo/Client/*.csproj        ./Demo/Client/
COPY Demo/Hub/*.csproj           ./Demo/Hub/
#
RUN dotnet restore Demo/Hub/DemoHub.csproj
#
# copy everything else and build app
COPY Demo/Client/.               ./Demo/Client/
COPY Demo/Hub/.                  ./Demo/Hub/
COPY Demo/Test/.                 ./Demo/Test/
#
WORKDIR /app/Demo/Hub/
RUN dotnet publish DemoHub.csproj -c Release -o out
#
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS runtime

# copy test databases: main_db & user_db
COPY --from=build /app/Demo/Test/DB         /Test/DB

COPY Demo/Hub/bin/Release/net6.0/*.xml      /app/

WORKDIR /app 
#
COPY --from=build /app/Demo/Hub/out ./
ENTRYPOINT ["dotnet", "DemoHub.dll"]

# --- usage
# docker build -t demo-hub:latest .
# docker run -it --rm -p 80:8010 demo-hub:latest


 
 