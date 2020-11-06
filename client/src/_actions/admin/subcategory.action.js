import axios from "axios";

import { GET_SUB_CATEGORIES, FIND_SUB_CATEGORY } from "./types";

export const getSubCategories = () => dispatch => {
    axios
        .get('/api/admin/subcategory')
        .then(res => {
            dispatch({
                type: GET_SUB_CATEGORIES,
                payload: res.data
            })
        }
        )
        .catch(e =>
            dispatch({
                type: GET_SUB_CATEGORIES,
                payload: null
            })
        );
};

export const getSubCategorybyId = (id) => dispatch => {
    axios
        .get(`/api/admin/get/subcategory/${id}`)
        .then(res => {
            dispatch({
                type: FIND_SUB_CATEGORY,
                payload: res.data
            })
        }
        )
        .catch(e =>
            dispatch({
                type: FIND_SUB_CATEGORY,
                payload: null
            })
        );
};

export const addSubCategory = (user) => async dispatch => {
    try {
        let response = await axios.post('/api/admin/subcategory', user);
        response.data.status = 'success';
        return response.data;
    } catch(e) {
        e.response.data.status = 'error';
        if(e.response.data.statusCode === 422) e.response.data.status = 'warning';
        return e.response.data;
    }
};

export const updateSubCategory = (user) => async dispatch => {
    try {
        let response = await axios.patch('/api/admin/subcategory', user);
        response.data.status = 'success';
        return response.data;
    } catch(e) {
        e.response.data.status = 'error';
        if(e.response.data.statusCode === 422) e.response.data.status = 'warning';
        return e.response.data;
    }
};

export const deleteSubCategory = (id) => async dispatch => {
    try {
        let response = await axios.delete(`/api/admin/subcategory/${id}`);
        response.data.status = 'success';
        return response.data;
    } catch(e) {
        e.response.data.status = 'error';
        return e.response.data;
    }
}; 

export const changeSubCategoryStatus = (id, status) => async dispatch => {
    try {
        let response = await axios.get(`/api/admin/subcategory/changestatus/${id}/${status}`);
        response.data.status = 'success';
        return response.data;
    } catch(e) {
        e.response.data.status = 'error';
        return e.response.data;
    }
}; 