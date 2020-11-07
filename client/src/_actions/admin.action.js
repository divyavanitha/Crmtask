import axios from "axios";
import setAuthToken from "../components/utils/set_admin_token";
import jwt_decode from "jwt-decode";

import { GET_USERS } from "./types";

/*export const getUsers = () => dispatch => {
    axios
        .get('/api/admin/user')
        .then(res => {
            dispatch({
                type: GET_USERS,
                payload: res.data
            })
        }
        )
        .catch(err =>
            dispatch({
                type: GET_USERS,
                payload: null
            })
        );
};
*/
/*export const addUser = (user) => dispatch => {
    axios
        .post('/api/admin/user', user)
        .then(res => {
             dispatch({
                type: GET_USERS,
                payload: res.data
            }) 
            return {
                type: GET_USERS,
                payload: res.data
            }
        }
        )
        .catch(err =>
            console.log(err)
        );
};*/