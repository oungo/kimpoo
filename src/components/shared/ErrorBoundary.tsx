import React, { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  fallback: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    fetch('/api/logError', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error, errorInfo }),
    }).catch((error) => console.error(`Failed to log error in ErrorBoundary. ${error}`));
  }

  public render() {
    if (this.state.hasError) {
      return <>{this.props.fallback}</>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
