import axios from "axios";

import { GET_DELIVERY_TIMES, FIND_DELIVERY_TIME } from "./types";

export const getDeliveryTimes = () => dispatch => {
    let token = localStorage.admin_token;
    axios
        .get('/api/admin/delivery/time', { headers: { 'Authorization': `${token}` } })
        .then(res => {
            dispatch({
                type: GET_DELIVERY_TIMES,
                payload: res.data
            })
        }
        )
        .catch(e =>
            dispatch({
                type: GET_DELIVERY_TIMES,
                payload: null
            })
        );
};

export const getDeliveryTimebyId = (id) => dispatch => {
    let token = localStorage.admin_token;
    axios
        .get(`/api/admin/get/delivery/time/${id}`, { headers: { 'Authorization': `${token}` } })
        .then(res => {
            dispatch({
                type: FIND_DELIVERY_TIME,
                payload: res.data
            })
        }
        )
        .catch(e =>
            dispatch({
                type: FIND_DELIVERY_TIME,
                payload: null
            })
        );
};

export const addDeliveryTime = (data) => async dispatch => {
    try {
        let token = localStorage.admin_token;
        let response = await axios.post('/api/admin/delivery/time', data, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
        return e.response.data;
    }
};

export const updateDeliveryTime = (data) => async dispatch => {
    try {
        let token = localStorage.admin_token;
        let response = await axios.patch('/api/admin/delivery/time', data, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
        return e.response.data;
    }
};

export const deleteDeliveryTime = (id) => async dispatch => {
    try {
        let token = localStorage.admin_token;
        let response = await axios.delete(`/api/admin/delivery/time/${id}`, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        return e.response.data;
    }
};

export const changeDeliveryTimeStatus = (id, status) => async dispatch => {
    try {
        let token = localStorage.admin_token;
        let response = await axios.get(`/api/admin/delivery/time/changestatus/${id}/${status}`, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        return e.response.data;
    }
}; 