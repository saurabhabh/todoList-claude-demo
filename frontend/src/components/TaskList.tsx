import React from 'react';
import { 
  View, 
  ListView, 
  Item, 
  Heading, 
  Text, 
  Flex,
  ProgressCircle,
  IllustratedMessage
} from '@adobe/react-spectrum';
import TaskItem from './TaskItem';
import { Task } from '../types/Task';
import NotFound from '@spectrum-icons/illustrations/NotFound';

interface TaskListProps {
  tasks?: Task[];
  loading?: boolean;
  onToggleStatus?: (taskId: number) => void;
  onDeleteTask?: (taskId: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks = [], 
  loading = false,
  onToggleStatus,
  onDeleteTask
}) => {
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

  if (tasks.length === 0) {
    return (
      <IllustratedMessage>
        <NotFound />
        <Heading>No tasks yet</Heading>
        <Text>Create your first task to get started!</Text>
      </IllustratedMessage>
    );
  }

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
            onToggleStatus={onToggleStatus}
            onDelete={onDeleteTask}
          />
        ))}
      </Flex>
    </View>
  );
};

export default TaskList;