import axios from "axios";

import { GET_CATEGORIES, FIND_CATEGORY } from "./types";

export const getCategories = () => async dispatch => {
    try {
        let token = localStorage.admin_token;
        let response = await axios.get('/api/admin/category', { headers: { 'Authorization': `${token}` } });
        dispatch({
            type: GET_CATEGORIES,
            payload: response.data
        })
    } catch (e) {
        dispatch({
            type: GET_CATEGORIES,
            payload: null
        })
    }
};

export const getCategorybyId = (id) => dispatch => {
    let token = localStorage.admin_token;
    axios
        .get(`/api/admin/get/category/${id}`, { headers: { 'Authorization': `${token}` } })
        .then(res => {
            dispatch({
                type: FIND_CATEGORY,
                payload: res.data
            })
        }
        )
        .catch(e =>
            dispatch({
                type: FIND_CATEGORY,
                payload: null
            })
        );
};

export const addCategory = (data) => async dispatch => {
    try {
        let token = localStorage.admin_token;
        let response = await axios.post('/api/admin/category', data, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
        return e.response.data;
    }
};

export const updateCategory = (data) => async dispatch => {
    try {
        let token = localStorage.admin_token;
        let response = await axios.patch('/api/admin/category', data, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
        return e.response.data;
    }
};

export const deleteCategory = (id) => async dispatch => {
    try {
        let token = localStorage.admin_token;
        let response = await axios.delete(`/api/admin/category/${id}`, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        return e.response.data;
    }
};


export const changeCategoryStatus = (id, status) => async dispatch => {
    try {
        let token = localStorage.admin_token;
        let response = await axios.get(`/api/admin/category/changestatus/${id}/${status}`, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        return e.response.data;
    }
}; 