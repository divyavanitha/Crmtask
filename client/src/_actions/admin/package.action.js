import axios from "axios";

import { GET_PACKAGES, FIND_PACKAGE, ADD_NOTIFICATION } from "./types";

export const getPackages = () => async dispatch => {
    try {
        let response = await axios.get('/api/admin/package');
        dispatch({
            type: GET_PACKAGES,
            payload: response.data
        })
    } catch(e) {
        dispatch({
            type: GET_PACKAGES,
            payload: null
        })
    }
};

export const getPackagebyId = (id) => dispatch => {
    axios
        .get(`/api/admin/get/package/${id}`)
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

export const addPackage = (user) => async dispatch => {
    try {
        let response = await axios.post('/api/admin/package', user);
        response.data.status = 'success';
        return response.data;
    } catch(e) {
        e.response.data.status = 'error';
        if(e.response.data.statusCode == 422) e.response.data.status = 'warning';
        return e.response.data;
    }
};

export const updatePackage = (user) => async dispatch => {
    try {
        let response = await axios.patch('/api/admin/package', user);
        response.data.status = 'success';
        return response.data;
    } catch(e) {
        e.response.data.status = 'error';
        if(e.response.data.statusCode == 422) e.response.data.status = 'warning';
        return e.response.data;
    }
};

export const deletePackage = (id) => async dispatch => {
    try {
        let response = await axios.delete(`/api/admin/package/${id}`);
        response.data.status = 'success';
        return response.data;
    } catch(e) {
        e.response.data.status = 'error';
        return e.response.data;
    }
}; 


export const changePackageStatus = (id, status) => async dispatch => {
    try {
        let response = await axios.get(`/api/admin/package/changestatus/${id}/${status}`);
        response.data.status = 'success';
        return response.data;
    } catch(e) {
        e.response.data.status = 'error';
        return e.response.data;
    }
}; 