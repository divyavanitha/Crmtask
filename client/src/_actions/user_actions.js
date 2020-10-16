import axios from 'axios';
import setToken from '../components/utils/set_token';
import { useDispatch } from "react-redux";
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    RESET_PASSWORD,
    VERIFY,
    GET_ALLPOSTJOB,
    GET_MENUS,
    GET_CATEGORY,
    GET_SUBCATEGORY
    // SET_CURRENT_USER 
} from './types';

export const login = (data) => async dispatch => {

    const response = await axios.post(`api/login`, data);

    const { token } = response.data.responseData.user;

    localStorage.setItem('token', token);

    setToken(token);

    dispatch({
        type: LOGIN_USER,
        payload: response
    });
}



export async function registerUser(dataToSubmit) {
    
    const request =await  axios.post(`api/register`, dataToSubmit)
        .then(response => response.data
        
        );

    const token = request.responseData.user.token;
  
    localStorage.setItem('token', token);

    setToken(token);
    // const decoded = jwt_decode(token);
    // Set current user

    return {
        type: LOGIN_USER,
        payload: request
    }
}

// Set logged in user
// export const setCurrentUser = decoded => {
//     return {
//       type: SET_CURRENT_USER,
//       payload: decoded
//     };
//   };



export function auth() {

    const request = axios.get(`api/users/user`, { headers: { 'Authorization': localStorage.getItem('jwtToken') } })
        .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
    // return {
    //     type: SET_CURRENT_USER,
    //     payload: decoded
    //   };
}

export const logout = () => dispatch => {

    localStorage.removeItem("token");

    setToken(false);

    dispatch({
        type: AUTH_USER,
        payload: ""
    })
}
export function forgetpassword(dataToSubmit) {
    const request = axios.post(`api/auth/reset-password`, dataToSubmit)
        .then(response => response.data);

    return {
        type: RESET_PASSWORD,
        payload: request
    }
}
export function verification() {
    const request = axios.post(`api/auth/verification`)
        .then(response => response.data);

    return {
        type: VERIFY,
        payload: request
    }
}
export function getallpostjob() {
    const request = axios.get(`api/postjob/getallpostjob`)
        .then(response => response.data);

    return {
        type: GET_ALLPOSTJOB,
        payload: request
    }
}


export const getMenu = (data) => async dispatch => {

       let menu = await axios.get("/api/menu", data );
       
       //console.log('menu',menu);

        dispatch({
            type: GET_MENUS,
            payload: menu.data
        });

};

export const getCategory = (data) =>  async dispatch => {
  const category=await axios.get(`/api/category`, data)
      dispatch({
          type: GET_CATEGORY,
          payload: category.data
      });
 }

export const getSubCategory = (id) =>  async dispatch => {
  const subcategory=await axios.get(`/api/subcategory/${id}`)
     //console.log("subcategory",subcategory)
      dispatch({
          type: GET_SUBCATEGORY,
          payload: subcategory.data
      }); 

      //return subcategory.data;
 }