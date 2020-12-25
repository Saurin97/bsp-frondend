import React, { Component } from "react";
import { Link, Redirect, NavLink } from "react-router-dom";
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { AuthState } from "shared/interface";

interface UIState {
   isOpen: boolean;
   actionType: string;
}

interface OwnProps extends RouteComponentProps { }

class Header extends Component<OwnProps> {
   state: UIState = {
      isOpen: false,
      actionType: '',
   };

   componentDidMount = () => {
      // const isLoggedIn = AuthService.checkLogin();
      // if (isLoggedIn && isEmpty(this.props.userData)) {
      //    this.props.getProfile();
      // }
   }
   render() {
      // if(!AuthService.checkLogin()) {
      //    return <Redirect to='/' />
      // }     
      console.log(this.state.isOpen, this.state.actionType);
      
      return (
         <>
            <header className="header" />
         </>
      );
   }

}
export default withRouter(Header);
