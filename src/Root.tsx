import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './shared/components/errorBoundary/errorBoundary';
import App from './App';

const Root: React.FC = props => {
	return (
			<ErrorBoundary>
				<div className='app-main'>
					<BrowserRouter>
						<App {...props} />
					</BrowserRouter>
				</div>
			</ErrorBoundary>
	);
};

export default Root;
