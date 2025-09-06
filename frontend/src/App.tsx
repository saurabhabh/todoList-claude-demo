import React from 'react';
import { Provider, defaultTheme, View, Heading } from '@adobe/react-spectrum';
import { RelayEnvironmentProvider } from 'react-relay';
import RelayEnvironment from './relay/Environment';
import TodoApp from './components/TodoApp';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <RelayEnvironmentProvider environment={RelayEnvironment}>
        <Provider theme={defaultTheme}>
          <View padding="size-300" minHeight="100vh" backgroundColor="gray-100">
            <View maxWidth="size-6000" marginX="auto">
              <Heading level={1} marginBottom="size-300">
                Todo List Application
              </Heading>
              <TodoApp />
            </View>
          </View>
        </Provider>
      </RelayEnvironmentProvider>
    </ErrorBoundary>
  );
}

export default App;
