import axios from "axios";

import { GET_MENUS, FIND_MENU } from "./types";

export const getMenus = () => dispatch => {
    axios
        .get('/api/admin/menu')
        .then(res => {
            dispatch({
                type: GET_MENUS,
                payload: res.data
            })
        }
        )
        .catch(e =>
            dispatch({
                type: GET_MENUS,
                payload: null
            })
        );
};

export const getMenubyId = (id) => dispatch => {
    axios
        .get(`/api/admin/get/menu/${id}`)
        .then(res => {
            dispatch({
                type: FIND_MENU,
                payload: res.data
            })
        }
        )
        .catch(e =>
            dispatch({
                type: FIND_MENU,
                payload: null
            })
        );
};

export const addMenu = (user) => async dispatch => {
    try {
        let response = await axios.post('/api/admin/menu', user);
        response.data.status = 'success';
        return response.data;
    } catch(e) {
        e.response.data.status = 'error';
        if(e.response.data.statusCode === 422) e.response.data.status = 'warning';
        return e.response.data;
    }
};

export const updateMenu = (user) => async dispatch => {
    try {
        let response = await axios.patch('/api/admin/menu', user);
        response.data.status = 'success';
        return response.data;
    } catch(e) {
        e.response.data.status = 'error';
        if(e.response.data.statusCode === 422) e.response.data.status = 'warning';
        return e.response.data;
    }
};

export const deleteMenu = (id) => async dispatch => {
    try {
        let response = await axios.delete(`/api/admin/menu/${id}`);
        response.data.status = 'success';
    return response.data;
    } catch(e) {
        e.response.data.status = 'error';
        return e.response.data;
    }
};

export const changeMenuStatus = (id, status) => async dispatch => {
    try {
        let response = await axios.get(`/api/admin/menu/changestatus/${id}/${status}`);
        response.data.status = 'success';
        return response.data;
    } catch(e) {
        e.response.data.status = 'error';
        return e.response.data;
    }
};  