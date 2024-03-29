﻿using Friflo.Json.Fliox;
using Friflo.Json.Fliox.Hub.Client;
using Friflo.Json.Fliox.Hub.Host;

// ReSharper disable All
namespace Demo;

/// <summary>
/// The <see cref="DemoClient"/> has two functionalities: <br/>
/// 1. Defines a database <b>schema</b> by declaring its containers, commands and messages<br/>
/// 2. Is a database <b>client</b> providing type-safe access to its containers, commands and messages <br/>
/// <br/>
/// <i>Info</i>: Use command <b>demo.FakeRecords</b> to create fake records in various containers. <br/>
/// </summary>
/// <remarks>Command handlers are implemented at <c>DemoHub/MessageHandler.cs</c> using <see cref="DemoClient"/> clients</remarks>
[OpenAPIServer(description : "public DemoHub API", url : "http://ec2-18-215-176-108.compute-1.amazonaws.com/fliox/rest/main_db")]
[MessagePrefix("demo.")]
[NamingPolicy(NamingPolicyType.CamelCase)]
public class DemoClient : FlioxClient
{
    // --- containers
    public readonly EntitySet <long, Article>     Articles;
    public readonly EntitySet <long, Customer>    Customers;
    public readonly EntitySet <long, Employee>    Employees;
    public readonly EntitySet <long, Order>       Orders;
    public readonly EntitySet <long, Producer>    Producers;
    
    // --- commands
    /// <summary> generate random entities (records) in the containers listed in the <see cref="Fake"/> param </summary>
    public CommandTask<Records>     FakeRecords (Fake param)    => send.Command<Fake, Records>   (param);

    /// <summary> count records added to containers within the last param seconds. default 60</summary>
    public CommandTask<Counts>      CountLatest (int? param)    => send.Command<int?, Counts>    (param);
    
    /// <summary> return records added to containers within the last param seconds. default 60</summary>
    public CommandTask<Records>     LatestRecords(int? param)   => send.Command<int?, Records>   (param);

    /// <summary> simple command adding two numbers - no database access. </summary>
    public CommandTask<double>      Add  (Operands  param)      => send.Command<Operands, double>(param);

    public DemoClient(FlioxHub hub, string dbName = null) : base (hub, dbName) { }
}
