using Microsoft.EntityFrameworkCore;
using TodoApp.Infrastructure.Data;

namespace TodoApp.Api.GraphQL.Queries;

[ExtendObjectType<Query>]
public class TaskQueries
{
    public async Task<IEnumerable<TodoApp.Core.Entities.Task>> GetAllTasks(
        [Service] TodoContext context,
        CancellationToken cancellationToken)
    {
        return await context.Tasks
            .OrderByDescending(t => t.CreatedAt)
            .ToListAsync(cancellationToken);
    }

    public async Task<TodoApp.Core.Entities.Task?> GetTaskById(
        int id,
        [Service] TodoContext context,
        CancellationToken cancellationToken)
    {
        if (id <= 0)
            return null;

        return await context.Tasks.FindAsync(new object[] { id }, cancellationToken);
    }

    public async Task<IEnumerable<TodoApp.Core.Entities.Task>> GetTasksByStatus(
        TodoApp.Core.Entities.TaskStatus status,
        [Service] TodoContext context,
        CancellationToken cancellationToken)
    {
        return await context.Tasks
            .Where(t => t.Status == status)
            .OrderByDescending(t => t.CreatedAt)
            .ToListAsync(cancellationToken);
    }
}