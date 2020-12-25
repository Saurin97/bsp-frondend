import React from 'react';
import {
  Switch,
  Redirect,
  withRouter,
  RouteComponentProps,
  Route,
} from 'react-router-dom';

import 'assets/styles/app.scss';

import AuthService from 'shared/services/auth.service';
import HomePage from 'features/homepage/container/homepage';
import Layout from 'hoc/layout/component/layout.component';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC<RouteComponentProps> = () => {
  const isLoggedIn = AuthService.checkLogin();
  
  if (isLoggedIn) {
    return (
      <Layout>
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Redirect to='/' />
        </Switch>
      </Layout>
    );
  }

  return (
    <>
      <Switch>
        {/* <Route path="/" exact component={ComingSoon} /> */}
        <Route path='/' exact component={HomePage} />
        <Redirect to='/' />
      </Switch>
    </>
  );
};

export default withRouter(App);
