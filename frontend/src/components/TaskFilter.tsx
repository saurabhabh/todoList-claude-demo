import React from 'react';
import { 
  View, 
  Picker, 
  Item, 
  Flex, 
  Text,
  Badge 
} from '@adobe/react-spectrum';
import { TaskStatus } from '../types/Task';

interface TaskFilterProps {
  filter: 'ALL' | TaskStatus;
  onFilterChange: (filter: 'ALL' | TaskStatus) => void;
  taskCounts: {
    total: number;
    pending: number;
    completed: number;
  };
}

const TaskFilter: React.FC<TaskFilterProps> = ({ 
  filter, 
  onFilterChange, 
  taskCounts 
}) => {
  return (
    <View>
      <Flex direction="row" alignItems="center" gap="size-200" justifyContent="space-between">
        <Picker
          label="Filter tasks"
          selectedKey={filter}
          onSelectionChange={(key) => onFilterChange(key as 'ALL' | TaskStatus)}
          width="size-2400"
        >
          <Item key="ALL">
            All Tasks
          </Item>
          <Item key={TaskStatus.PENDING}>
            Pending
          </Item>
          <Item key={TaskStatus.COMPLETED}>
            Completed
          </Item>
        </Picker>
        
        <Flex direction="row" gap="size-200" alignItems="center">
          <Badge variant="neutral">
            Total: {taskCounts.total}
          </Badge>
          <Badge variant="info">
            Pending: {taskCounts.pending}
          </Badge>
          <Badge variant="positive">
            Completed: {taskCounts.completed}
          </Badge>
        </Flex>
      </Flex>
    </View>
  );
};

export default TaskFilter;