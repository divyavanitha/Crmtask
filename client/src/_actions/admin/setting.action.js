import axios from "axios";

import { GET_ADMIN_SETTINGS } from "./types";

export const getSetting = () => async dispatch => {
    try {
        let token = localStorage.admin_token;
        let response = await axios.get('/api/admin/settings', { headers: { 'Authorization': `${token}` } });
        dispatch({
            type: GET_ADMIN_SETTINGS,
            payload: response.data.responseData
        })
    } catch (e) {
    }
};

export const updateGeneralSetting = (data) => async dispatch => {
    try {
        let token = localStorage.admin_token;
        let response = await axios.post('/api/admin/settings/general', data, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
        return e.response.data;
    }
};

export const updateSocialLinkSetting = (data) => async dispatch => {
    try {
        let token = localStorage.admin_token;
        let response = await axios.post('/api/admin/settings/social_links', data, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
        return e.response.data;
    }
};

export const updateSocialSetting = (data) => async dispatch => {
    try {
        let token = localStorage.admin_token;
        let response = await axios.post('/api/admin/settings/social', data, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
        return e.response.data;
    }
};

export const updateSmsSetting = (data) => async dispatch => {
    try {
        let token = localStorage.admin_token;
        let response = await axios.post('/api/admin/settings/sms', data, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
        return e.response.data;
    }
};

export const updateMailSetting = (data) => async dispatch => {
    try {
        let token = localStorage.admin_token;
        let response = await axios.post('/api/admin/settings/mail', data, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
        return e.response.data;
    }
};

export const updatePaymentSetting = (data) => async dispatch => {
    try {
        let token = localStorage.admin_token;
        let response = await axios.post('/api/admin/settings/payment', data, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
        return e.response.data;
    }
};

export const updateApplicationSetting = (data) => async dispatch => {
    try {
        let token = localStorage.admin_token;
        let response = await axios.post('/api/admin/settings/application', data, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
        return e.response.data;
    }
};

export const updateSellerSetting = (data) => async dispatch => {
    try {
        let token = localStorage.admin_token;
        let response = await axios.post('/api/admin/settings/seller', data, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
        return e.response.data;
    }
};

export const updateGigSetting = (data) => async dispatch => {
    try {
        let token = localStorage.admin_token;
        let response = await axios.post('/api/admin/settings/gig', data, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
        return e.response.data;
    }
};

export const updatePricingSetting = (data) => async dispatch => {
    try {
        let token = localStorage.admin_token;
        let response = await axios.post('/api/admin/settings/pricing', data, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
        return e.response.data;
    }
};