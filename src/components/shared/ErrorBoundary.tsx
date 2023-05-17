import React, { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
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
    console.error('Uncaught errora:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <h1>{this.props.fallback}</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
