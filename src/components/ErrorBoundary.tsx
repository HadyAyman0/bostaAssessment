import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button, Typography } from "@material-tailwind/react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
          <Typography variant="h4" color="red" className="mb-4">
            Something went wrong
          </Typography>
          <Typography color="gray" className="mb-6 max-w-md">
            {this.state.error?.message || "An unexpected error occurred"}
          </Typography>
          <div className="flex gap-4">
            <Button onClick={this.handleReset} color="blue">
              Try Again
            </Button>
            <Button
              onClick={() => window.location.reload()}
              variant="outlined"
              color="gray"
            >
              Reload Page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
