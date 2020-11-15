import axios from "axios";
import setAdminToken from "../../components/utils/set_admin_token";
import { LOG_OUT, ADMIN_USER, ADD_NOTIFICATION, RBA } from "./types";

export const login = (data) => async dispatch => {
    try {
        let login = await axios.post("/api/admin/login", data );
       
        const { token } = login.data.responseData.user;
        localStorage.setItem("admin_token", token);

        setAdminToken(token);

        let permissions = await axios.post("/api/admin/permissions" );

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
        console.log('err',e.response.data);
    }
};

export function logout() {
    return { type: LOG_OUT};
}