import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import configureStore from './store/index';
import { restoreCSRF, fetch} from './store/csrf';

import * as sessionActions from './store/session';

import { ChakraProvider } from "@chakra-ui/react";

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();
  window.csrfFetch = fetch;
  window.store = store;
  window.sessionActions = sessionActions;
};

function Root() {
  return (
    <ChakraProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ChakraProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
