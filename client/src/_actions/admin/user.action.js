import axios from "axios";

import { GET_USERS, FIND_USER } from "./types";

export const getUsers = () => async dispatch => {
    try {
        let token = localStorage.adminToken;
        let response = await axios.get('/api/admin/user', { headers: { 'Authorization': `${token}` } });
        dispatch({
            type: GET_USERS,
            payload: response.data
        })
    } catch (e) {
        dispatch({
            type: GET_USERS,
            payload: null
        })
    }
};

export const getUserbyId = (id) => dispatch => {
    let token = localStorage.adminToken;
    axios
        .get(`/api/admin/get/user/${id}`, { headers: { 'Authorization': `${token}` } })
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

export const addUser = (data) => async dispatch => {
    try {
        let token = localStorage.adminToken;
        let response = await axios.post('/api/admin/user', data, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
        return e.response.data;
    }
};

export const updateUser = (data) => async dispatch => {
    try {
        let token = localStorage.adminToken;
        let response = await axios.patch('/api/admin/user', data, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
        return e.response.data;
    }
};

export const deleteUser = (id) => async dispatch => {
    try {
        let token = localStorage.adminToken;
        let response = await axios.delete(`/api/admin/user/${id}`, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        return e.response.data;
    }
};


export const changeUserStatus = (id, status) => async dispatch => {
    try {
        let token = localStorage.adminToken;
        let response = await axios.get(`/api/admin/user/changestatus/${id}/${status}`, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        return e.response.data;
    }
}; 