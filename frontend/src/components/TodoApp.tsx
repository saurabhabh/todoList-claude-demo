import React, { Suspense } from 'react';
import { View, Flex, ProgressCircle, Text } from '@adobe/react-spectrum';
import AddTaskFormContainer from './AddTaskFormContainer';
import TaskListContainer from './TaskListContainer';

const TodoApp: React.FC = () => {
  return (
    <View>
      <Flex direction="column" gap="size-400">
        <AddTaskFormContainer />
        
        <Suspense fallback={
          <Flex direction="column" alignItems="center" gap="size-200">
            <ProgressCircle aria-label="Loading tasks" isIndeterminate />
            <Text>Loading tasks...</Text>
          </Flex>
        }>
          <TaskListContainer />
        </Suspense>
      </Flex>
    </View>
  );
};

export default TodoApp;