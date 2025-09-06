import React, { useState } from 'react';
import { useMutation, graphql } from 'react-relay';
import AddTaskForm from './AddTaskForm';
import { AlertDialog, DialogTrigger, Button } from '@adobe/react-spectrum';
import Alert from '@spectrum-icons/workflow/Alert';
import type { AddTaskFormContainerMutation } from '../relay/__generated__/AddTaskFormContainerMutation.graphql';

const CreateTaskMutation = graphql`
  mutation AddTaskFormContainerMutation($input: CreateTaskInput!) {
    createTask(input: $input) {
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

const AddTaskFormContainer: React.FC = () => {
  const [commitMutation, isMutationInFlight] = useMutation(CreateTaskMutation);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (title: string, description?: string) => {
    return new Promise<void>((resolve, reject) => {
      commitMutation({
        variables: {
          input: {
            title,
            description: description || null,
          },
        },
        onCompleted: (response) => {
          const result = (response as AddTaskFormContainerMutation['response']).createTask;
          if (result.success && result.task) {
            setError(null);
            resolve();
          } else {
            const errorMessage = result.errorMessage || 'Failed to create task';
            setError(errorMessage);
            reject(new Error(errorMessage));
          }
        },
        onError: (error) => {
          const errorMessage = error.message || 'Network error occurred';
          setError(errorMessage);
          reject(error);
        },
        updater: (store) => {
          const payload = store.getRootField('createTask');
          const newTask = payload?.getLinkedRecord('task');
          
          if (newTask) {
            // Add the new task to the existing list
            const root = store.getRoot();
            const allTasks = root.getLinkedRecords('allTasks');
            if (allTasks) {
              root.setLinkedRecords([newTask, ...allTasks], 'allTasks');
            }
          }
        },
      });
    });
  };

  return (
    <>
      <AddTaskForm onSubmit={handleSubmit} />
      
      {error && (
        <DialogTrigger>
          <Button variant="negative" marginTop="size-200">
            <Alert />
            Error Occurred
          </Button>
          <AlertDialog
            title="Error Creating Task"
            variant="error"
            primaryActionLabel="OK"
            onPrimaryAction={() => setError(null)}
          >
            {error}
          </AlertDialog>
        </DialogTrigger>
      )}
    </>
  );
};

export default AddTaskFormContainer;