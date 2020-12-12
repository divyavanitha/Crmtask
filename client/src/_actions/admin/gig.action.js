import axios from "axios";

import { GET_GIGS, FIND_GIG } from "./types";

export const getGigs = (type) => dispatch => {
    let token = localStorage.admin_token;
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
    let token = localStorage.admin_token;
    axios
        .get(`/api/admin/get/gig/${id}`, { headers: { 'Authorization': `${token}` } })
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