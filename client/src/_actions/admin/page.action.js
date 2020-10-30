import axios from "axios";

import { GET_PAGES, FIND_PAGE, ADD_NOTIFICATION } from "./types";

export const getPages = () => async dispatch => {
    try {
        let response = await axios.get('/api/admin/page');
        dispatch({
            type: GET_PAGES,
            payload: response.data
        })
    } catch(e) {
        dispatch({
            type: GET_PAGES,
            payload: null
        })
    }
};

export const getPagebyId = (id) => dispatch => {
    axios
        .get(`/api/admin/get/page/${id}`)
        .then(res => {
            dispatch({
                type: FIND_PAGE,
                payload: res.data
            })
        }
        )
        .catch(e =>
            dispatch({
                type: FIND_PAGE,
                payload: null
            })
        );
};

export const addPage = (user) => async dispatch => {
    try {
        let response = await axios.post('/api/admin/page', user);
        response.data.status = 'success';
        return response.data;
    } catch(e) {
        e.response.data.status = 'error';
        if(e.response.data.statusCode == 422) e.response.data.status = 'warning';
        return e.response.data;
    }
};

export const updatePage = (user) => async dispatch => {
    try {
        let response = await axios.patch('/api/admin/page', user);
        response.data.status = 'success';
        return response.data;
    } catch(e) {
        e.response.data.status = 'error';
        if(e.response.data.statusCode == 422) e.response.data.status = 'warning';
        return e.response.data;
    }
};

export const deletePage = (id) => async dispatch => {
    try {
        let response = await axios.delete(`/api/admin/page/${id}`);
        response.data.status = 'success';
        return response.data;
    } catch(e) {
        e.response.data.status = 'error';
        return e.response.data;
    }
}; 


export const changePageStatus = (id, status) => async dispatch => {
    try {
        let response = await axios.get(`/api/admin/page/changestatus/${id}/${status}`);
        response.data.status = 'success';
        return response.data;
    } catch(e) {
        e.response.data.status = 'error';
        return e.response.data;
    }
}; 