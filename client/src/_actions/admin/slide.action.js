import axios from "axios";
import setAuthToken from "../../components/utils/set_admin_token";
import jwt_decode from "jwt-decode";

import { GET_SLIDES, FIND_SLIDE } from "./types";

export const getSlides = () => dispatch => {
    axios
        .get('/api/admin/slide')
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
    axios
        .get(`/api/admin/get/slide/${id}`)
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

export const addSlide = (user) => async dispatch => {
    try {
        let response = await axios.post('/api/admin/slide', user);
        response.data.status = 'success';
        return response.data;
    } catch(e) {
        e.response.data.status = 'error';
        if(e.response.data.statusCode == 422) e.response.data.status = 'warning';
        return e.response.data;
    }
};

export const updateSlide = (user) => async dispatch => {
    try {
        let response = await axios.patch('/api/admin/slide', user);
        response.data.status = 'success';
        return response.data;
    } catch(e) {
        e.response.data.status = 'error';
        if(e.response.data.statusCode == 422) e.response.data.status = 'warning';
        return e.response.data;
    }
};

export const deleteSlide = (id) => async dispatch => {
    try {
        let response = await axios.delete(`/api/admin/slide/${id}`);
        response.data.status = 'success';
    return response.data;
    } catch(e) {
        e.response.data.status = 'error';
        return e.response.data;
    }
};

export const changeSlideStatus = (id, status) => async dispatch => {
    try {
        let response = await axios.get(`/api/admin/slide/changestatus/${id}/${status}`);
        response.data.status = 'success';
        return response.data;
    } catch(e) {
        e.response.data.status = 'error';
        return e.response.data;
    }
};  