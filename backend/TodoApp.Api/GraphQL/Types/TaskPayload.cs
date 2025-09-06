namespace TodoApp.Api.GraphQL.Types;

public class TaskPayload
{
    public TodoApp.Core.Entities.Task? Task { get; set; }
    public string? ErrorMessage { get; set; }
    public bool Success => Task != null && string.IsNullOrEmpty(ErrorMessage);
}