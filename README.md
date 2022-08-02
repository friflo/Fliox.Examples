

# [![Examples](.docs/images/Json-Fliox.svg)](https://github.com/friflo/Fliox.Examples)    **Fliox Examples**  ![SPLASH](.docs/images/paint-splatter.svg)

[![.NET Tests](https://raw.githubusercontent.com/friflo/test-github-pages/main/docs/images/badge.svg)](https://github.com/friflo/Fliox.Examples/actions)

<br/>



This project contains two **ready to run** examples showing how to create and use
[**JSON Fliox**](https://github.com/friflo/Friflo.Json.Fliox/blob/main/README.md) **Clients** & **Hubs**.  

*In short*  
**JSON Fliox** is .NET library supporting simple and efficient access to NoSQL databases via C# or Web clients.

This repo on GitHub: [friflo/Fliox.Examples](https://github.com/friflo/Fliox.Examples)

<br/>

# 🚩 Content

- [Examples](#-examples)
    - [Demo](#demo)
    - [Todo](#todo)
- [Features](#-features)
- [Build](#-build)
- [Walkthrough](#-walkthrough)
- [Credits](#-credits)

<br/>

# 🚀 Examples

This project contains two examples with a different set of features. Their differences are listed at [🎨 Features](#-features).  
The intention is to guide how to add a new or remove an existing features in an application.

- [**Demo**](#demo)    *common* example  - LOC: 560
- [**Todo**](#todo)    *minimal* example - LOC:  70

Each example contains three folders / C# projects

| folder     | project type      | description               | run command                                           |
|------------|-------------------|---------------------------|-------------------------------------------------------|
| **Client** | .NET library      | database client / schema  |                                                       |
| **Hub**    | .NET HTTP server  | bootstrapping a Hub       | `dotnet run`                                          |
| **Test**   | NUnit tests       | client examples & test DB | `dotnet test` <br/> `dotnet run [http, file, memory]` |

The **API**'s used by the examples are available at [**fliox-docs API Reference**](https://github.com/friflo/fliox-docs)

Build, Test and Run instructions described at [🔧 Build](#-build)

## **Demo**
📄   [README.md](Demo/Client/README.md)

The Demo example contains a *common* **Client**, a *common* **Hub** and **unit tests**.  

**Hub** features:  
All **Todo/Hub** features + **ASP.NET Core** integration, **GraphQL** API, monitoring, user authorization, **Pub-Sub**, container **relations** and custom **commands**.  
It utilize [Bogus](https://github.com/bchavez/Bogus) to generate fake records in various containers.

Use the Hub Explorer http://localhost:8010/fliox/ to check the features.  
Try out the online example [**DemoHub on AWS**](http://ec2-174-129-178-18.compute-1.amazonaws.com/) - *EC2: t2-micro*, *us-east-1*  

|              | Client                       | Hub                                                                    |
|--------------|------------------------------|------------------------------------------------------------------------|
| C#           | 2 files - LOC 130            | 4 files - LOC bootstrap 80, ASP.NET Core 70, domain examples 280       |
| dependencies | **JSON Fliox** 4 dlls 850 KB | **JSON Fliox** 7 dlls 900 KB  **GraphQLParser** 300kb  **Bogus** 2.4MB |



## **Todo**
📄   [README.md](Todo/Client/README.md)

The Todo example contains a *minimal* **Client**, a *minimal* **Hub** and **unit tests**.  

**Hub** features:  
[**Hub Explorer**](https://github.com/friflo/Friflo.Json.Fliox/blob/main/Json/Fliox.Hub.Explorer/README.md),
HttpListener hosting, **REST / OpenAPI**, **Batch API** & **database schema**.  

Use the Hub Explorer http://localhost:8010/fliox/ to check the features.  

|              | Client                       | Hub                          |
|--------------|------------------------------|------------------------------|
| C#           | 1 file - LOC 30              | 1 file - LOC 40              |
| dependencies | **JSON Fliox** 4 dlls 850 KB | **JSON Fliox** 5 dlls 855 KB |

<br/><br/>

# 🎨 Features

Comparison of features enabled / used in each Hub example.

*Info:*  The **keywords** in the **🔎 Search** column can be used to find the source a feature is enabled.  
Search via your IDE or via GitHub. *GitHub > Search - keyboard shortcut* `s` or `/`

| feature                                   | 🔎 Search            | TodoHub | DemoHub |    EF Core    |
|-------------------------------------------|-----------------------|:------:|:------:|:-------------:|
| ORM - C# .NET                             | `FlioxClient`         |   ✅   |   ✅   | `DbContext`  |
| Unit of Work - support                    | ⁽¹⁾                   |    ✓   |    ✓   |       ✓       |
| ORM LINQ                                  | ⁽¹⁾                   |   ✅   |   ✅   |       ✓       |
| Hub - HttpListener integration            | `HttpListenerHost`    |   ✅   |   ✅   |               |
| Hub - ASP.NET Core integration            | `ExecuteFlioxRequest` |   ✓    |   ✅   |               |
| Hub Explorer - require `cluster` DB       | `HubExplorer`         |   ✅   |   ✅   |               |
| Batch API - HTTP & WebSocket              | ⁽¹⁾                   |   ✅   |   ✅   |               |
| REST / OpenAPI                            | ⁽¹⁾                   |   ✅   |   ✅   |  Swashbuckle² |
| GraphQL API                               | `GraphQLHandler`      |   ✓    |   ✅   | Hot Chocolate²|
| `cluster` DB - info of hosted databases   | `ClusterDB`           |   ✅   |   ✅   |               |
| `monitor` DB - request / task monitoring  | `MonitorDB`           |   ✓    |   ✅   |               |
| `user_db` DB - user / task authorization  | `UserAuthenticator`   |   ✓    |   ✅   |               |
| Pub-Sub - subscribe DB changes / commands | `EventDispatcher`     |   ✓    |   ✅   |    SignalR    |
| `main_db` database schema                 | `DatabaseSchema`      |   ✅   |   ✅   |       ✓       |
| Code generation TS, C#, HTML, Kotlin, ... | ⁽¹⁾                   |   ✅   |   ✅   |               |
| Seed database `main_db`                   | `SeedDatabase`        |   ✓    |   ✅   |       ✓       |
| Database containers                       | `EntitySet`           |   1    |    5    |   `DbSet`     |
| Container relations                       | `Relation`            |   ✓    |   ✅   |       ✓       |
| Custom database commands / handler        | `TaskHandler`         |   ✓    |   ✅   | ASP.NET routes |

 ✓     *supported*  
✅   *supported & integrated*  
⁽¹⁾    *integral feature*  
 ²     *3rd party development*

<br/>

**Database provider**

| provider / adapter           |       Fliox        |       EF Core      |
|------------------------------|:------------------:|:------------------:|
| designed for database type   | NoSQL / Key-Value  |         SQL        |
| `in-memory`                  |          ✓         |         ✓         |
| `file-system` - JSON files   |          ✓         |                    |
| `remote` - HTTP & Websocket  |          ✓         |                    |
| SQLite                       |                    |         ✓          |
| MariaDB                      |                    |       Pomelo²      |
| MySQL                        |                    |       Oracle²      |
| PostgreSQL                   |                    |       Npgsql²      |
| Cosmos DB                    |          ✓         |         ✓         |
| SQL Server                   |                    |         ✓          |
| Oracle DB                    |                    |       Oracle²      |
| DB2                          |                    |        IBM²        |

 ✓     *maintainer development*  
 ²     *3rd party development*

<br/><br/>

# 🔧 Build

The solution and its projects can be build, tested and executed on **Windows**, **Linux**, and **macOS**.  
It can be used with following IDE's: **VSCode**, **Rider** & **Visual Studio 2022**.

*Note*: In order to build and run the examples the [**.NET 6.0 SDK**](https://dotnet.microsoft.com/en-us/download) is required.

clone repository and open its directory
```cmd
git clone https://github.com/friflo/Fliox.Examples.git
cd Fliox.Examples
```

build all examples
```cmd
dotnet build
```

run unit tests of all examples
```cmd
dotnet test
```

run a Hub as an HTTP server from its folder - e.g.
```cmd
cd ./Todo/Hub
dotnet run
```
the server will start with logs like

![dd](.docs/images/server-log.png)

open the **Hub Explorer** in your browser: http://localhost:8010/fliox/

<br/>

run the .NET Test client accessing the Hub from its folder - e.g.
```cmd
cd ./Todo/Test
dotnet run
```
It will execute the client methods used in `Trial.Main()`

<br/><br/>

# 🐾 Walkthrough

Start with the simple **Todo** example as it contains only 70 LOC.  
Therefore execute the steps listed in [🔧 Build](./README.md#-build) section.

After starting the TodoHub server open the Hub Explorer at http://localhost:8010/fliox/ in the browser.

![Hub Explorer](.docs/images/TodoHub-Explorer.svg)

Now you can try the actions below in any order.
- Click on the **Project Name** to open the website describing the project
- Click on the **Schema** link to open a single page documentation
- Click on the **(CD) Class Diagram** link to open the database schema as a class diagram
- Click on the **(OAS) OpenAPI** link to open the Swagger UI
- Click on **Typescript, C#, Kotlin, JSON Schema / OpenAPI** link to export types for other languages
- Select a database command - e.g. **std.Echo** - and execute it with **Send**
- Select container **jobs** to view and edit its entities aka records  
  When selecting a container the UI will change shown in the screenshot below


![Hub Explorer](.docs/images/TodoHub-Explorer-container.svg)

Use the container view to show, edit and query entities.
- Click on a **REST link** to show its response in a new browser tab
- Select an entity in the container (e.g. id: 1) to view its value in **JSON Editor**
- Make changes in the **JSON Editor** an **Save** them
- **Delete** selected entity / entities
- Create an new entity with the **JSON Editor** by
    - selecting an exiting one
    - change its id
    - click **Save**
- Execute a container query using a **LINQ filter expression** `o.completed != false`  
  and clicking **Apply filter**
- Remove the query filter by clicking on the red ❌
- **Select All / None** entities in the container to edit them as JSON

<br/>

**C# Tests**

The functionality shown in the Walkthrough above is also available via the C# API.  
How to use the API is demonstrated as unit tests in [TodoTests.cs](Todo/Test/TodoTests.cs) and [DemoTests](Demo/Test/DemoTests.cs).  
Use the **Test Explorer** of your **IDE** to execute and debug these tests.


<br/><br/>

# 🙏 Credits

|                                                             |             |                                                                |
| ----------------------------------------------------------- | ----------- | -------------------------------------------------------------- |
| [NUnit](https://nunit.org/)                                 | C#          | used for unit testing of the Examples                          |
| [Bogus](https://github.com/bchavez/Bogus)                   | C#          | to create Fake data by the DemoHub                             |
| [.NET guys](https://dotnet.microsoft.com/en-us/)            | C# .NET     | the platform providing compiler, runtime, IDE's & ASP.NET Core |
| [Swagger](https://swagger.io/)                              | static JS   | a REST / OpenAPI UI linked  by the Hub Explorer                |
| [GraphiQL](https://github.com/graphql/graphiql)             | static JS   | a GraphQL UI linked by the Hub Explorer                        |
| [Mermaid](https://github.com/mermaid-js/mermaid)            | static JS   | class diagram for database schema linked by the Hub Explorer   |
| [Monaco Editor](https://github.com/microsoft/monaco-editor) | static JS   | used as JSON Editor integrated in the Hub Explorer             |
| [Inscape](https://gitlab.com/inkscape/inkscape)             | Application | to create SVG's for this project                               |


<br/>

💖 *Like this project?*  
*Leave a* ⭐ at  [friflo/Fliox.Examples](https://github.com/friflo/Fliox.Examples)

Happy coding!  

<br/>

## License

This demo project is licensed under MIT.

Copyright © 2022   Ullrich Praetz
