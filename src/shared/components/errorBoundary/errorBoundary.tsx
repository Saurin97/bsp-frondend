import React from 'react';
class ErrorBoundary extends React.Component {
	state = {
		error: null
	};
	static getDerivedStateFromError(error: Error | null) {
		return { error };
	}

	componentDidMount() {
		//window.onerror = this.logError;
	}
	componentDidCatch(error: Error | null, info: object) {
		this.logError(error);
	}

	
	render() {
		if (this.state.error) {
			return 'Application has errors. Please check logs to fix this';
		}
		return this.props.children;
	}
	
	logError(args: Error | null) {
		console.log(args);
	}
}

export default ErrorBoundary;
