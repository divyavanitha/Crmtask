import axios from 'axios';
import queryString from 'query-string';
import setToken from '../components/utils/set_token';
import {
    AUTH_USER,
    LOGOUT_USER,    
} from './types';


export const login = (data) => async dispatch => {

    try {
        
        const response = await axios.post(`/api/login`, data);

        const { token, refreshToken } = response.data.responseData.user;

        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);

        setToken(token);

        dispatch({
            type: AUTH_USER,
            payload: response.data.responseData.user
        });

    } catch (e) {

    }

}


export const register = (data) => async dispatch => {

    try {
        const response = await axios.post(`/api/register`, data);

        const { token, refreshToken } = response.data.responseData.user;

        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);

        setToken(token);

        dispatch({
            type: AUTH_USER,
            payload: response.data.responseData.user
        });

    } catch (e) {

    }
}


export function auth() {

    const request = axios.get(`/api/users/user`, { headers: { 'Authorization': localStorage.getItem('jwtToken') } })
        .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
    // return {
    //     type: SET_CURRENT_USER,
    //     payload: decoded
    //   };
}

export const logout = () => dispatch => {

    localStorage.removeItem("token");
    localStorage.removeItem('refreshToken');

    setToken(false);

    dispatch({
        type: LOGOUT_USER,
        payload: ""
    })
}

export const changePassword = (data) => async dispatch => {

    try {

        const response = await axios.post(`/api/change/password`, data);
        response.data.status = 'success';
        return response.data;

    } catch (e) { 
        e.response.data.status = 'error';
        if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
        return e.response.data;
    }

};




