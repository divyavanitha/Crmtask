import axios from "axios";
import setAuthToken from "../../components/utils/set_admin_token";
import jwt_decode from "jwt-decode";

import { GET_SKILLS, FIND_SKILL, ADD_NOTIFICATION } from "./types";

export const getSkills = () => dispatch => {
    axios
        .get('/api/admin/skill')
        .then(res => {
            dispatch({
                type: GET_SKILLS,
                payload: res.data
            })
        }
        )
        .catch(e =>
            dispatch({
                type: GET_SKILLS,
                payload: null
            })
        );
};

export const getSkillbyId = (id) => dispatch => {
    axios
        .get(`/api/admin/get/skill/${id}`)
        .then(res => {
            dispatch({
                type: FIND_SKILL,
                payload: res.data
            })
        }
        )
        .catch(e =>
            dispatch({
                type: FIND_SKILL,
                payload: null
            })
        );
};

export const addSkill = (user) => dispatch => {
    axios
        .post('/api/admin/skill', user)
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

export const updateSkill = (user) => dispatch => {
    axios
        .patch('/api/admin/skill', user)
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

export const deleteSkill = (id) => dispatch => {
    axios
        .delete(`/api/admin/skill/${id}`)
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