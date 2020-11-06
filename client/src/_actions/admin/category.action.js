import axios from "axios";

import { GET_CATEGORIES, FIND_CATEGORY } from "./types";

export const getCategories = () => async dispatch => {
    try {
        let response = await axios.get('/api/admin/category');
        dispatch({
            type: GET_CATEGORIES,
            payload: response.data
        })
    } catch(e) {
        dispatch({
            type: GET_CATEGORIES,
            payload: null
        })
    }
};

export const getCategorybyId = (id) => dispatch => {
    axios
        .get(`/api/admin/get/category/${id}`)
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

export const addCategory = (user) => async dispatch => {
    try {
        let response = await axios.post('/api/admin/category', user);
        response.data.status = 'success';
        return response.data;
    } catch(e) {
        e.response.data.status = 'error';
        if(e.response.data.statusCode === 422) e.response.data.status = 'warning';
        return e.response.data;
    }
};

export const updateCategory = (user) => async dispatch => {
    try {
        let response = await axios.patch('/api/admin/category', user);
        response.data.status = 'success';
        return response.data;
    } catch(e) {
        e.response.data.status = 'error';
        if(e.response.data.statusCode === 422) e.response.data.status = 'warning';
        return e.response.data;
    }
};

export const deleteCategory = (id) => async dispatch => {
    try {
        let response = await axios.delete(`/api/admin/category/${id}`);
        response.data.status = 'success';
        return response.data;
    } catch(e) {
        e.response.data.status = 'error';
        return e.response.data;
    }
}; 


export const changeCategoryStatus = (id, status) => async dispatch => {
    try {
        let response = await axios.get(`/api/admin/category/changestatus/${id}/${status}`);
        response.data.status = 'success';
        return response.data;
    } catch(e) {
        e.response.data.status = 'error';
        return e.response.data;
    }
}; 