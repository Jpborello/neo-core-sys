import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
                    <div className="bg-white p-8 rounded-lg shadow-xl max-w-2xl w-full">
                        <h2 className="text-2xl font-bold text-red-600 mb-4">Algo salió mal 😢</h2>
                        <div className="bg-red-50 border border-red-200 rounded p-4 mb-4 overflow-auto">
                            <p className="font-mono text-sm text-red-800 whitespace-pre-wrap">
                                {this.state.error && this.state.error.toString()}
                            </p>
                        </div>
                        <details className="text-gray-600 text-sm">
                            <summary className="cursor-pointer mb-2 font-medium">Ver detalles técnicos</summary>
                            <pre className="bg-gray-50 p-4 rounded overflow-auto h-64 text-xs">
                                {this.state.errorInfo && this.state.errorInfo.componentStack}
                            </pre>
                        </details>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                        >
                            Recargar Página
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
