using HotChocolate;
using HotChocolate.Types;
using TodoApp.Core.Entities;

namespace TodoApp.Api.GraphQL.Types;

public class TaskType : ObjectType<TodoApp.Core.Entities.Task>
{
    protected override void Configure(IObjectTypeDescriptor<TodoApp.Core.Entities.Task> descriptor)
    {
        descriptor.Field(f => f.Id).Type<IdType>();
    }
}