import axios from "axios";

import { GET_COUPONS, FIND_COUPON } from "./types";

export const getCoupons = () => dispatch => {
    axios
        .get('/api/admin/coupon')
        .then(res => {
            dispatch({
                type: GET_COUPONS,
                payload: res.data
            })
        }
        )
        .catch(e =>
            dispatch({
                type: GET_COUPONS,
                payload: null
            })
        );
};

export const getCouponbyId = (id) => dispatch => {
    axios
        .get(`/api/admin/get/coupon/${id}`)
        .then(res => {
            dispatch({
                type: FIND_COUPON,
                payload: res.data
            })
        }
        )
        .catch(e =>
            dispatch({
                type: FIND_COUPON,
                payload: null
            })
        );
};

export const addCoupon = (user) => async dispatch => {
    try {
        let response = await axios.post('/api/admin/coupon', user);
        response.data.status = 'success';
        return response.data;
    } catch(e) {
        e.response.data.status = 'error';
        if(e.response.data.statusCode === 422) e.response.data.status = 'warning';
        return e.response.data;
    }
};

export const updateCoupon = (user) => async dispatch => {
    try {
        let response = await axios.patch('/api/admin/coupon', user);
        response.data.status = 'success';
        return response.data;
    } catch(e) {
        e.response.data.status = 'error';
        if(e.response.data.statusCode === 422) e.response.data.status = 'warning';
        return e.response.data;
    }
};

export const deleteCoupon = (id) => async dispatch => {
    try {
        let response = await axios.delete(`/api/admin/coupon/${id}`);
        response.data.status = 'success';
    return response.data;
    } catch(e) {
        e.response.data.status = 'error';
        return e.response.data;
    }
};

export const changeCouponStatus = (id, status) => async dispatch => {
    try {
        let response = await axios.get(`/api/admin/coupon/changestatus/${id}/${status}`);
        response.data.status = 'success';
        return response.data;
    } catch(e) {
        e.response.data.status = 'error';
        return e.response.data;
    }
};  