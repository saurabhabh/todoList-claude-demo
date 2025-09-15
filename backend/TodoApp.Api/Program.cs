using Microsoft.EntityFrameworkCore;
using TodoApp.Api.GraphQL.Mutations;
using TodoApp.Api.GraphQL.Queries;
using TodoApp.Api.GraphQL.Types;
using TodoApp.Infrastructure.Data;

var builder = WebApplication.CreateBuilder(args);

// Add CORS services
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

builder.Services.AddDbContext<TodoContext>(options =>
{
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") 
        ?? "Data Source=todoapp.db";
    options.UseSqlite(connectionString);
});

builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>()
    .AddMutationType<Mutation>()
    .AddTypeExtension<TaskQueries>()
    .AddTypeExtension<TaskMutations>()
    .AddType<TaskType>();

var app = builder.Build();

// Ensure database is created regardless of environment for SQLite
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<TodoContext>();
    context.Database.EnsureCreated();
}

// Enable CORS
app.UseCors("AllowFrontend");

app.MapGraphQL();

app.Run();
