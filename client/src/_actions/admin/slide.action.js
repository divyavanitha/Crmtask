import axios from "axios";

import { GET_SLIDES, FIND_SLIDE } from "./types";

export const getSlides = () => dispatch => {
    let token = localStorage.admin_token;
    axios
        .get('/api/admin/slide', { headers: { 'Authorization': `${token}` } })
        .then(res => {
            dispatch({
                type: GET_SLIDES,
                payload: res.data
            })
        }
        )
        .catch(e =>
            dispatch({
                type: GET_SLIDES,
                payload: null
            })
        );
};

export const getSlidebyId = (id) => dispatch => {
    let token = localStorage.admin_token;
    axios
        .get(`/api/admin/get/slide/${id}`, { headers: { 'Authorization': `${token}` } })
        .then(res => {
            dispatch({
                type: FIND_SLIDE,
                payload: res.data
            })
        }
        )
        .catch(e =>
            dispatch({
                type: FIND_SLIDE,
                payload: null
            })
        );
};

export const addSlide = (data) => async dispatch => {
    try {
        let token = localStorage.admin_token;
        let response = await axios.post('/api/admin/slide', data, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
        return e.response.data;
    }
};

export const updateSlide = (data) => async dispatch => {
    try {
        let token = localStorage.admin_token;
        let response = await axios.patch('/api/admin/slide', data, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
        return e.response.data;
    }
};

export const deleteSlide = (id) => async dispatch => {
    try {
        let token = localStorage.admin_token;
        let response = await axios.delete(`/api/admin/slide/${id}`, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        return e.response.data;
    }
};

export const changeSlideStatus = (id, status) => async dispatch => {
    try {
        let token = localStorage.admin_token;
        let response = await axios.get(`/api/admin/slide/changestatus/${id}/${status}`, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        return e.response.data;
    }
};  