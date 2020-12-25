import React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

interface Props {
    isFullWidth?: boolean;
}

interface OwnProps extends RouteComponentProps,Props { }


const Footer: React.FC<OwnProps> = (props) => {
    return (
        <div />
    );
}

// const logOut = () => {
// 	AuthService.removeAuthData();
// 	// this.props.history.push('/login');
// }
export default withRouter(Footer);
