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
    <View 
      borderWidth="thin"
      borderColor={isCompleted ? "gray-300" : "gray-200"}
      borderRadius="medium"
      padding="size-300"
      backgroundColor={isCompleted ? "gray-50" : "static-white"}
      UNSAFE_style={{
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        transition: 'all 0.2s ease-in-out',
        border: `1px solid ${isCompleted ? '#D1D5DB' : '#E5E7EB'}`
      }}
      UNSAFE_className="task-item-card"
    >
      <Flex direction="row" gap="size-300" alignItems="start">
        <View paddingTop="size-75">
          <Checkbox
            isSelected={isCompleted}
            onChange={handleToggleStatus}
            isDisabled={disabled}
            aria-label={`Mark task "${task.title}" as ${isCompleted ? 'pending' : 'completed'}`}
            UNSAFE_style={{
              transform: 'scale(1.2)',
            }}
          />
        </View>
        
        <View flex={1}>
          <Flex direction="column" gap="size-200">
            {/* Title and Status Row */}
            <Flex direction="row" alignItems="center" justifyContent="space-between">
              <Text 
                UNSAFE_style={{ 
                  fontSize: '1.1rem',
                  fontWeight: isCompleted ? '400' : '600',
                  textDecoration: isCompleted ? 'line-through' : 'none',
                  opacity: isCompleted ? 0.6 : 1,
                  color: isCompleted ? '#6B7280' : '#1F2937',
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                {task.title}
              </Text>
              
              <Badge 
                variant={isCompleted ? 'positive' : 'info'}
                UNSAFE_style={{
                  background: isCompleted ? '#DCFCE7' : '#DBEAFE',
                  color: isCompleted ? '#16A34A' : '#2563EB',
                  fontWeight: '500',
                  fontSize: '0.8rem',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  border: `1px solid ${isCompleted ? '#BBF7D0' : '#BFDBFE'}`
                }}
              >
                {isCompleted ? (
                  <>
                    <CheckmarkCircle size="XS" />
                    Completed
                  </>
                ) : (
                  <>
                    <Clock size="XS" />
                    Pending
                  </>
                )}
              </Badge>
            </Flex>
            
            {/* Description */}
            {task.description && (
              <Text 
                UNSAFE_style={{ 
                  opacity: isCompleted ? 0.6 : 0.8,
                  color: '#6B7280',
                  fontSize: '0.95rem',
                  lineHeight: '1.5',
                  transition: 'opacity 0.2s ease-in-out'
                }}
              >
                {task.description}
              </Text>
            )}
            
            {/* Metadata Row */}
            <Flex direction="row" justifyContent="space-between" alignItems="center">
              <Text 
                UNSAFE_style={{ 
                  fontSize: '0.8rem', 
                  opacity: 0.6,
                  color: '#9CA3AF'
                }}
              >
                Created: {formatDate(task.createdAt)}
                {task.updatedAt !== task.createdAt && (
                  <span style={{ color: '#F59E0B' }}> • Updated: {formatDate(task.updatedAt)}</span>
                )}
              </Text>
              
              {/* Action Buttons */}
              <Flex direction="row" gap="size-100">
                <ActionButton
                  onPress={handleToggleStatus}
                  isDisabled={disabled}
                  isQuiet
                  aria-label={`Mark as ${isCompleted ? 'pending' : 'completed'}`}
                  UNSAFE_style={{
                    minWidth: '32px',
                    minHeight: '32px',
                    padding: '6px',
                    borderRadius: '6px',
                    color: isCompleted ? '#059669' : '#2563EB',
                    background: 'transparent',
                    transition: 'all 0.2s ease-in-out'
                  }}
                  UNSAFE_className="modern-button"
                >
                  <CheckmarkCircle size="S" />
                </ActionButton>
                
                <ActionButton
                  onPress={handleDelete}
                  isDisabled={disabled}
                  isQuiet
                  aria-label="Delete task"
                  UNSAFE_style={{
                    minWidth: '32px',
                    minHeight: '32px',
                    padding: '6px',
                    borderRadius: '6px',
                    color: '#DC2626',
                    background: 'transparent',
                    transition: 'all 0.2s ease-in-out'
                  }}
                  UNSAFE_className="modern-button"
                >
                  <Delete size="S" />
                </ActionButton>
              </Flex>
            </Flex>
          </Flex>
        </View>
        
        {/* Loading Indicator */}
        {isOperating && (
          <View 
            paddingTop="size-75"
            UNSAFE_style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ProgressCircle 
              size="S" 
              isIndeterminate 
              aria-label="Processing..."
              UNSAFE_style={{
                color: '#6366F1'
              }}
            />
          </View>
        )}
      </Flex>
    </View>
  );
};

export default TaskItem;