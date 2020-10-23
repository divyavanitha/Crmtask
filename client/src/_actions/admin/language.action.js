import axios from "axios";
import setAuthToken from "../../components/utils/set_admin_token";
import jwt_decode from "jwt-decode";

import { GET_LANGUAGES, FIND_LANGUAGE, ADD_NOTIFICATION } from "./types";

export const getLanguages = () => dispatch => {
    axios
        .get('/api/admin/language')
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
    axios
        .get(`/api/admin/get/language/${id}`)
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

export const addLanguage = (user) => async dispatch => {
    try {
        let response = await axios.post('/api/admin/language', user);
        response.data.status = 'success';
        return response.data;
    } catch(e) {
        e.response.data.status = 'error';
        if(e.response.data.statusCode == 422) e.response.data.status = 'warning';
        return e.response.data;
    }
};

export const updateLanguage = (user) => async dispatch => {
    try {
        let response = await axios.patch('/api/admin/language', user);
        response.data.status = 'success';
        return response.data;
    } catch(e) {
        e.response.data.status = 'error';
        if(e.response.data.statusCode == 422) e.response.data.status = 'warning';
        return e.response.data;
    }
};

export const deleteLanguage = (id) => async dispatch => {
    try {
    let response = await axios.delete(`/api/admin/language/${id}`);
    response.data.status = 'success';
    return response.data;
    } catch(e) {
        e.response.data.status = 'error';
        return e.response.data;
    }
}; 

export const changeLanguageStatus = (id, status) => async dispatch => {
    try {
        let response = await axios.get(`/api/admin/language/changestatus/${id}/${status}`);
        response.data.status = 'success';
        return response.data;
    } catch(e) {
        e.response.data.status = 'error';
        return e.response.data;
    }
}; 