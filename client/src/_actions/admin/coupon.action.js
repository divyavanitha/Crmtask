import axios from "axios";
import setAuthToken from "../../components/utils/set_admin_token";
import jwt_decode from "jwt-decode";

import { GET_COUPONS, FIND_COUPON, ADD_NOTIFICATION } from "./types";

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
            console.log('cat', res.data);
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

export const addCoupon = (user) => dispatch => {
    axios
        .post('/api/admin/coupon', user)
        .then(res => {
            console.log(res.data);
            dispatch({
                type: ADD_NOTIFICATION,
                payload: { title: res.data.title, message: res.data.message }
            });
          
        }
        )
        .catch(e => {
            dispatch({
                type: ADD_NOTIFICATION,
                payload: { title: e.response.data.title, message: e.response.data.error.message }
            });
        });
};

export const updateCoupon = (user) => async dispatch => {
    await axios
        .patch('/api/admin/coupon', user)
        .then(res => {
            console.log(res.data);
            dispatch({
                type: ADD_NOTIFICATION,
                payload: { title: res.data.title, message: res.data.message }
            });
        
        }
        )
        .catch(e => {
            dispatch({
                type: ADD_NOTIFICATION,
                payload: { title: e.response.data.title, message: e.response.data.error.message }
            });
        });
};

export const deleteCoupon = (id) => async dispatch => {
    await axios
        .delete(`/api/admin/coupon/${id}`)
        .then(res => {
            dispatch({
                type: ADD_NOTIFICATION,
                payload: { title: res.data.title, message: res.data.message }
            });
        }
        )
        .catch(e => {
            dispatch({
                type: ADD_NOTIFICATION,
                payload: { title: e.response.data.title, message: e.response.data.error.message }
            });
        });
}; 