

# ![logo](../docs/images/Json-Fliox.svg)     **Fliox DemoHub**      ![SPLASH](../docs/images/paint-splatter.svg)



## General

The **Fliox DemoHub** is a Web server application to demonstrate the features of the
[**JSON Fliox Hub**](https://github.com/friflo/Friflo.Json.Fliox#fliox-hub) **.NET** library.  
This library is an **ORM** used to create a **schema** for **NoSQL databases** (key-value or document) by
declaring a set of model classes.  
The classes define the types stored in each database container / table.
*In short* - a **Code First** approach to define a database schema.

For a simple setup the server **is also the database** storing records (entities) **in-memory** or in the **file-system**.  
This enables running the server **without** any configuration or installation of a third party DBMS (database management system).


**TL;DR**  
[**DemoHub on AWS**](http://ec2-174-129-178-18.compute-1.amazonaws.com/) - *EC2: t2-micro*, *us-east-1*


## DemoClient

The key class when running a HTTP server using **JSON Fliox Hub** is [**DemoClient.cs**](DemoClient.cs).  
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
- [**JSON Fliox Hub**](https://github.com/friflo/Friflo.Json.Fliox#fliox-hub) is designed as a library - not a framework.  
  This enable seamless integration in any **ASP.NET Core** application by a single route. e.g. `"/fliox/{*path}"`
  

## Demo files

| file                                                   | description                                                     |
|--------------------------------------------------------|-----------------------------------------------------------------|
| [DemoClient.cs](../Client/DemoClient.cs)               | 1. is a database client <br/> 2. is a database schema for a Hub |
| [DemoClient.Models.cs](../Client/DemoClient.Models.cs) | contain entity types & command models (DTO's)                   |


## DemoHub files

| file                                   | description                                                                   |
|----------------------------------------|-------------------------------------------------------------------------------|
| [FakeUtils.cs](FakeUtils.cs)           | utilize [Bogus](https://github.com/bchavez/Bogus) to generate fake records    |
| [MessageHandler.cs](MessageHandler.cs) | implement DemoHub API (database commands) by utilizing **DemoClient** clients |
| [Program.cs](Program.cs)               | bootstrapping & configuration of host                                         |
| [Startup.cs](Startup.cs)               | **ASP.NET Core** configuration and host integration                           |
