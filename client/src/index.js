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
import { getArticles } from './actions/article.action';
import { getUsers } from './actions/users.action';
import ReactTooltip from 'react-tooltip';
import { getEdito } from './actions/edito.action';

const store = createStore(
  rootReducer, composeWithDevTools(applyMiddleware(thunk, logger))
);

store.dispatch(getArticles());
store.dispatch(getUsers());
store.dispatch(getEdito());

ReactDOM.render(
    <Provider store={store}>
      <ReactTooltip place="top"/>
      <App />
    </Provider>,
  document.getElementById('root')
);