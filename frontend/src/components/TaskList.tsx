import React, { useMemo } from 'react';
import { 
  View, 
  ListView, 
  Item, 
  Heading, 
  Text, 
  Flex,
  ProgressCircle,
  IllustratedMessage,
  Badge,
  Tabs,
  TabList,
  TabPanels
} from '@adobe/react-spectrum';
import TaskItem from './TaskItem';
import { Task, TaskStatus } from '../types/Task';
import NotFound from '@spectrum-icons/illustrations/NotFound';
import CheckmarkCircle from '@spectrum-icons/workflow/CheckmarkCircle';
import Clock from '@spectrum-icons/workflow/Clock';
import ViewList from '@spectrum-icons/workflow/ViewList';

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
  // Memoized task statistics
  const taskStats = useMemo(() => {
    const completed = tasks.filter(task => task.status === TaskStatus.COMPLETED).length;
    const pending = tasks.length - completed;
    const completionPercentage = tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0;
    
    return { completed, pending, total: tasks.length, completionPercentage };
  }, [tasks]);

  // Categorized tasks
  const categorizedTasks = useMemo(() => {
    const pending = tasks.filter(task => task.status === TaskStatus.PENDING);
    const completed = tasks.filter(task => task.status === TaskStatus.COMPLETED);
    
    return { pending, completed };
  }, [tasks]);

  if (loading) {
    return (
      <View>
        <Flex direction="column" alignItems="center" gap="size-300" marginY="size-600">
          <ProgressCircle aria-label="Loading tasks" isIndeterminate size="L" />
          <Text UNSAFE_style={{ fontSize: '1.1rem', opacity: 0.7 }}>
            Loading your tasks...
          </Text>
        </Flex>
      </View>
    );
  }

  if (tasks.length === 0) {
    return (
      <View marginY="size-600">
        <IllustratedMessage>
          <NotFound />
          <Heading UNSAFE_style={{ color: '#6B7280' }}>No tasks yet</Heading>
          <Text UNSAFE_style={{ color: '#9CA3AF', textAlign: 'center', maxWidth: '400px' }}>
            Ready to get organized? Create your first task above and start checking things off your list!
          </Text>
        </IllustratedMessage>
      </View>
    );
  }

  return (
    <View>
      {/* Task Statistics Header */}
      <Flex direction="column" gap="size-300" marginBottom="size-400">
        <Flex direction="row" alignItems="center" justifyContent="space-between">
          <Flex direction="row" alignItems="center" gap="size-200">
            <ViewList size="M" UNSAFE_style={{ color: '#6366F1' }} />
            <Heading level={2} UNSAFE_style={{ margin: 0, color: '#1F2937' }}>
              Your Tasks
            </Heading>
          </Flex>
          
          <Flex direction="row" gap="size-200">
            <Badge variant="info" UNSAFE_style={{ background: '#EFF6FF', color: '#2563EB' }}>
              <Clock size="XS" />
              {taskStats.pending} Pending
            </Badge>
            <Badge variant="positive" UNSAFE_style={{ background: '#F0FDF4', color: '#16A34A' }}>
              <CheckmarkCircle size="XS" />
              {taskStats.completed} Completed
            </Badge>
          </Flex>
        </Flex>

        {/* Progress Bar */}
        {taskStats.total > 0 && (
          <View>
            <Flex justifyContent="space-between" marginBottom="size-100">
              <Text UNSAFE_style={{ fontSize: '0.9rem', color: '#6B7280' }}>
                Progress: {taskStats.completionPercentage}% complete
              </Text>
              <Text UNSAFE_style={{ fontSize: '0.9rem', color: '#6B7280' }}>
                {taskStats.completed} of {taskStats.total} tasks
              </Text>
            </Flex>
            
            <View 
              UNSAFE_style={{
                width: '100%',
                height: '8px',
                backgroundColor: '#E5E7EB',
                borderRadius: '4px',
                overflow: 'hidden'
              }}
            >
              <View 
                UNSAFE_style={{
                  width: `${taskStats.completionPercentage}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #10B981, #059669)',
                  borderRadius: '4px',
                  transition: 'width 0.3s ease-in-out'
                }}
              />
            </View>
          </View>
        )}
      </Flex>

      {/* Task Categories with Tabs */}
      <Tabs defaultSelectedKey="all" UNSAFE_style={{ marginTop: '1rem' }}>
        <TabList>
          <Item key="all">
            All Tasks ({taskStats.total})
          </Item>
          <Item key="pending">
            Pending ({taskStats.pending})
          </Item>
          <Item key="completed">
            Completed ({taskStats.completed})
          </Item>
        </TabList>
        
        <TabPanels>
          <Item key="all">
            <View marginTop="size-400">
              <Flex direction="column" gap="size-300">
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
          </Item>
          
          <Item key="pending">
            <View marginTop="size-400">
              {categorizedTasks.pending.length === 0 ? (
                <Flex direction="column" alignItems="center" gap="size-200" marginY="size-600">
                  <CheckmarkCircle size="L" UNSAFE_style={{ color: '#10B981' }} />
                  <Text UNSAFE_style={{ color: '#6B7280', textAlign: 'center' }}>
                    Great job! No pending tasks.
                  </Text>
                </Flex>
              ) : (
                <Flex direction="column" gap="size-300">
                  {categorizedTasks.pending.map(task => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onToggleStatus={onToggleStatus}
                      onDelete={onDeleteTask}
                    />
                  ))}
                </Flex>
              )}
            </View>
          </Item>
          
          <Item key="completed">
            <View marginTop="size-400">
              {categorizedTasks.completed.length === 0 ? (
                <Flex direction="column" alignItems="center" gap="size-200" marginY="size-600">
                  <Clock size="L" UNSAFE_style={{ color: '#6B7280' }} />
                  <Text UNSAFE_style={{ color: '#6B7280', textAlign: 'center' }}>
                    Complete some tasks to see them here.
                  </Text>
                </Flex>
              ) : (
                <Flex direction="column" gap="size-300">
                  {categorizedTasks.completed.map(task => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onToggleStatus={onToggleStatus}
                      onDelete={onDeleteTask}
                    />
                  ))}
                </Flex>
              )}
            </View>
          </Item>
        </TabPanels>
      </Tabs>
    </View>
  );
};

export default TaskList;