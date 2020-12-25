import React from 'react';

import Header from 'shared/components/header/header';
// import Footer from 'shared/components/footer/footer';
import { withRouter, RouteComponentProps } from 'react-router-dom';

const Layout: React.FC<RouteComponentProps> = props => {
	return (
		<>
			<Header />
			<main className='app-main-content-wrapper'>
				{props.children}
			</main>
			{/* {props.location.pathname !== '/live-stream' && <Footer />} */}
		</>
	);
};

export default withRouter(Layout);
