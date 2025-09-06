using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using HotChocolate;
using HotChocolate.Types;
using TodoApp.Api.GraphQL.Types;
using TodoApp.Infrastructure.Data;

namespace TodoApp.Api.GraphQL.Mutations;

[ExtendObjectType<Mutation>]
public class TaskMutations
{
    public async Task<TaskPayload> CreateTask(
        CreateTaskInput input,
        [Service] TodoContext context,
        CancellationToken cancellationToken)
    {
        try
        {
            var validationResults = new List<ValidationResult>();
            var validationContext = new ValidationContext(input);
            
            if (!Validator.TryValidateObject(input, validationContext, validationResults, true))
            {
                var errorMessage = string.Join("; ", validationResults.Select(r => r.ErrorMessage));
                return new TaskPayload { ErrorMessage = errorMessage };
            }

            var task = new TodoApp.Core.Entities.Task
            {
                Title = input.Title.Trim(),
                Description = string.IsNullOrWhiteSpace(input.Description) ? null : input.Description.Trim(),
                Status = TodoApp.Core.Entities.TaskStatus.Pending,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            context.Tasks.Add(task);
            await context.SaveChangesAsync(cancellationToken);

            return new TaskPayload { Task = task };
        }
        catch (Exception ex)
        {
            return new TaskPayload { ErrorMessage = $"Failed to create task: {ex.Message}" };
        }
    }

    public async Task<TaskPayload> UpdateTaskStatus(
        UpdateTaskStatusInput input,
        [Service] TodoContext context,
        CancellationToken cancellationToken)
    {
        try
        {
            var validationResults = new List<ValidationResult>();
            var validationContext = new ValidationContext(input);
            
            if (!Validator.TryValidateObject(input, validationContext, validationResults, true))
            {
                var errorMessage = string.Join("; ", validationResults.Select(r => r.ErrorMessage));
                return new TaskPayload { ErrorMessage = errorMessage };
            }

            var task = await context.Tasks.FindAsync(new object[] { input.Id }, cancellationToken);
            if (task == null)
            {
                return new TaskPayload { ErrorMessage = $"Task with ID {input.Id} not found" };
            }

            task.Status = input.Status;
            task.UpdatedAt = DateTime.UtcNow;

            await context.SaveChangesAsync(cancellationToken);

            return new TaskPayload { Task = task };
        }
        catch (Exception ex)
        {
            return new TaskPayload { ErrorMessage = $"Failed to update task status: {ex.Message}" };
        }
    }

    public async Task<TaskPayload> DeleteTask(
        [ID] int id,
        [Service] TodoContext context,
        CancellationToken cancellationToken)
    {
        try
        {
            if (id <= 0)
            {
                return new TaskPayload { ErrorMessage = "Task ID must be a positive integer" };
            }

            var task = await context.Tasks.FindAsync(new object[] { id }, cancellationToken);
            if (task == null)
            {
                return new TaskPayload { ErrorMessage = $"Task with ID {id} not found" };
            }

            context.Tasks.Remove(task);
            await context.SaveChangesAsync(cancellationToken);

            return new TaskPayload { Task = task };
        }
        catch (Exception ex)
        {
            return new TaskPayload { ErrorMessage = $"Failed to delete task: {ex.Message}" };
        }
    }
}