import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.log(!!errorInfo);
  }

  render() {
    const { error, errorInfo } = this.state;
    if (errorInfo) {
      return (
        <div>
          Error <p>{JSON.stringify(errorInfo)}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
