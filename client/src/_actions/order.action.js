import axios from 'axios';
import queryString from 'query-string';
import setToken from '../components/utils/set_token';

export const checkout = (data) => async dispatch => {
    try {
        let response = await axios.post('/api/checkout', data);
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
        return e.response.data;
    }
}

export const updateOrder = (data) => async dispatch => {
    try {
        let response = await axios.post('/api/update/order/status', data);
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
        return e.response.data;
    }
}

export const rating = (data) => async dispatch => {
    try {
        let response = await axios.post('/api/rate', data);
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
        return e.response.data;
    }
}

export const cancel = (data) => async dispatch => {
    try {
        let response = await axios.post('/api/cancel', data);
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
        return e.response.data;
    }
}

export const tips = (data) => async dispatch => {
    try {
        let response = await axios.post('/api/tips', data);
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
        return e.response.data;
    }
}
