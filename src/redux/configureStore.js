import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers';
import ReduxThunk from 'redux-thunk';

const TestMiddleware = ({ getState, dispatch }) => next => action => {
	return next(action);
};

export default function configureStore() {
	var middlewares = undefined;

	const logger = ({ getState }) => next => action => {
		console.info(action.type);
		const result = next(action);
		return result;
	};

	const devToolsMiddleware = window.devToolsExtension
		? window.devToolsExtension()
		: f => f;

	let middlewareList = [ReduxThunk, logger, TestMiddleware];
	middlewares = compose(applyMiddleware(...middlewareList), devToolsMiddleware);

	return createStore(reducer, undefined, middlewares);
}
