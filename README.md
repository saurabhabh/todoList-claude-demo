# Todo List Application

A modern full-stack task management application built with ASP.NET Core, GraphQL, React, and Adobe React Spectrum.

## Tech Stack

### Backend
- **ASP.NET Core 8.0** - Web API framework
- **GraphQL with HotChocolate** - Modern API query language
- **Entity Framework Core** - Object-relational mapping
- **SQLite** - Lightweight database for development
- **SQL Server** - Production database

### Frontend
- **React 19** - Modern UI library
- **TypeScript** - Type-safe JavaScript
- **Adobe React Spectrum** - Professional design system
- **Relay** - GraphQL client for React
- **Vite** - Fast build tool

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Service orchestration
- **Nginx** - Web server for frontend

## Features

- ✅ Create, read, update, and delete tasks
- ✅ Toggle task status (Pending/Completed)
- ✅ Real-time UI updates with Relay
- ✅ Input validation and error handling
- ✅ Responsive design with Spectrum
- ✅ Accessibility built-in
- ✅ Loading states and error boundaries
- ✅ Production-ready containerization

## Getting Started

### Prerequisites
- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js 18+](https://nodejs.org/)
- [Docker](https://www.docker.com/) (optional)

### Running the Application

#### Backend API
```bash
# Navigate to backend directory
cd backend

# Restore dependencies
dotnet restore

# Build the solution
dotnet build

# Run the API
cd TodoApp.Api && dotnet run
```

The API will be available at `http://localhost:5232` with GraphQL endpoint at `http://localhost:5232/graphql`.

#### Frontend Application
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Generate Relay artifacts (if schema changes)
npm run relay

# Start development server
npm start
```

The frontend will be available at `http://localhost:3000`.

### GraphQL Schema

The API exposes the following GraphQL operations:

#### Queries
```graphql
# Get all tasks
query GetAllTasks {
  allTasks {
    id
    title
    description
    status
    createdAt
    updatedAt
  }
}

# Get task by ID
query GetTaskById($id: Int!) {
  taskById(id: $id) {
    id
    title
    description
    status
  }
}
```

#### Mutations
```graphql
# Create a new task
mutation CreateTask($input: CreateTaskInput!) {
  createTask(input: $input) {
    task {
      id
      title
      description
      status
    }
    errorMessage
    success
  }
}

# Update task status
mutation UpdateTaskStatus($input: UpdateTaskStatusInput!) {
  updateTaskStatus(input: $input) {
    task {
      id
      status
    }
    errorMessage
    success
  }
}

# Delete task
mutation DeleteTask($id: Int!) {
  deleteTask(id: $id) {
    task {
      id
    }
    errorMessage
    success
  }
}
```

## Project Structure

```
TodoApp/
├── backend/
│   ├── TodoApp.Api/              # Web API layer
│   │   ├── GraphQL/              # GraphQL types and operations
│   │   └── Program.cs            # Application entry point
│   ├── TodoApp.Core/             # Domain entities
│   │   └── Entities/Task.cs      # Task domain model
│   ├── TodoApp.Infrastructure/   # Data access layer
│   │   └── Data/TodoContext.cs   # Entity Framework context
│   └── Dockerfile                # Backend container
├── frontend/
│   ├── src/
│   │   ├── components/           # React components
│   │   ├── relay/               # GraphQL/Relay configuration
│   │   ├── types/               # TypeScript types
│   │   └── hooks/               # Custom React hooks
│   ├── Dockerfile               # Frontend container
│   └── nginx.conf              # Web server configuration
├── docker-compose.yml          # Service orchestration
└── CLAUDE.md                   # Development guidance
```

## Development Commands

### Backend
```bash
# Build solution
cd backend && dotnet build

# Run API
cd backend/TodoApp.Api && dotnet run

# Create migration
cd backend && dotnet ef migrations add MigrationName --project TodoApp.Infrastructure --startup-project TodoApp.Api

# Update database
cd backend && dotnet ef database update --project TodoApp.Infrastructure --startup-project TodoApp.Api
```

### Frontend
```bash
# Install dependencies
cd frontend && npm install

# Development server
cd frontend && npm start

# Generate Relay artifacts
cd frontend && npm run relay

# Watch Relay artifacts
cd frontend && npm run relay:watch

# Build for production
cd frontend && npm run build
```

### Docker

```bash
# Build and run all services (production)
docker-compose up --build

# Run with development overrides
docker-compose -f docker-compose.yml -f docker-compose.override.yml up --build

# Run in detached mode
docker-compose up -d

# Stop services
docker-compose down

# Stop and remove volumes (deletes database)
docker-compose down -v

# View logs
docker-compose logs -f

# View logs for specific service
docker-compose logs -f todoapp-backend
```

#### Docker Services
- **todoapp-backend**: ASP.NET Core API (production: port 5232, dev: port 5233)
- **todoapp-frontend**: React app with Nginx (production: port 3000, dev: port 3001)

#### Docker Features
- **Multi-stage builds** for optimized images
- **Health checks** for service monitoring
- **Volume persistence** for database data
- **Development overrides** for hot reload
- **Security hardening** with non-root users

## API Documentation

The GraphQL API includes:
- **Interactive GraphQL Playground** at `http://localhost:5232/graphql`
- **Schema introspection** enabled in development
- **Input validation** with detailed error messages
- **Structured error responses** with success flags

## Contributing

1. Follow the existing code style and patterns
2. Use TypeScript for type safety
3. Include proper error handling
4. Write meaningful commit messages
5. Test thoroughly before submitting

## Troubleshooting

### Docker Network Issues

If you encounter Docker image pull failures like the Cloudflare R2 error:

```bash
# Use alternative local Docker setup with Ubuntu-based images
docker-compose -f docker-compose.local.yml up --build
```

**Alternative Solutions:**
- Use `node:20-slim` instead of `node:18-alpine` (already updated in main Dockerfile)
- Use `nginx:stable` instead of `nginx:alpine` (already updated in main Dockerfile)  
- Use Ubuntu-based Dockerfiles for restricted networks (`Dockerfile.local`)

### Common Docker Problems
- **Ensure Docker Desktop is running**
- **Check port conflicts** (5232/5233, 3000/3001)  
- **Try rebuilding with `--no-cache` flag**: `docker-compose build --no-cache`
- **Clear Docker cache**: `docker system prune -a`

### GraphQL Issues  
- Verify backend is running at `http://localhost:5232/graphql`
- Check CORS configuration in `Program.cs`
- Regenerate Relay artifacts: `npm run relay`

### Database Issues
- Database file is persisted in Docker volumes
- Reset database: `docker-compose down -v`

## License

This project is licensed under the MIT License.