import axios from "axios";

import { GET_POSTS, FIND_POST } from "./types";

export const getPosts = () => dispatch => {
    let token = localStorage.adminToken;
    axios
        .get('/api/admin/post', { headers: { 'Authorization': `${token}` } })
        .then(res => {
            dispatch({
                type: GET_POSTS,
                payload: res.data
            })
        }
        )
        .catch(e =>
            dispatch({
                type: GET_POSTS,
                payload: null
            })
        );
};

export const getPostbyId = (id) => dispatch => {
    let token = localStorage.adminToken;
    axios
        .get(`/api/admin/get/post/${id}`, { headers: { 'Authorization': `${token}` } })
        .then(res => {
            dispatch({
                type: FIND_POST,
                payload: res.data
            })
        }
        )
        .catch(e =>
            dispatch({
                type: FIND_POST,
                payload: null
            })
        );
};

export const addPost = (data) => async dispatch => {
    try {
        let token = localStorage.adminToken;
        let response = await axios.post('/api/admin/post', data, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
        return e.response.data;
    }
};

export const updatePost = (data) => async dispatch => {
    try {
        let token = localStorage.adminToken;
        let response = await axios.patch('/api/admin/post', data, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
        return e.response.data;
    }
};

export const deletePost = (id) => async dispatch => {
    try {
        let token = localStorage.adminToken;
        let response = await axios.delete(`/api/admin/post/${id}`, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        return e.response.data;
    }
};

export const changePostStatus = (id, status) => async dispatch => {
    try {
        let token = localStorage.adminToken;
        let response = await axios.get(`/api/admin/post/changestatus/${id}/${status}`, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        return e.response.data;
    }
};  

export const changeCommentStatus = (id, status) => async dispatch => {
    try {
        let token = localStorage.adminToken;
        let response = await axios.get(`/api/admin/comment/changestatus/${id}/${status}`, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        return e.response.data;
    }
};  