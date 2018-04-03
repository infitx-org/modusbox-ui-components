import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import Views from './views';

import './assets/main.css';

class Root extends React.Component {
	render() {
		return (
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
		);
	}
}

export default Root;

/**
 *  Define rendering function to display errors when necessary
 *  Use Module Hot
 */

const rootEl = document.getElementById('root');

// React Performance Tool
console.warn = () => {
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
			ReactDOM.render(<Root />, rootEl);
		} catch (error) {
			renderError(error);
		}
	};

	module.hot.accept('./Root', () => setTimeout(renderWithModuleHot));
}
ReactDOM.render(<Root />, rootEl);
