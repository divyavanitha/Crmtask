import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from "react-router-dom";

import { Provider } from 'react-redux';
import setToken from './components/utils/set_token';
import jwt_decode from 'jwt-decode';
import axios from "axios";

import { AUTH_USER } from './_actions/types';
import { ADMIN_USER, RBA } from './_actions/admin/types';
import { ADD_CART_COUNT } from './_actions/types';
import store from "./store.js";

import "popper.js/dist/popper.js";
import "jquery/dist/jquery.js";
import "bootstrap/dist/js/bootstrap.min.js";


if (localStorage.token) {
  setToken(localStorage.token);

  const decoded = jwt_decode(localStorage.token);

  store.dispatch({
    type: AUTH_USER,
    payload: decoded
  })

  axios.get("/api/gig/cart/count").then((response) => {
    store.dispatch({
      type: ADD_CART_COUNT,
      payload: response.data.responseData.count
    });
  }).catch((err) => {

  });


}
if (localStorage.admin_token) {

  const decoded = jwt_decode(localStorage.admin_token);
  if (decoded) {
    axios.post("/api/admin/permissions", {}, { headers: { 'Authorization': `${localStorage.admin_token}` } }).then((response) => {
      store.dispatch({
        type: RBA,
        payload: response.data.responseData
      });
    }).catch((err) => {

    });
  }


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
