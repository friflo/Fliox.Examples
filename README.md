

# ![logo](docs/images/Json-Fliox.svg)     **FlioxHub Demos**      ![SPLASH](docs/images/paint-splatter.svg)

[![.NET Tests](https://github.com/friflo/FlioxHub.Demos/workflows/.NET/badge.svg)](https://github.com/friflo/FlioxHub.Demos/actions)

This project contains two **ready to run** examples showing how to create and use
[**JSON Fliox**](https://github.com/friflo/Friflo.Json.Fliox) Clients & Hubs.  

The examples have a different set of features. Their features are listed [below](#features).  
This guides how to add a new or remove an existing features in an application.

Examples
- [**DemoHub**](#demohub) - *common* example
- [**TodoHub**](#todohub) - *minimal* example

Each example contains three C# projects

| folder   | project type      | description               | run command                                               |
|----------|-------------------|---------------------------|-----------------------------------------------------------|
| `Client` | .NET library      | database client & schema  |                                                           |
| `Hub`    | .NET HTTP server  | database Hub              | `dotnet run`                                              |
| `Test`   | NUnit tests       | client examples & test DB | `dotnet test` <br/> `dotnet run [http, ws, file, memory]` |

Build, Test and Run instructions [below](#build)



## **DemoHub**
📄   [README.md](Demo/Client/README.md)

Contains a *common* `Client`, a *common* `Hub` and unit tests. Additional to **TodoHub** the Hub supports:  
**ASP.NET Core** integration, **GraphQL** API, monitoring, user authorization, **Pub-Sub**, container relations and custom commands.  
It utilize [Bogus](https://github.com/bchavez/Bogus) to generate fake records in various containers
and uses [GraphQLParser](https://github.com/graphql-dotnet/parser) to support GraphQL.

The Hub Explorer at http://localhost:8010/fliox/ can be used to read, write, delete, query and subscribe records in the `main_db` containers.  
Try out the [**DemoHub on AWS**](http://ec2-174-129-178-18.compute-1.amazonaws.com/) - *EC2: t2-micro*, *us-east-1*  

|              | `Client`                     | `Hub`                                                                  |
|--------------|------------------------------|------------------------------------------------------------------------|
| C#           | 2 files - LOC 130            | 4 files - LOC bootstrap 80, ASP.NET Core 70, domain examples 280       |
| dependencies | **JSON Fliox** 4 dlls 850 KB | **JSON Fliox** 7 dlls 900 KB  **GraphQLParser** 300kb  **Bogus** 2.4MB |



## **TodoHub**
📄   [README.md](Todo/Client/README.md)

Contains a *minimal* `Client`, a *minimal* `Hub` and unit tests. The **TodoHub** supports:  
[Hub Explorer](https://github.com/friflo/Friflo.Json.Fliox#explorer), [ORM Client](https://github.com/friflo/Friflo.Json.Fliox#client),
HttpListener hosting, **REST / OpenAPI**, Batch API, database schema & code generation.  

The Hub Explorer at http://localhost:8010/fliox/ can be used to read, write, delete and query records in the container `jobs`.  

|              | `Client`                     | `Hub`                        |
|--------------|------------------------------|------------------------------|
| C#           | 1 file - LOC 30              | 1 file - LOC 40              |
| dependencies | **JSON Fliox** 4 dlls 850 KB | **JSON Fliox** 5 dlls 855 KB |



# Features comparison

Comparison of features enabled / used in each Hub example.

*Info:*  The **keywords** in the **🔎 Search** column can be used to find the source a feature is enabled.  
Search via your IDE or via GitHub. *GitHub > Search - keyboard shortcut* `s` or `/`

| feature                                   | 🔎 Search            | TodoHub | DemoHub |    EF Core    |
|-------------------------------------------|-----------------------|:------:|:------:|:-------------:|
| ORM - C# .NET                             | `FlioxClient`         |   ✅   |   ✅   |       ✓       |
| ORM LINQ                                  |                       |   ✅   |   ✅   |       ✓       |
| Hub - HttpListener integration            | `HttpListenerHost`    |   ✅   |   ✅   |               |
| Hub - ASP.NET Core integration            | `ExecuteFlioxRequest` |   ✓    |   ✅   |               |
| Hub Explorer - require `cluster` DB       | `HubExplorer`         |   ✅   |   ✅   |               |
| Batch API - HTTP & WebSocket              | (1)                   |   ✅   |   ✅   |               |
| REST / OpenAPI                            | (1)                   |   ✅   |   ✅   |  Swashbuckle  |
| GraphQL API                               | `GraphQLHandler`      |   ✓    |   ✅   | Hot Chocolate |
| `cluster` DB - info of hosted databases   | `ClusterDB`           |   ✅   |   ✅   |               |
| `monitor` DB - request / task monitoring  | `MonitorDB`           |   ✓    |   ✅   |               |
| `user_db` DB - user / task authorization  | `UserAuthenticator`   |   ✓    |   ✅   |               |
| Pub-Sub - subscribe DB changes / commands | `EventDispatcher`     |   ✓    |   ✅   |    SignalR    |
| `main_db` database schema                 | `DatabaseSchema`      |   ✅   |   ✅   |       ✓       |
| Code generation TS, C#, HTML, Kotlin, ... | (1)                   |   ✅   |   ✅   |               |
| Seed database `main_db`                   | `SeedDatabase`        |   ✓    |   ✅   |       ✓       |
| Database containers                       | `EntitySet`           |   1    |   5    |        n       |
| Container relations                       | `Relation`            |   ✓    |   ✅   |       ✓       |
| Custom database commands / handler        | `TaskHandler`         |   ✓    |   ✅   | ASP.NET routes |

 ✓     *supported*  
✅   *supported & integrated*  
(1)    *integral feature*  


# DB provider comparison

| provider / adapter           |    Fliox    |   EF Core   |
|------------------------------|:-----------:|:-----------:|
| `in-memory`                  |      ✓      |     ✓       |
| `file-system` - JSON files   |      ✓      |             |
| `remote` - HTTP & Websocket  |      ✓      |             |
| SQLite                       |             |     ✓       |
| MariaDB                      |             |   Pomelo    |
| MySQL                        |             |   Oracle    |
| PostgreSQL                   |             |   Npgsql    |
| Cosmos DB                    |      ✓      |     ✓      |
| SQL Server                   |             |     ✓       |
| Oracle DB                    |             |   Oracle    |
| DB2                          |             |    IBM      |

 ✓     *maintainer support*  



# Build

All examples targeting **.NET 6.0**.  
The solution and its projects can be build, tested and executed via **Console**, **VSCode**, **Rider** & **Visual Studio 2022**.

build all examples from `./`
```
dotnet build
```

run unit tests of all examples from `./`
```console
dotnet test
```

run a Hub as an HTTP server from its folder - e.g. in `./Demo/Hub`
```console
dotnet run
```
The server will start with logs like
<div style="background-color: #0000ff40;">

```console
info:  add extension db: cluster (in-memory)
info:  add extension db: monitor (in-memory)
info:  add extension db: user_db (file-system)
info:  create HttpHost db: main_db (in-memory)
info:  DemoHub · dev - v1.0.0
    ____   _   _
   |  __| | | |_|  ____  __  __
   |  _|  | | | | | __ | \ \/ /
   |_|    |_| |_| |____| /_/\_\  v0.0.8 - 2022

Hub Explorer - http://localhost:8010/fliox/
```
</div>

# License

This demo project is licensed under MIT.

Copyright © 2022 Ullrich Praetz
