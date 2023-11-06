import React from 'react';

interface IProps {
  children?: React.ReactNode;
}

interface IState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<IProps, IState> {
  public state: IState = {
    hasError: false,
  };

  static getDerivedStateFromError(error: Error) {
    console.log(error.message);
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
