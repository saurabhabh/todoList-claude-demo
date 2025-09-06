import React, { useState } from 'react';
import { useLazyLoadQuery } from 'react-relay';
import { 
  View, 
  Heading, 
  Flex,
  ProgressCircle,
  IllustratedMessage,
  AlertDialog,
  DialogTrigger,
  Button,
  Text
} from '@adobe/react-spectrum';
import TaskItem from './TaskItem';
import { useTaskMutations } from '../hooks/useTaskMutations';
import { TaskStatus } from '../types/Task';
import { TaskListContainerQuery } from '../relay/__generated__/TaskListContainerQuery.graphql';
import NotFound from '@spectrum-icons/illustrations/NotFound';
import Alert from '@spectrum-icons/workflow/Alert';

interface TaskListWithMutationsProps {
  data: TaskListContainerQuery['response'];
  loading?: boolean;
}

const TaskListWithMutations: React.FC<TaskListWithMutationsProps> = ({ 
  data, 
  loading = false 
}) => {
  const { updateTaskStatus, deleteTask, isUpdatingStatus, isDeleting } = useTaskMutations();
  const [error, setError] = useState<string | null>(null);
  const [operatingTaskId, setOperatingTaskId] = useState<number | null>(null);

  const handleToggleStatus = async (taskId: number) => {
    try {
      setOperatingTaskId(taskId);
      setError(null);
      
      const task = data.allTasks.find(t => t.id === taskId);
      if (!task) return;
      
      const newStatus = task.status === 'PENDING' ? 'COMPLETED' : 'PENDING';
      await updateTaskStatus(taskId, newStatus);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task status');
    } finally {
      setOperatingTaskId(null);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      setOperatingTaskId(taskId);
      setError(null);
      
      await deleteTask(taskId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task');
    } finally {
      setOperatingTaskId(null);
    }
  };

  if (loading) {
    return (
      <View>
        <Flex direction="column" alignItems="center" gap="size-200">
          <ProgressCircle aria-label="Loading tasks" isIndeterminate />
          <Text>Loading tasks...</Text>
        </Flex>
      </View>
    );
  }

  if (data.allTasks.length === 0) {
    return (
      <IllustratedMessage>
        <NotFound />
        <Heading>No tasks yet</Heading>
        <Text>Create your first task to get started!</Text>
      </IllustratedMessage>
    );
  }

  const tasks = data.allTasks.map(task => ({
    id: task.id,
    title: task.title,
    description: task.description || undefined,
    status: task.status as TaskStatus,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
  }));

  return (
    <View>
      <Heading level={2} marginBottom="size-200">
        Tasks ({tasks.length})
      </Heading>
      
      <Flex direction="column" gap="size-200">
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleStatus={handleToggleStatus}
            onDelete={handleDeleteTask}
            isOperating={operatingTaskId === task.id}
            disabled={isUpdatingStatus || isDeleting}
          />
        ))}
      </Flex>

      {error && (
        <DialogTrigger>
          <Button variant="negative" marginTop="size-200">
            <Alert />
            Error Occurred
          </Button>
          <AlertDialog
            title="Task Operation Error"
            variant="error"
            primaryActionLabel="OK"
            onPrimaryAction={() => setError(null)}
          >
            {error}
          </AlertDialog>
        </DialogTrigger>
      )}
    </View>
  );
};

export default TaskListWithMutations;