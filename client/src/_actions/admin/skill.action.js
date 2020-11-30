import axios from "axios";

import { GET_SKILLS, FIND_SKILL } from "./types";

export const getSkills = () => dispatch => {
    let token = localStorage.admin_token;
    axios
        .get('/api/admin/skill', { headers: { 'Authorization': `${token}` } })
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
    let token = localStorage.admin_token;
    axios
        .get(`/api/admin/get/skill/${id}`, { headers: { 'Authorization': `${token}` } })
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

export const addSkill = (data) => async dispatch => {
    try {
        let token = localStorage.admin_token;
        let response = await axios.post('/api/admin/skill', data, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
        return e.response.data;
    }

};

export const updateSkill = (data) => async dispatch => {
    try {
        let token = localStorage.admin_token;
        let response = await axios.patch('/api/admin/skill', data, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
        return e.response.data;
    }
};

export const deleteSkill = (id) => async dispatch => {
    try {
        let token = localStorage.admin_token;
        let response = await axios.delete(`/api/admin/skill/${id}`, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        return e.response.data;
    }
};

export const changeSkillStatus = (id, status) => async dispatch => {
    try {
        let token = localStorage.admin_token;
        let response = await axios.get(`/api/admin/skill/changestatus/${id}/${status}`, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        return e.response.data;
    }
}; 