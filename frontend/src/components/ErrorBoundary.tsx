import React from 'react';
import { 
  View, 
  IllustratedMessage, 
  Heading, 
  Content, 
  Button,
  Flex
} from '@adobe/react-spectrum';
import Error from '@spectrum-icons/illustrations/Error';
import Refresh from '@spectrum-icons/workflow/Refresh';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; retry: () => void }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return <FallbackComponent error={this.state.error} retry={this.handleRetry} />;
    }

    return this.props.children;
  }
}

const DefaultErrorFallback: React.FC<{ error?: Error; retry: () => void }> = ({ 
  error, 
  retry 
}) => {
  return (
    <View padding="size-400">
      <IllustratedMessage>
        <Error />
        <Heading>Something went wrong</Heading>
        <Content>
          {error?.message || 'An unexpected error occurred while loading the application.'}
        </Content>
        <Flex direction="column" gap="size-200" alignItems="center" marginTop="size-300">
          <Button variant="cta" onPress={retry}>
            <Refresh />
            Try Again
          </Button>
          {process.env.NODE_ENV === 'development' && error && (
            <View 
              backgroundColor="gray-100" 
              padding="size-200" 
              borderRadius="medium"
              maxWidth="100%"
            >
              <pre style={{ 
                fontSize: '12px', 
                overflow: 'auto', 
                margin: 0,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
              }}>
                {error.stack}
              </pre>
            </View>
          )}
        </Flex>
      </IllustratedMessage>
    </View>
  );
};

export default ErrorBoundary;