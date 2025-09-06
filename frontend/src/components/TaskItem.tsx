import React from 'react';
import { 
  View, 
  Flex, 
  Text, 
  Button, 
  Checkbox,
  Well,
  Badge,
  ButtonGroup,
  ActionButton,
  ProgressCircle
} from '@adobe/react-spectrum';
import Delete from '@spectrum-icons/workflow/Delete';
import CheckmarkCircle from '@spectrum-icons/workflow/CheckmarkCircle';
import Clock from '@spectrum-icons/workflow/Clock';
import { Task, TaskStatus } from '../types/Task';

interface TaskItemProps {
  task: Task;
  onToggleStatus?: (taskId: number) => void;
  onDelete?: (taskId: number) => void;
  isOperating?: boolean;
  disabled?: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({ 
  task, 
  onToggleStatus, 
  onDelete, 
  isOperating = false, 
  disabled = false 
}) => {
  const isCompleted = task.status === TaskStatus.COMPLETED;

  const handleToggleStatus = () => {
    if (onToggleStatus) {
      onToggleStatus(task.id);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(task.id);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Well>
      <Flex direction="row" gap="size-200" alignItems="start">
        <Checkbox
          isSelected={isCompleted}
          onChange={handleToggleStatus}
          isDisabled={disabled}
          aria-label={`Mark task "${task.title}" as ${isCompleted ? 'pending' : 'completed'}`}
        />
        
        <View flex={1}>
          <Flex direction="column" gap="size-100">
            <Flex direction="row" alignItems="center" gap="size-200">
              <Text 
                UNSAFE_style={{ 
                  textDecoration: isCompleted ? 'line-through' : 'none',
                  opacity: isCompleted ? 0.7 : 1 
                }}
              >
                <strong>{task.title}</strong>
              </Text>
              
              <Badge variant={isCompleted ? 'positive' : 'info'}>
                {isCompleted ? (
                  <>
                    <CheckmarkCircle />
                    Completed
                  </>
                ) : (
                  <>
                    <Clock />
                    Pending
                  </>
                )}
              </Badge>
            </Flex>
            
            {task.description && (
              <Text 
                UNSAFE_style={{ 
                  opacity: isCompleted ? 0.7 : 1 
                }}
              >
                {task.description}
              </Text>
            )}
            
            <Text slot="detail" UNSAFE_style={{ fontSize: '0.8em', opacity: 0.7 }}>
              Created: {formatDate(task.createdAt)}
              {task.updatedAt !== task.createdAt && (
                <> • Updated: {formatDate(task.updatedAt)}</>
              )}
            </Text>
          </Flex>
        </View>
        
        <ButtonGroup>
          <ActionButton
            onPress={handleToggleStatus}
            isDisabled={disabled}
            aria-label={`Mark as ${isCompleted ? 'pending' : 'completed'}`}
          >
            <CheckmarkCircle />
          </ActionButton>
          
          <ActionButton
            onPress={handleDelete}
            isDisabled={disabled}
            aria-label="Delete task"
          >
            <Delete />
          </ActionButton>
        </ButtonGroup>
        
        {isOperating && (
          <View marginStart="size-100">
            <ProgressCircle size="S" isIndeterminate aria-label="Processing..." />
          </View>
        )}
      </Flex>
    </Well>
  );
};

export default TaskItem;