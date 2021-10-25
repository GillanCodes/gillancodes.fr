import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import rootReducer from './reducers';
import App from './App';
import thunk from "redux-thunk";


//not in BUILD !!!!!!!!!!!!
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';

const store = createStore(
  rootReducer, composeWithDevTools(applyMiddleware(thunk, logger))
);

ReactDOM.render(
    <Provider store={store}>
      <App />,
    </Provider>,
  document.getElementById('root')
);