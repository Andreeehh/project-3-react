import { Component } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const s = {
  style: {
    fontSize: '60px',
  },
};

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Algo deu errado</h1>;
    }

    return this.props.children;
  }
}

const ItWillThrowError = () => {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    if (counter > 3) {
      throw new Error('error');
    }
  }, [counter]);
  return (
    <div>
      <button {...s} onClick={() => setCounter((c) => c + 1)}>
        Click to increase {counter}
      </button>
    </div>
  );
};

export const Home = () => {
  return (
    <div {...s}>
      <ErrorBoundary>
        <ItWillThrowError />
      </ErrorBoundary>
      <ErrorBoundary>
        <ItWillThrowError />
      </ErrorBoundary>
      <ErrorBoundary>
        <ItWillThrowError />
      </ErrorBoundary>
      <ErrorBoundary>
        <ItWillThrowError />
      </ErrorBoundary>
      <ErrorBoundary>
        <ItWillThrowError />
      </ErrorBoundary>
    </div>
  );
};
