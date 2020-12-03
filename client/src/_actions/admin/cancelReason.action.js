import axios from "axios";

import { GET_CANCEL_REASONS, FIND_CANCEL_REASON } from "./types";

export const getCancelReasons = () => async dispatch => {
    try {
        let token = localStorage.admin_token;
        let response = await axios.get('/api/admin/cancel/reason', { headers: { 'Authorization': `${token}` } });
        dispatch({
            type: GET_CANCEL_REASONS,
            payload: response.data
        })
    } catch (e) {
        dispatch({
            type: GET_CANCEL_REASONS,
            payload: null
        })
    }
};

export const getCancelReasonbyId = (id) => dispatch => {
    let token = localStorage.admin_token;
    axios
        .get(`/api/admin/get/cancel/reason/${id}`, { headers: { 'Authorization': `${token}` } })
        .then(res => {
            dispatch({
                type: FIND_CANCEL_REASON,
                payload: res.data
            })
        }
        )
        .catch(e =>
            dispatch({
                type: FIND_CANCEL_REASON,
                payload: null
            })
        );
};

export const addCancelReason = (data) => async dispatch => {
    try {
        let token = localStorage.admin_token;
        let response = await axios.post('/api/admin/cancel/reason', data, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
        return e.response.data;
    }
};

export const updateCancelReason = (data) => async dispatch => {
    try {
        let token = localStorage.admin_token;
        let response = await axios.patch('/api/admin/cancel/reason', data, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
        return e.response.data;
    }
};

export const deleteCancelReason = (id) => async dispatch => {
    try {
        let token = localStorage.admin_token;
        let response = await axios.delete(`/api/admin/cancel/reason/${id}`, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        return e.response.data;
    }
};


export const changeCancelReasonStatus = (id, status) => async dispatch => {
    try {
        let token = localStorage.admin_token;
        let response = await axios.get(`/api/admin/cancel/reason/changestatus/${id}/${status}`, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        return e.response.data;
    }
}; 