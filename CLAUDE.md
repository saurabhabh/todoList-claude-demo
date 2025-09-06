# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a full-stack TODO list application built with:
- **Backend**: ASP.NET Core 8.0 with GraphQL (HotChocolate)
- **Frontend**: React with Adobe React Spectrum UI library
- **GraphQL Client**: Relay for React
- **Database**: SQL Server (with SQLite fallback for development)
- **Containerization**: Docker + Docker Compose
- **ORM**: Entity Framework Core

## Project Structure

The project follows a clean architecture pattern with expected structure:

```
TodoApp/
├── backend/
│   ├── TodoApp.Api/          # ASP.NET Core API layer
│   ├── TodoApp.Core/         # Domain entities and business logic
│   ├── TodoApp.Infrastructure/ # Data access layer
│   └── Dockerfile
├── frontend/
│   ├── src/                  # React application source
│   ├── public/              # Static assets
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
└── docker-compose.override.yml
```

## Key Architecture Decisions

- **GraphQL Schema**: Uses HotChocolate for better ASP.NET Core integration over graphql-dotnet
- **UI Components**: Adobe React Spectrum for consistent, accessible UI components
- **State Management**: Relay for efficient GraphQL client-side caching and updates
- **Development Environment**: Docker Compose for local development orchestration

## Core Entity Model

Task entity with properties:
- Id (int, primary key, auto-increment)
- Title (nvarchar(200), required)
- Description (nvarchar(1000), optional)  
- Status (enum: Pending=0, Completed=1)
- CreatedAt, UpdatedAt (datetime2)

## GraphQL Operations

**Mutations**:
- `createTask` - Create new task
- `updateTaskStatus` - Toggle task completion status

**Queries**:
- `getAllTasks` - Retrieve all tasks

## Development Phases

The project is structured in phases:
1. Backend Foundation (ASP.NET Core, EF Core, GraphQL schema)
2. GraphQL API Implementation (queries, mutations, validation)
3. Frontend Foundation (React, Spectrum, Relay setup)
4. Frontend Implementation (components, GraphQL integration)
5. Containerization (Dockerfiles, Docker Compose)
6. Integration & Testing

## Environment Variables

Key environment variables to configure:
- `DATABASE_CONNECTION_STRING` - Database connection
- `GRAPHQL_ENDPOINT` - GraphQL API endpoint
- `NODE_ENV` - Node environment
- `ASPNETCORE_ENVIRONMENT` - ASP.NET Core environment

## Common Development Commands

### Backend Commands
```bash
# Build the backend solution
cd backend && dotnet build

# Run the backend API
cd backend/TodoApp.Api && dotnet run

# Run Entity Framework migrations (when needed)
cd backend && dotnet ef migrations add InitialCreate --project TodoApp.Infrastructure --startup-project TodoApp.Api

# Update database
cd backend && dotnet ef database update --project TodoApp.Infrastructure --startup-project TodoApp.Api

# Build Docker image for backend
cd backend && docker build -t todoapp-backend .
```

### Frontend Commands
```bash
# Install dependencies
cd frontend && npm install

# Run development server
cd frontend && npm start

# Generate Relay artifacts
cd frontend && npm run relay

# Watch Relay artifacts (development)
cd frontend && npm run relay:watch

# Build for production
cd frontend && npm run build

# Build Docker image for frontend
cd frontend && docker build -t todoapp-frontend .
```

### GraphQL Endpoint
- Development: `http://localhost:5232/graphql` or `https://localhost:7064/graphql`
- GraphQL UI available at same endpoint for schema exploration

## Development Workflow

1. ✅ **Phase 1 Complete**: Backend Foundation (ASP.NET Core, EF Core, GraphQL schema)
2. ✅ **Phase 2 Complete**: GraphQL API Implementation (queries, mutations, validation)
3. ✅ **Phase 3 Complete**: Frontend Foundation (React, Spectrum, Relay setup)
4. ✅ **Phase 4 Complete**: Frontend Implementation (components, GraphQL integration)
5. Containerization (Dockerfiles, Docker Compose)
6. Integration & Testing

## Key Files to Monitor

- `backend/TodoApp.Api/Program.cs` - API startup configuration
- `backend/TodoApp.Core/Entities/Task.cs` - Task domain model
- `backend/TodoApp.Infrastructure/Data/TodoContext.cs` - EF Core context
- `frontend/src/components/TaskList.tsx` - Main task list component
- `frontend/src/relay/Environment.ts` - Relay configuration
- Phase 1 done -  Phase 1 Complete: Backend Foundation

  1. ✅ ASP.NET Core project setup - Created clean architecture with 3 projects:
    - TodoApp.Api - Web API layer with GraphQL
    - TodoApp.Core - Domain entities
    - TodoApp.Infrastructure - Data access layer
  2. ✅ Entity Framework Core configuration - Added EF Core with both SQL Server and SQLite providers
  3. ✅ Task entity model - Created Task entity with:
    - Id, Title, Description, Status (Pending/Completed)
    - CreatedAt, UpdatedAt timestamps
    - Proper validation attributes
  4. ✅ Database setup - Configured TodoContext with automatic timestamp updates
  5. ✅ GraphQL schema with HotChocolate - Implemented:
    - getAllTasks query
    - createTask mutation
    - updateTaskStatus mutation
