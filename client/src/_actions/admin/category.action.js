import axios from "axios";
import setAuthToken from "../../components/utils/set_admin_token";
import jwt_decode from "jwt-decode";

import { GET_CATEGORIES, FIND_CATEGORY, ADD_NOTIFICATION, DELETE_CATEGORY } from "./types";

export const getCategories = () => dispatch => {
    axios
        .get('/api/admin/category')
        .then(res => {
            dispatch({
                type: GET_CATEGORIES,
                payload: res.data
            })
        }
        )
        .catch(e =>
            dispatch({
                type: GET_CATEGORIES,
                payload: null
            })
        );
};

export const getCategorybyId = (id) => dispatch => {
    axios
        .get(`/api/admin/get/category/${id}`)
        .then(res => {
            console.log('cat', res.data);
            dispatch({
                type: FIND_CATEGORY,
                payload: res.data
            })
        }
        )
        .catch(e =>
            dispatch({
                type: FIND_CATEGORY,
                payload: null
            })
        );
};

export const addCategory = (user) => dispatch => {
    axios
        .post('/api/admin/category', user)
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

export const updateCategory = (user) => async dispatch => {
    await axios
        .patch('/api/admin/category', user)
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

export const deleteCategory = (id) => async dispatch => {
    await axios
        .delete(`/api/admin/category/${id}`)
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