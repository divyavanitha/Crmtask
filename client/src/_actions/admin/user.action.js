import axios from "axios";
import setAuthToken from "../../components/utils/set_admin_token";
import jwt_decode from "jwt-decode";

import { GET_USERS, FIND_USER } from "./types";

export const getUsers = () => async dispatch => {
    try {
        let response = await axios.get('/api/admin/user');
        dispatch({
            type: GET_USERS,
            payload: response.data
        })
    } catch(e) {
        dispatch({
            type: GET_USERS,
            payload: null
        })
    }
};

export const getUserbyId = (id) => dispatch => {
    axios
        .get(`/api/admin/get/user/${id}`)
        .then(res => {
            dispatch({
                type: FIND_USER,
                payload: res.data
            })
        }
        )
        .catch(e =>
            dispatch({
                type: FIND_USER,
                payload: null
            })
        );
};

export const addUser = (user) => async dispatch => {
    try {
        let response = await axios.post('/api/admin/user', user);
        response.data.status = 'success';
        return response.data;
    } catch(e) {
        e.response.data.status = 'error';
        if(e.response.data.statusCode == 422) e.response.data.status = 'warning';
        return e.response.data;
    }
};

export const updateUser = (user) => async dispatch => {
    try {
        let response = await axios.patch('/api/admin/user', user);
        response.data.status = 'success';
        return response.data;
    } catch(e) {
        e.response.data.status = 'error';
        if(e.response.data.statusCode == 422) e.response.data.status = 'warning';
        return e.response.data;
    }
};

export const deleteUser = (id) => async dispatch => {
    try {
        let response = await axios.delete(`/api/admin/user/${id}`);
        response.data.status = 'success';
        return response.data;
    } catch(e) {
        e.response.data.status = 'error';
        return e.response.data;
    }
}; 


export const changeUserStatus = (id, status) => async dispatch => {
    try {
        let response = await axios.get(`/api/admin/user/changestatus/${id}/${status}`);
        response.data.status = 'success';
        return response.data;
    } catch(e) {
        e.response.data.status = 'error';
        return e.response.data;
    }
}; 