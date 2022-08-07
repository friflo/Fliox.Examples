
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
