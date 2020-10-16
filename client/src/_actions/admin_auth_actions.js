import axios from "axios";
import setAdminToken from "..//components/utils/set_admin_token";
import jwt_decode from "jwt-decode";

import { ADMIN_USER, GET_ERRORS } from "./types";

export const loginUser = (userData, history) => async dispatch => {
    try {
        let login = await axios.post("/api/admin/login", userData );

        const { token } = login.data;
        localStorage.setItem("admin_token", token);

        setAdminToken(token);

        return {
            type: ADMIN_USER,
            payload: login.data
        }
    } catch (e) {
        console.log(e);
        dispatch({
            type: GET_ERRORS,
            payload: e.response.data
        });
    }
};

export const logoutUser = (history) => dispatch => {
    //console.log(history);
    localStorage.removeItem("token");

    setAdminToken(false);

    dispatch({
        type: ADMIN_USER,
        payload: ""
    });

    history.push("/login");

};