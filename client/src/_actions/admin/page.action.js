import axios from "axios";

import { GET_PAGES, FIND_PAGE } from "./types";

export const getPages = () => async dispatch => {
    try {
        let token = localStorage.adminToken;
        let response = await axios.get('/api/admin/page', { headers: { 'Authorization': `${token}` } });
        dispatch({
            type: GET_PAGES,
            payload: response.data
        })
    } catch (e) {
        dispatch({
            type: GET_PAGES,
            payload: null
        })
    }
};

export const getPagebyId = (id) => dispatch => {
    let token = localStorage.adminToken;
    axios
        .get(`/api/admin/get/page/${id}`, { headers: { 'Authorization': `${token}` } })
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

export const addPage = (data) => async dispatch => {
    try {
        let token = localStorage.adminToken;
        let response = await axios.post('/api/admin/page', data, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
        return e.response.data;
    }
};

export const updatePage = (data) => async dispatch => {
    try {
        let token = localStorage.adminToken;
        let response = await axios.patch('/api/admin/page', data, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
        return e.response.data;
    }
};

export const deletePage = (id) => async dispatch => {
    try {
        let token = localStorage.adminToken;
        let response = await axios.delete(`/api/admin/page/${id}`, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        return e.response.data;
    }
};


export const changePageStatus = (id, status) => async dispatch => {
    try {
        let token = localStorage.adminToken;
        let response = await axios.get(`/api/admin/page/changestatus/${id}/${status}`, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        return e.response.data;
    }
}; 