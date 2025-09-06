import { useMutation, graphql } from 'react-relay';
import type { useTaskMutationsUpdateStatusMutation } from '../relay/__generated__/useTaskMutationsUpdateStatusMutation.graphql';
import type { useTaskMutationsDeleteMutation } from '../relay/__generated__/useTaskMutationsDeleteMutation.graphql';

const UpdateTaskStatusMutation = graphql`
  mutation useTaskMutationsUpdateStatusMutation($input: UpdateTaskStatusInput!) {
    updateTaskStatus(input: $input) {
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
`;

const DeleteTaskMutation = graphql`
  mutation useTaskMutationsDeleteMutation($id: Int!) {
    deleteTask(id: $id) {
      task {
        id
        title
      }
      errorMessage
      success
    }
  }
`;

export const useTaskMutations = () => {
  const [commitUpdateStatus, isUpdatingStatus] = useMutation(UpdateTaskStatusMutation);
  const [commitDelete, isDeleting] = useMutation(DeleteTaskMutation);

  const updateTaskStatus = (id: number, status: string) => {
    return new Promise<void>((resolve, reject) => {
      commitUpdateStatus({
        variables: {
          input: {
            id,
            status: status as any, // Will be properly typed by Relay
          },
        },
        onCompleted: (response) => {
          const result = (response as useTaskMutationsUpdateStatusMutation['response']).updateTaskStatus;
          if (result.success) {
            resolve();
          } else {
            reject(new Error(result.errorMessage || 'Failed to update task'));
          }
        },
        onError: (error) => {
          reject(error);
        },
      });
    });
  };

  const deleteTask = (id: number) => {
    return new Promise<void>((resolve, reject) => {
      commitDelete({
        variables: { id },
        onCompleted: (response) => {
          const result = (response as useTaskMutationsDeleteMutation['response']).deleteTask;
          if (result.success) {
            resolve();
          } else {
            reject(new Error(result.errorMessage || 'Failed to delete task'));
          }
        },
        onError: (error) => {
          reject(error);
        },
        updater: (store) => {
          // Remove the deleted task from the cache
          const deletedTaskId = `Task:${id}`;
          store.delete(deletedTaskId);
          
          // Update the allTasks list
          const root = store.getRoot();
          const allTasks = root.getLinkedRecords('allTasks');
          if (allTasks) {
            const filteredTasks = allTasks.filter(
              (task) => task && task.getValue('id') !== id
            );
            root.setLinkedRecords(filteredTasks, 'allTasks');
          }
        },
      });
    });
  };

  return {
    updateTaskStatus,
    deleteTask,
    isUpdatingStatus,
    isDeleting,
  };
};