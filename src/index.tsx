import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import 'shared/util/localization';
import * as serviceWorker from './serviceWorker';

const rootEl = document.getElementById('app-site');

// Create a reusable render method that we can call more than once
const render = (Component: React.FC) => {
	ReactDOM.render(<Component />, rootEl);
};

render(Root);

serviceWorker.unregister();
