import axios from "axios";

import { GET_PACKAGES, FIND_PACKAGE } from "./types";

export const getPackages = () => async dispatch => {
    try {
        let token = localStorage.adminToken;
        let response = await axios.get('/api/admin/package', { headers: { 'Authorization': `${token}` } });
        dispatch({
            type: GET_PACKAGES,
            payload: response.data
        })
    } catch (e) {
        dispatch({
            type: GET_PACKAGES,
            payload: null
        })
    }
};

export const getPackagebyId = (id) => dispatch => {
    let token = localStorage.adminToken;
    axios
        .get(`/api/admin/get/package/${id}`, { headers: { 'Authorization': `${token}` } })
        .then(res => {
            dispatch({
                type: FIND_PACKAGE,
                payload: res.data
            })
        }
        )
        .catch(e =>
            dispatch({
                type: FIND_PACKAGE,
                payload: null
            })
        );
};

export const addPackage = (data) => async dispatch => {
    try {
        let token = localStorage.adminToken;
        let response = await axios.post('/api/admin/package', data, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
        return e.response.data;
    }
};

export const updatePackage = (data) => async dispatch => {
    try {
        let token = localStorage.adminToken;
        let response = await axios.patch('/api/admin/package', data, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
        return e.response.data;
    }
};

export const deletePackage = (id) => async dispatch => {
    try {
        let token = localStorage.adminToken;
        let response = await axios.delete(`/api/admin/package/${id}`, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        return e.response.data;
    }
};


export const changePackageStatus = (id, status) => async dispatch => {
    try {
        let token = localStorage.adminToken;
        let response = await axios.get(`/api/admin/package/changestatus/${id}/${status}`, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        return e.response.data;
    }
}; 