import React, { Component } from "react";

export class ErrorBoundary extends Component<{}, { hasError: boolean }> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <h1 className="text-center">
          There was an error. Try to refresh page. If problem persists, contact
          me on caldr.l@hotmail.com
        </h1>
      );
    }

    return this.props.children;
  }
}
