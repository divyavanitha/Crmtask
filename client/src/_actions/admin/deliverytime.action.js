import axios from "axios";
import setAuthToken from "../../components/utils/set_admin_token";
import jwt_decode from "jwt-decode";

import { GET_DELIVERY_TIMES, FIND_DELIVERY_TIME, ADD_NOTIFICATION } from "./types";

export const getDeliveryTimes = () => dispatch => {
    axios
        .get('/api/admin/delivery/time')
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
    axios
        .get(`/api/admin/get/delivery/time/${id}`)
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

export const addDeliveryTime = (user) => dispatch => {
    axios
        .post('/api/admin/delivery/time', user)
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

export const updateDeliveryTime = (user) => dispatch => {
    axios
        .patch('/api/admin/delivery/time', user)
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

export const deleteDeliveryTime = (id) => dispatch => {
    axios
        .delete(`/api/admin/delivery/time/${id}`)
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