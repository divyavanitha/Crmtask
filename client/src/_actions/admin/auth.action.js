import axios from "axios";
import { LOG_OUT, ADMIN_USER } from "./types";

export const login = (data) => async dispatch => {
    try {
        let login = await axios.post("/api/admin/login", data);

        const { token, refreshToken } = login.data.responseData.user;
        localStorage.setItem("adminToken", token);
        localStorage.setItem("adminRefreshToken", refreshToken);


        dispatch({
            type: ADMIN_USER,
            payload: login.data
        });

    } catch (e) {
        
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