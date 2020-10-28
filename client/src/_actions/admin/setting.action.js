import axios from "axios";

import { GET_ADMIN_SETTINGS } from "./types";

export const getGeneralSetting = () => async dispatch => {
    try {
        let response = await axios.get('/api/admin/settings');
        dispatch({
            type: GET_ADMIN_SETTINGS,
            payload: response.data.responseData
        })
    } catch(e) {
    }
};

export const updateGeneralSetting = (data) => async dispatch => {
    try {
        let response = await axios.post('/api/admin/settings/general', data);
        response.data.status = 'success';
        return response.data;
    } catch(e) {
        e.response.data.status = 'error';
        if(e.response.data.statusCode == 422) e.response.data.status = 'warning';
        return e.response.data;
    }
};