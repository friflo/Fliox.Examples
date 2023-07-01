
# 🎨 Features

Comparison of features enabled / used in each Hub example.

*Info:*  The **keywords** in the **🔎 Search** column can be used to find the source a feature is enabled.  
Search via your IDE or via GitHub. *GitHub > Search - keyboard shortcut* `s` or `/`

| feature                                   | 🔎 Search            | TodoHub | DemoHub |    EF Core    |
|-------------------------------------------|-----------------------|:------:|:------:|:-------------:|
| ORM - C# .NET                             | `FlioxClient`         |   ✅   |   ✅   | `DbContext`  |
| Unit of Work - support                    | ¹                     |    ✓   |    ✓   |       ✓       |
| ORM LINQ                                  | ¹                     |   ✅   |   ✅   |       ✓       |
| Hub - HttpListener integration            | `HttpListenerHost`    |   ✅   |   ✅   |               |
| Hub - ASP.NET Core integration            | `ExecuteFlioxRequest` |   ✓    |   ✅   |               |
| Hub Explorer - require `cluster` DB       | `HubExplorer`         |   ✅   |   ✅   |               |
| Batch API - HTTP & WebSocket              | ¹                     |   ✅   |   ✅   |               |
| REST / OpenAPI                            | ¹                     |   ✅   |   ✅   | Swashbuckle ² |
| GraphQL API                               | `GraphQLHandler`      |   ✓    |   ✅   |Hot Chocolate ²|
| `cluster` DB - info of hosted databases   | `ClusterDB`           |   ✅   |   ✅   |               |
| `monitor` DB - request / task monitoring  | `MonitorDB`           |   ✓    |   ✅   |               |
| `user_db` DB - user / task authorization  | `UserAuthenticator`   |   ✓    |   ✅   |               |
| Pub-Sub - subscribe DB changes / commands | `EventDispatcher`     |   ✓    |   ✅   |    SignalR    |
| `main_db` database schema                 | `DatabaseSchema`      |   ✅   |   ✅   |       ✓       |
| Code generation TS, C#, HTML, Kotlin, ... | ¹                     |   ✅   |   ✅   |               |
| Seed database `main_db`                   | `SeedDatabase`        |   ✓    |   ✅   |       ✓       |
| Database containers                       | `EntitySet<,>`        |   1    |    5    |   `DbSet<>`   |
| Container relations                       | `Relation`            |   ✓    |   ✅   |       ✓       |
| Custom database commands / handler        | `TaskHandler`         |   ✓    |   ✅   | ASP.NET routes |
| Transactions                              | all SQL Providers     |   ✓    |    ✓   |       ✓       |

 ✓     *supported*  
✅     *supported & integrated*  
 ¹     *integral feature*  
 ²     *3rd party development*

<br/>

**Database provider**

| provider / adapter           |       Fliox        |       EF Core      |
|------------------------------|:------------------:|:------------------:|
| designed for database type   | SQL / NoSQL / KV   |         SQL        |
| `in-memory`                  |          ✓         |         ✓ ¹        |
| `file-system` - JSON files   |          ✓         |                    |
| `remote` - HTTP & Websocket  |          ✓         |                    |
| SQLite                       |          ✓         |         ✓          |
| MariaDB                      |          ✓         |       Pomelo ²     |
| MySQL                        |          ✓         |       Oracle ²     |
| PostgreSQL                   |          ✓         |       Npgsql ²     |
| Cosmos DB                    |          ✓         |         ✓         |
| SQL Server                   |          ✓         |         ✓         |
| Oracle DB                    |                    |       Oracle ²     |
| DB2                          |                    |        IBM²        |

 ✓     *maintainer development*  
 ¹     *not designed for performance or robustness.* [See](https://learn.microsoft.com/en-us/ef/core/providers/in-memory)  
 ²     *3rd party development*  

<br/><br/>
