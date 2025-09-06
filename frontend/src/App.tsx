import React from 'react';
import { Provider, defaultTheme } from '@adobe/react-spectrum';
import { RelayEnvironmentProvider } from 'react-relay';
import RelayEnvironment from './relay/Environment';
import TodoApp from './components/TodoApp';
import ErrorBoundary from './components/ErrorBoundary';
import './styles/modern-ui.css';

function App() {
  return (
    <ErrorBoundary>
      <RelayEnvironmentProvider environment={RelayEnvironment}>
        <Provider theme={defaultTheme}>
          <TodoApp />
        </Provider>
      </RelayEnvironmentProvider>
    </ErrorBoundary>
  );
}

export default App;
