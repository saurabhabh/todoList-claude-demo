# Sample GraphQL Queries and Mutations

## Queries

### Get All Tasks
```graphql
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
```

### Get Task by ID
```graphql
query GetTaskById {
  taskById(id: 1) {
    id
    title
    description
    status
    createdAt
    updatedAt
  }
}
```

### Get Tasks by Status
```graphql
query GetPendingTasks {
  tasksByStatus(status: PENDING) {
    id
    title
    description
    status
    createdAt
    updatedAt
  }
}
```

## Mutations

### Create Task
```graphql
mutation CreateTask {
  createTask(input: {
    title: "Complete GraphQL API"
    description: "Implement all queries and mutations with proper validation"
  }) {
    task {
      id
      title
      description
      status
      createdAt
      updatedAt
    }
    errorMessage
    success
  }
}
```

### Update Task Status
```graphql
mutation UpdateTaskStatus {
  updateTaskStatus(input: {
    id: 1
    status: COMPLETED
  }) {
    task {
      id
      title
      description
      status
      updatedAt
    }
    errorMessage
    success
  }
}
```

### Delete Task
```graphql
mutation DeleteTask {
  deleteTask(id: 1) {
    task {
      id
      title
      status
    }
    errorMessage
    success
  }
}
```

## Test Cases

### Validation Error - Empty Title
```graphql
mutation CreateTaskWithEmptyTitle {
  createTask(input: {
    title: ""
    description: "This should fail validation"
  }) {
    task {
      id
      title
    }
    errorMessage
    success
  }
}
```

### Error Case - Nonexistent Task
```graphql
mutation UpdateNonExistentTask {
  updateTaskStatus(input: {
    id: 999
    status: COMPLETED
  }) {
    task {
      id
      title
    }
    errorMessage
    success
  }
}
```