import React, { Suspense } from 'react';
import { 
  View, 
  Flex, 
  ProgressCircle, 
  Text, 
  Heading,
  Divider,
  Content,
  Header
} from '@adobe/react-spectrum';
import CheckmarkCircle from '@spectrum-icons/workflow/CheckmarkCircle';
import AddTaskFormContainer from './AddTaskFormContainer';
import TaskListContainer from './TaskListContainer';

const TodoApp: React.FC = () => {
  return (
    <View 
      backgroundColor="gray-50" 
      minHeight="100vh"
      UNSAFE_style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}
    >
      <View 
        maxWidth="size-6000" 
        marginX="auto" 
        padding="size-400"
        UNSAFE_style={{ minHeight: '100vh' }}
        UNSAFE_className="todo-app-container"
      >
        {/* Modern Header */}
        <Header>
          <Flex direction="column" alignItems="center" gap="size-300" marginBottom="size-600">
            <View 
              padding="size-300"
              UNSAFE_style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <CheckmarkCircle size="XL" UNSAFE_style={{ color: 'white' }} />
            </View>
            
            <Flex direction="column" alignItems="center" gap="size-100">
              <Heading 
                level={1} 
                UNSAFE_style={{ 
                  color: 'white',
                  fontSize: '2.5rem',
                  fontWeight: '300',
                  textAlign: 'center',
                  textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                }}
                UNSAFE_className="responsive-text-lg"
              >
                TodoApp
              </Heading>
              <Text 
                UNSAFE_style={{ 
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '1.1rem',
                  textAlign: 'center',
                  textShadow: '0 1px 5px rgba(0,0,0,0.3)'
                }}
              >
                Organize your tasks with style
              </Text>
            </Flex>
          </Flex>
        </Header>

        {/* Main Content Card */}
        <View 
          backgroundColor="static-white"
          borderRadius="large"
          padding="size-500"
          UNSAFE_style={{
            boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.8)'
          }}
        >
          <Content>
            <Flex direction="column" gap="size-600">
              <View>
                <Heading level={2} marginBottom="size-200">
                  Create New Task
                </Heading>
                <AddTaskFormContainer />
              </View>
              
              <Divider size="M" />
              
              <View>
                <Suspense fallback={
                  <Flex direction="column" alignItems="center" gap="size-300" marginY="size-800">
                    <ProgressCircle 
                      aria-label="Loading tasks" 
                      isIndeterminate 
                      size="L"
                    />
                    <Text UNSAFE_style={{ fontSize: '1.1rem', opacity: 0.7 }}>
                      Loading your tasks...
                    </Text>
                  </Flex>
                }>
                  <TaskListContainer />
                </Suspense>
              </View>
            </Flex>
          </Content>
        </View>

        {/* Footer */}
        <Flex justifyContent="center" marginTop="size-400">
          <Text 
            UNSAFE_style={{ 
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '0.9rem',
              textAlign: 'center'
            }}
          >
            Built with React, GraphQL & Adobe Spectrum
          </Text>
        </Flex>
      </View>
    </View>
  );
};

export default TodoApp;