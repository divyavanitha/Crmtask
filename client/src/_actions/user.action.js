import axios from 'axios';
import setToken from '../components/utils/set_token';
import { useDispatch } from "react-redux";
import {
    AUTH_USER,
    LOGOUT_USER,
    RESET_PASSWORD,
    VERIFY,
    GET_ALLPOSTJOB,
    GET_MENUS,
    GET_CATEGORY,
    GET_SUBCATEGORY,
    GET_SLIDES,
    GET_GIGS,
    FIND_GIG
} from './types';


export const login = (data) => async dispatch => {

    try {
        const response = await axios.post(`/api/login`, data);

        const { token } = response.data.responseData.user;

        localStorage.setItem('token', token);

        setToken(token);

        dispatch({
            type: AUTH_USER,
            payload: response.data.responseData.user
        });

    } catch (e) {

    }

}


export const register = (data) => async dispatch => {

    try {
        const response = await axios.post(`/api/register`, data);

        const { token } = response.data.responseData.user;

        localStorage.setItem('token', token);

        setToken(token);

        dispatch({
            type: AUTH_USER,
            payload: response.data.responseData.user
        });

    } catch (e) {

    }
}


export const social_login = (data) => async dispatch => {

    try {
        const response = await axios.post(`/api/social`, data);

        const { token } = response.data.responseData.user;

        localStorage.setItem('token', token);

        setToken(token);

        dispatch({
            type: AUTH_USER,
            payload: response.data.responseData.user
        });

    } catch (e) {

    }
}


export function auth() {

    const request = axios.get(`/api/users/user`, { headers: { 'Authorization': localStorage.getItem('jwtToken') } })
        .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
    // return {
    //     type: SET_CURRENT_USER,
    //     payload: decoded
    //   };
}

export const logout = () => dispatch => {

    localStorage.removeItem("token");

    setToken(false);

    dispatch({
        type: LOGOUT_USER,
        payload: ""
    })
}
export function forgetpassword(dataToSubmit) {
    const request = axios.post(`/api/auth/reset-password`, dataToSubmit)
        .then(response => response.data);

    return {
        type: RESET_PASSWORD,
        payload: request
    }
}
export function verification() {
    const request = axios.post(`/api/auth/verification`)
        .then(response => response.data);

    return {
        type: VERIFY,
        payload: request
    }
}
export function getallpostjob() {
    const request = axios.get(`/api/postjob/getallpostjob`)
        .then(response => response.data);

    return {
        type: GET_ALLPOSTJOB,
        payload: request
    }
}


export const getMenu = (data) => async dispatch => {

    let menu = await axios.get("/api/menu", data);

    //console.log('menu',menu);

    dispatch({
        type: GET_MENUS,
        payload: menu.data
    });

};

export const getCategory = (data) => async dispatch => {
    const category = await axios.get(`/api/category`, data)
    dispatch({
        type: GET_CATEGORY,
        payload: category.data
    });
}

export const getSubCategory = (id) => async dispatch => {
    const subcategory = await axios.get(`/api/subcategory/${id}`)
    console.log("subcategory",subcategory.data)
    /*dispatch({
        type: GET_SUBCATEGORY,
        payload: subcategory.data
    });*/

    return subcategory.data;
}

export const getSlide = (data) => async dispatch => {

    let slide = await axios.get("/api/slide", data);

    dispatch({
        type: GET_SLIDES,
        payload: slide.data
    });

};

export const getGigWithoutAuth = (data) => async dispatch => {

    let gig = await axios.get("/api/list/gigs", data);

    dispatch({
        type: GET_GIGS,
        payload: gig.data
    });

};

export const getGigbyId = (id) => dispatch => {
    axios
        .get(`/api/get/gig/details/${id}`)
        .then(res => {
            dispatch({
                type: FIND_GIG,
                payload: res.data
            })
        }
        )
        .catch(e =>
            dispatch({
                type: FIND_GIG,
                payload: null
            })
        );
};