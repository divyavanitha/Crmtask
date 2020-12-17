import axios from "axios";

import { GET_GIGS, FIND_GIG } from "./types";

export const getGigs = (type) => dispatch => {
    let token = localStorage.adminToken;
    axios
        .get(`/api/admin/gigs`, { headers: { 'Authorization': `${token}` } })
        .then(res => {
            dispatch({
                type: GET_GIGS,
                payload: res.data
            })
        }
        )
        .catch(e =>
            dispatch({
                type: GET_GIGS,
                payload: null
            })
        );
};

export const getGigbyId = (id) => dispatch => {
    let token = localStorage.adminToken;
    axios
        .get(`/api/admin/gig/details/${id}`, { headers: { 'Authorization': `${token}` } })
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

export const changeGigStatus = (id, status) => async dispatch => {
    try {
        let token = localStorage.adminToken;
        let response = await axios.get(`/api/admin/change/gigstatus/${id}/${status}`, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        return e.response.data;
    }
}; 

export const deleteGig = (id) => async dispatch => {
  try {
    let response = await axios.delete(`/api/admin/gig/delete/${id}`);
    response.data.status = 'success';
    return response.data;
  } catch (e) {
    e.response.data.status = 'error';
    return e.response.data;
  }
};

export const requestModification = (data) => async dispatch => {
    try {
        let token = localStorage.adminToken;
        let response = await axios.post('/api/admin/gig/request/modification', data, { headers: { 'Authorization': `${token}` } });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
        return e.response.data;
    }
};