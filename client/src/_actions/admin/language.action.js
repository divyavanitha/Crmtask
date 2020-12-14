import axios from "axios";

import { GET_LANGUAGES, FIND_LANGUAGE } from "./types";

export const getLanguages = () => dispatch => {
    let token = localStorage.adminToken;
    axios
        .get('/api/admin/language', { headers: { 'Authorization': `${token}` } })
        .then(res => {
            dispatch({
                type: GET_LANGUAGES,
                payload: res.data
            })
        }
        )
        .catch(e =>
            dispatch({
                type: GET_LANGUAGES,
                payload: null
            })
        );
};

export const getLanguagebyId = (id) => dispatch => {
    let token = localStorage.adminToken;
    axios
        .get(`/api/admin/get/language/${id}`, { headers: { 'Authorization': `${token}` } })
        .then(res => {
            dispatch({
                type: FIND_LANGUAGE,
                payload: res.data
            })
        }
        )
        .catch(e =>
            dispatch({
                type: FIND_LANGUAGE,
                payload: null
            })
        );
};

export const addLanguage = (data) => async dispatch => {
    try {
        let token = localStorage.adminToken;
        let response = await axios.post('/api/admin/language', data, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
        return e.response.data;
    }
};

export const updateLanguage = (data) => async dispatch => {
    try {
        let token = localStorage.adminToken;
        let response = await axios.patch('/api/admin/language', data, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
        return e.response.data;
    }
};

export const deleteLanguage = (id) => async dispatch => {
    try {
        let token = localStorage.adminToken;
        let response = await axios.delete(`/api/admin/language/${id}`, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        return e.response.data;
    }
};

export const changeLanguageStatus = (id, status) => async dispatch => {
    try {
        let token = localStorage.adminToken;
        let response = await axios.get(`/api/admin/language/changestatus/${id}/${status}`, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        return e.response.data;
    }
}; 