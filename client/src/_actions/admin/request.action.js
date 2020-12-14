import axios from "axios";

import { GET_REQUESTS } from "./types";

export const getBuyerRequests = () => async dispatch => {
    try {
        let token = localStorage.adminToken;
        let response = await axios.get('/api/admin/requests', { headers: { 'Authorization': `${token}` } });
        dispatch({
            type: GET_REQUESTS,
            payload: response.data
        })
    } catch (e) {
        dispatch({
            type: GET_REQUESTS,
            payload: null
        })
    }
};

export const deleteRequest = (id) => async dispatch => {
    try {
        let token = localStorage.adminToken;
        let response = await axios.delete(`/api/admin/request/${id}`, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        return e.response.data;
    }
};

export const changeRequestStatus = (id, status) => async dispatch => {
    try {
        let token = localStorage.adminToken;
        let response = await axios.get(`/api/admin/request/changestatus/${id}/${status}`, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        return e.response.data;
    }
};

