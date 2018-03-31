import 'babel-polyfill';
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './redux/configureStore';
import Views from './views';

import './assets/main.css';
var store = configureStore();

class Root extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<div
					style={{
						width: '100%',
						height: '100%',
						overflow: 'hidden',
						display: 'flex',
					}}
				>
					<Views />
				</div>
			</Provider>
		);
	}
}

export default Root;

/**
 *  Define rendering function to display errors when necessary
 *  Use Module Hot
 */

const rootEl = document.getElementById('root');
const render = () => ReactDOM.render(<Root />, rootEl);

// React Performance Tool
console.warn = args => {
	console.log('%c warn', 'background:#ff9; color:#333;');
};
const Perf = require('react-addons-perf');
window.Perf = Perf;

// Hot Module Replacement
if (module.hot) {
	// Support hot reloading of components
	// and display an overlay for runtime errors
	const renderError = error => {
		const RedBox = require('redbox-react');
		ReactDOM.render(<RedBox error={error} />, rootEl);
	};

	const renderWithModuleHot = () => {
		try {
			render();
		} catch (error) {
			renderError(error);
		}
	};

	module.hot.accept('./Root', () => setTimeout(renderWithModuleHot));
}
render();
