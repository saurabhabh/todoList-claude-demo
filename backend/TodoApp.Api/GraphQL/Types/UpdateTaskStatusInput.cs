using System.ComponentModel.DataAnnotations;
using HotChocolate;

namespace TodoApp.Api.GraphQL.Types;

public class UpdateTaskStatusInput
{
    [Required]
    [Range(1, int.MaxValue, ErrorMessage = "Task ID must be a positive integer")]
    [ID]
    public int Id { get; set; }

    [Required]
    public TodoApp.Core.Entities.TaskStatus Status { get; set; }
}