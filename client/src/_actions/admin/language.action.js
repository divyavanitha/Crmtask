import axios from "axios";
import setAuthToken from "../../components/utils/set_admin_token";
import jwt_decode from "jwt-decode";

import { GET_LANGUAGES, FIND_LANGUAGE, ADD_NOTIFICATION } from "./types";

export const getLanguages = () => dispatch => {
    axios
        .get('/api/admin/language')
        .then(res => {
            dispatch({
                type: GET_LANGUAGES,
                payload: res.data
            })
        }
        )
        .catch(e =>
            dispatch({
                type: GET_LANGUAGES,
                payload: null
            })
        );
};

export const getLanguagebyId = (id) => dispatch => {
    axios
        .get(`/api/admin/get/language/${id}`)
        .then(res => {
            dispatch({
                type: FIND_LANGUAGE,
                payload: res.data
            })
        }
        )
        .catch(e =>
            dispatch({
                type: FIND_LANGUAGE,
                payload: null
            })
        );
};

export const addLanguage = (user) => dispatch => {
    axios
        .post('/api/admin/language', user)
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

export const updateLanguage = (user) => dispatch => {
    axios
        .patch('/api/admin/language', user)
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

export const deleteLanguage = (id) => dispatch => {
    axios
        .delete(`/api/admin/language/${id}`)
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