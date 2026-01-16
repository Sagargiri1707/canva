import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('HTMLEditor Error:', error, errorInfo);
        this.setState({
            error,
            errorInfo
        });
    }

    handleReset = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null
        });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="html-editor-error-boundary">
                    <div className="html-editor-error-content">
                        <h2>⚠️ Something went wrong</h2>
                        <p>The HTML Editor encountered an unexpected error.</p>
                        {this.state.error && (
                            <details className="html-editor-error-details">
                                <summary>Error Details</summary>
                                <pre>{this.state.error.toString()}</pre>
                                {this.state.errorInfo && (
                                    <pre>{this.state.errorInfo.componentStack}</pre>
                                )}
                            </details>
                        )}
                        <div className="html-editor-error-actions">
                            <button
                                className="html-editor-btn html-editor-btn-primary"
                                onClick={this.handleReset}
                            >
                                Try Again
                            </button>
                            <button
                                className="html-editor-btn html-editor-btn-secondary"
                                onClick={() => window.location.reload()}
                            >
                                Reload Page
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
