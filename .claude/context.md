# TODO App Context

## Current Development Focus
Building a production-ready TODO list application with modern web technologies.

## Architecture Decisions
- Using HotChocolate for GraphQL instead of graphql-dotnet for better ASP.NET Core integration
- Adobe React Spectrum for consistent, accessible UI components
- Relay for efficient GraphQL client-side caching and updates
- Docker Compose for local development environment

## Database Schema
```sql
Tasks Table:
- Id (int, primary key, auto-increment)
- Title (nvarchar(200), required)
- Description (nvarchar(1000), optional)
- Status (int, enum: 0=Pending, 1=Completed)
- CreatedAt (datetime2)
- UpdatedAt (datetime2)