import axios from "axios";
import setAuthToken from "../../components/utils/set_admin_token";
import jwt_decode from "jwt-decode";

import { GET_SUB_CATEGORIES, FIND_SUB_CATEGORY, ADD_NOTIFICATION, DELETE_SUB_CATEGORY } from "./types";

export const getSubCategories = () => dispatch => {
    axios
        .get('/api/admin/subcategory')
        .then(res => {
            dispatch({
                type: GET_SUB_CATEGORIES,
                payload: res.data
            })
        }
        )
        .catch(e =>
            dispatch({
                type: GET_SUB_CATEGORIES,
                payload: null
            })
        );
};

export const getSubCategorybyId = (id) => dispatch => {
    axios
        .get(`/api/admin/get/subcategory/${id}`)
        .then(res => {
            console.log('cat', res.data);
            dispatch({
                type: FIND_SUB_CATEGORY,
                payload: res.data
            })
        }
        )
        .catch(e =>
            dispatch({
                type: FIND_SUB_CATEGORY,
                payload: null
            })
        );
};

export const addSubCategory = (user) => dispatch => {
    axios
        .post('/api/admin/subcategory', user)
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

export const updateSubCategory = (user) => dispatch => {
    axios
        .patch('/api/admin/subcategory', user)
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

export const deleteSubCategory = (id) => dispatch => {
    axios
        .delete(`/api/admin/subcategory/${id}`)
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