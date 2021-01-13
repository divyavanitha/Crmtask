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

import { AUTH_USER, LOGOUT_USER } from './_actions/types';
import { ADMIN_USER, RBA, LOG_OUT } from './_actions/admin/types';
import { ADD_CART_COUNT } from './_actions/types';
import store from "./store.js";
import $ from 'jquery';

import "popper.js/dist/popper.js";
import "jquery/dist/jquery.js";
import "bootstrap/dist/js/bootstrap.min.js";


if (localStorage.token) {
  setToken(localStorage.token);

  const decoded = jwt_decode(localStorage.token);

  axios.get("/api/profile").then((response) => {
    console.log(response)
  }).catch((err) => {

  });

  /*decoded.wallet = 

  "_id": "5fdb2f99f6a1971be19f9020",
  "firstName": "User",
  "lastName": "Demo",
  "email": "demo@demo.com",
  "mobile": "9876543210",
  "wallet": 170,*/

  store.dispatch({
    type: AUTH_USER,
    payload: decoded
  })

  axios.get("/api/cart/count").then((response) => {
    store.dispatch({
      type: ADD_CART_COUNT,
      payload: response.data.responseData.count
    });
  }).catch((err) => {

  });
}
if (localStorage.adminToken) {

  const decoded = jwt_decode(localStorage.adminToken);
  if (decoded) {
    axios.post("/api/admin/permissions", {}, { headers: { 'Authorization': `${localStorage.adminToken}` } }).then((response) => {
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

$( document ).ajaxError(function( event, jqXHR, settings, exception ) {
    if (jqXHR.status == 401 && localStorage.adminToken != null && localStorage.adminToken != 'false') {
        refreshToken(true);
    } else if (jqXHR.status == 401) {
         window.location.replace("/admin/login");
    }
});

function refreshToken(isAdmin = false) {

  if(isAdmin) {

    if(localStorage.adminToken) {
        axios.post("/api/admin/refresh", {refresh_token: localStorage.adminRefreshToken} ).then((response) => {
        const { token, refreshToken } = response.data.responseData.user;
        localStorage.setItem('adminToken', token);
        localStorage.setItem('adminRefreshToken', refreshToken);
      }).catch((err) => {

        store.dispatch({
          type: LOG_OUT,
          payload: ""
        })

        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminRefreshToken");
        
      });
    } else {

    }
    
  } else {
    if(localStorage.token) {
      axios.post("/api/refresh", {refresh_token: localStorage.refreshToken} ).then((response) => {
        const { token, refreshToken } = response.data.responseData.user;
        setToken(token);
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
      }).catch((err) => {

       store.dispatch({
          type: LOGOUT_USER,
          payload: ""
       })

       setToken(false);

       localStorage.removeItem("token");
       localStorage.removeItem('refreshToken');
        
      });
    }
    

  }
  
  
}

axios.interceptors.response.use((response) => {
    return response;
}, (error) => {
      if(error.response.status == 401) {
        let url = (error.response.config.url).split("/");

        if(!(url.indexOf('admin') > -1)) refreshToken( url.indexOf('admin') > -1 );


        if( (window.location.href).includes('/admin/login') ) refreshToken( 'admin' );
        else if(window.location.pathname != '/') refreshToken();
      }

      throw error;
      
});

$("body").on("keypress", ".phone", function(e) {
        if (
            e.which != 8 &&
            e.which != 0 &&
            e.which != 43 &&
            e.which != 45 &&
            (e.which < 48 || e.which > 57)
        ) {
            return false;
        }
    });

  $("body").on("keypress", ".numbers", function(e) {
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });

  $("body").on("keypress", ".decimal", function(e) {
        if (e.which != 8 && e.which != 0 && e.which != 43 && e.which != 45 && e.which != 46 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });

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
