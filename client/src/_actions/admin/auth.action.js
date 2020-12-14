import axios from "axios";
import { LOG_OUT, ADMIN_USER, ADD_NOTIFICATION, RBA } from "./types";

export const login = (data) => async dispatch => {
    try {
        let login = await axios.post("/api/admin/login", data);

        const { token, refreshToken } = login.data.responseData.user;
        localStorage.setItem("adminToken", token);
        localStorage.setItem("adminRefreshToken", refreshToken);

        let permissions = await axios.post("/api/admin/permissions", {}, { headers: { 'Authorization': `${token}` } });

        dispatch({
            type: RBA,
            payload: permissions.data.responseData
        });

        dispatch({
            type: ADMIN_USER,
            payload: login.data
        });

    } catch (e) {
        dispatch({
            type: ADD_NOTIFICATION,
            //payload: { title: e.response.data.title, message: e.response.data.error.message }
        });
        console.log('err', e.response.data);
    }
};

export const logout = (data) => async dispatch => {

    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminRefreshToken");

    dispatch({
        type: LOG_OUT,
        payload: ""
    })
}