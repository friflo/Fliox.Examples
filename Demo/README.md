

# ![logo](../.docs/images/Json-Fliox.svg)     **Fliox DemoHub**      ![SPLASH](../.docs/images/paint-splatter.svg)


The Fliox **DemoHub** is a Web server application to demonstrate the features of the
[**JSON Fliox**](https://github.com/friflo/Friflo.Json.Fliox#-hub) **.NET** library.

*In short*  
**JSON Fliox** is .NET library supporting simple and efficient access to NoSQL databases via C# or Web clients.

For a simple setup the server **is also the database** storing records (entities) **in-memory** or in the **file-system**.  
This enables running the server **without** any configuration or installation of a third party DBMS (database management system).


**TL;DR**  
[**DemoHub on AWS**](http://ec2-18-215-176-108.compute-1.amazonaws.com/) - *EC2: t2-micro*, *us-east-1*


## DemoClient

The key class when running a HTTP server using **Fliox Hub** is [**DemoClient.cs**](Client/DemoClient.cs).  
This class provide two fundamental functionalities:
1. It is a **database client** providing type-safe access to its containers, commands and messages
2. It defines a **database schema** by declaring its containers, commands and messages.  
  The schema is used by host for **record validation** and exposing the schema in various formats:  
  **JSON Schema**, **OpenAPI**, **GraphQL**, **HTML**, **Typescript**, **C#** & **Kotlin**.


## Features
The main features of a [**HTTP Fliox Hub**](https://github.com/friflo/Friflo.Json.Fliox#host) are:
- provide JSON based Web APIs - **RESTful**, **HTTP** & **WebSocket Batch** - to access **key-value** or **document** databases.
- assign a **database schema** to each database
- aim for optimal request performance regarding **low latency** and **high throughput**
- enable simple and efficient TDD as database access can be tested with **in-memory** or **file-system** databases
- host a single-page Web App to browse database containers / tables and execute domain specific commands
  See [**Hub Explorer**](https://github.com/friflo/Friflo.Json.Fliox#explorer)
- enables access to administrative databases via Web APIs and the Hub Explorer:
  - `cluster` listing the databases and their containers exposed by the server
  - `monitor` to get monitoring information like requests & tasks executed by users & clients
  - `user_db` to explore or change user access rights
- provide a [**REST API**](https://en.wikipedia.org/wiki/Representational_state_transfer) described by an
  [**OpenAPI specification**](https://spec.openapis.org/oas/v3.0.0) and host [**Swagger UI**](https://swagger.io/tools/swagger-ui/)
  to explore the API
- provide a [**GraphQL API**](https://graphql.org/) and
  host [**GraphiQL**](https://github.com/graphql/graphiql) to explore the API
- [**Fliox Hub**](https://github.com/friflo/Friflo.Json.Fliox#-hub) is designed as a library - not a framework.  
  This enable seamless integration in any **ASP.NET Core** application by a single route. e.g. `"/fliox/{*path}"`
  
## Files
```
📂 Client
┣ 📄 DemoClient.cs      1. is a database client
┃                       2. is a database schema for a Hub
┣ 📄 Models.cs          contain entity types & command models (DTO's)
📂 Hub
┣ 📄 FakeUtils.cs       utilize https://github.com/bchavez/Bogus to generate fake records
┣ 📄 MessageHandler.cs  implement DemoHub API (database commands) by utilizing DemoClient instances
┣ 📄 Program.cs         bootstrapping & configuration of host   > dotnet run
┣ 📄 Startup.cs         ASP.NET Core 3, 3.1, 5 configuration and host integration
┣ 📄 StartupAsp6.cs     ASP.NET Core 6 configuration and host integration
📂 Test
┣ 📄 DemoTests.cs       unit tests                              > dotnet test
┗ 📄 Trial.cs           small samples                           > dotnet run
```