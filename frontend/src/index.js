import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';

import configureStore from './store/index';
import { restoreCSRF, fetch } from './store/csrf';

import * as sessionActions from './store/session';

import { ChakraProvider } from '@chakra-ui/react';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
	restoreCSRF();
	window.csrfFetch = fetch;
	window.store = store;
	window.sessionActions = sessionActions;
}

function Root() {
	return (
		<ChakraProvider>
			<Provider store={store}>
				<App />
			</Provider>
		</ChakraProvider>
	);
}

ReactDOM.render(
	<React.StrictMode>
		<Root />
	</React.StrictMode>,
	document.getElementById('root')
);
