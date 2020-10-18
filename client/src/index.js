import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from "react-router-dom";

import { Provider } from 'react-redux';
import setToken from './components/utils/set_token';
import jwt_decode from 'jwt-decode';

import "popper.js/dist/popper.js";
import "jquery/dist/jquery.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "animate.css/animate.css";
import "font-awesome/css/font-awesome.min.css";

/* import "./css/App.css";
import "./css/Responsive.css"; */

import { AUTH_USER } from './_actions/types';
import { ADMIN_USER } from './_actions/admin/types';
import store from "./store.js";
const $ = window.$;

if (localStorage.token) {
  setToken(localStorage.token);

  const decoded = jwt_decode(localStorage.token);

  store.dispatch({
    type: AUTH_USER,
    payload: decoded
  })

}
if (localStorage.admin_token) {
  setToken(localStorage.admin_token);

  const decoded = jwt_decode(localStorage.admin_token);

  store.dispatch({
    type: ADMIN_USER,
    payload: decoded
  })

}

ReactDOM.render(
  <Provider store={store}>
    <Router><App /></Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