- Phase 2 Complete: GraphQL API Implementation

  1. ✅ Enhanced GraphQL Structure - Organized code into proper folders:
    - GraphQL/Types/ - Input types and payload types
    - GraphQL/Queries/ - Query operations
    - GraphQL/Mutations/ - Mutation operations
  2. ✅ Input Validation - Created strongly-typed input classes:
    - CreateTaskInput - Validates title length and description
    - UpdateTaskStatusInput - Validates task ID and status
    - Proper validation attributes with custom error messages
  3. ✅ Error Handling - Implemented comprehensive error responses:
    - TaskPayload - Unified response type with success/error states
    - Validation error handling with detailed messages
    - Exception handling for database operations
    - Not found error handling
  4. ✅ Enhanced GraphQL Operations:
    - Queries: getAllTasks, getTaskById, getTasksByStatus
    - Mutations: createTask, updateTaskStatus, deleteTask
    - All operations return proper payload types with error handling
  5. ✅ GraphQL
- ✅ Phase 3 Complete: Frontend Foundation

  1. ✅ React Application with TypeScript - Created using create-react-app with TypeScript template:
    - Modern React 19 setup
    - TypeScript configuration
    - Production-ready build system
  2. ✅ Adobe React Spectrum Integration - Fully configured UI system:
    - @adobe/react-spectrum components
    - Spectrum icons (@spectrum-icons/workflow, @spectrum-icons/ui)
    - Default theme and Provider setup
    - Accessible, consistent design system
  3. ✅ Relay Client Configuration - Complete GraphQL client setup:
    - Relay Environment configured for GraphQL endpoint
    - Relay compiler configuration (relay.config.js)
    - TypeScript support for Relay
    - Build scripts for artifact generation
  4. ✅ Basic Component Structure - Well-organized component architecture:
    - TodoApp - Main application container
    - AddTaskForm - Task creation form with validation
    - TaskList - Task display with loading and empty states
    - TaskItem - Individual ta
- Phase 4 Complete: Frontend Implementation

  1. ✅ GraphQL Queries with Relay - Created comprehensive query integration:
    - TaskListContainer with useLazyLoadQuery
    - Proper TypeScript integration
    - Suspense boundary handling
  2. ✅ GraphQL Mutations with Relay - Implemented full mutation support:
    - AddTaskFormContainer with useMutation
    - useTaskMutations custom hook for status updates and deletion
    - Optimistic updates and cache management
    - Error handling with user feedback
  3. ✅ Task List Component Integration - Connected components to GraphQL:
    - TaskListWithMutations component
    - Loading states and error boundaries
    - Real-time UI updates via Relay
  4. ✅ AddTaskForm Integration - Complete form functionality:
    - Form validation and submission
    - Error handling with AlertDialog
    - Success feedback and form reset
    - Real-time cache updates
  5. ✅ Task Status Toggle Functionality - Implemented interactive features:
    - Toggle between Pending/Complete
- Installed CRACO - A tool that allows overriding create-react-app configuration without ejecting

  ✅ Added babel-plugin-relay - The essential Babel plugin that transforms GraphQL template literals at build time

  ✅ Created craco.config.js - Configured CRACO to use the Relay Babel plugin

  ✅ Updated package.json scripts - Changed from react-scripts to craco for start, build, and test commands

  ✅ Removed conflicting .babelrc - Prevented configuration conflicts
- ● Perfect! I've fixed the GraphQL ID type issue for Relay compatibility:

  ✅ Created TaskType class - Configured the Task entity to use GraphQL ID type for the Id field

  ✅ Updated GraphQL server configuration - Added the TaskType to the GraphQL server configuration

  ✅ Added ID attributes to mutations - Updated DeleteTask parameter and UpdateTaskStatusInput to use the [ID]
  attribute

  ✅ Regenerated Relay artifacts - Updated the frontend types to match the new GraphQL schema

  Now the GraphQL API will return IDs as strings instead of integers, which is what Relay expects. You'll need to
  restart your backend server to apply these changes. Once restarted, the UI should work properly without the
  "Expected id of elements of field allTasks to be strings" error.

  The backend will now properly serialize integer IDs to strings in the GraphQL response while still maintaining
  integer IDs in the database.
- Port Configuration Fixed

  Before: Inconsistent ports between launch settings (5232) and Docker setup (5000)
  After: Consistent port configuration across all files

  Updated Port Mappings:

  Development (Local):

  - Backend: http://localhost:5232 (from launchSettings.json)
  - Frontend: http://localhost:3000

  Docker Production:

  - Backend: http://localhost:5232 (maps to container port 8080)
  - Frontend: http://localhost:3000 (maps to container port 80)

  Docker Development:

  - Backend: http://localhost:5233 (maps to container port 8080)
  - Frontend: http://localhost:3001 (maps to container port 80)

  Files Updated:

  ✅ docker-compose.yml - Production port mapping to 5232
  ✅ docker-compose.override.yml - Development port mapping to 5233
  ✅ README.md - All documentation references updated
  ✅ CLAUDE.md - GraphQL endpoint references updated

  Now the configuration is consistent across all environments:
  - Local development matches launchSettings.json (port 5232)
  - Docker production
- Phase 5: Containerization Complete & Working!

  The TodoApp is now fully containerized and running successfully. Here's what we accomplished:

  Successfully Resolved:

  - ✅ Port Configuration - Fixed mismatch between launch settings (5232) and Docker setup
  - ✅ Network Connectivity - Updated Docker images for better compatibility
  - ✅ Version Alignment - Fixed .NET 9.0/.NET 8.0 mismatch between projects and Docker
  - ✅ Package Compatibility - All NuGet packages now aligned with .NET 8.0
  - ✅ Docker Build - Multi-stage builds working perfectly
  - ✅ Service Orchestration - Backend and frontend containers communicating properly

  Current Status:

  🐳 Docker Containers: Running successfully🔗 Service Communication: Backend ↔ Frontend working📊 GraphQL API:
  Accessible and functional🎨 React Frontend: Loading and interacting with backend💾 Database: SQLite persistence
  working via Docker volumes

  Access Points:

  - Frontend: http://localhost:3000
  - Backend GraphQL: http://l