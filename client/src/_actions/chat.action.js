import axios from 'axios';
import {
    GET_USERS,
    GET_CHATS
} from './types';


export const getUserList = () => async dispatch => {
    try {
      const user = await axios.get(`/api/chat/users`)
      dispatch({
        type: GET_USERS,
        payload: user.data
      });

      return user.data.responseData;

    } catch (e) {
        console.log(e)
    }

  
}

export const getChatList = (id) => async dispatch => {
    try {
      const chat = await axios.get(`/api/chat/${id}`)
      dispatch({
        type: GET_CHATS,
        payload: chat.data
      });

      return chat.data.responseData;
    } catch (e) {
        console.log(e)
    }
}

export const postMessage = (data) => async dispatch => {
  try {
    let response = await axios.post('/api/chat', data);
    response.data.status = 'success';
    return response.data;
  } catch (e) {
    console.log(e)
    e.response.data.status = 'error';
    if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
    return e.response.data;
  }
}