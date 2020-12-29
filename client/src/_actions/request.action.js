import axios from 'axios';
import {
  GET_REQUEST,
  CREATE_REQUEST,
  BUYER_REQUEST

} from './types';

//const dispatch = useDispatch();

export const createRequest = (data) => async dispatch => {
  try {
    let response = await axios.post('/api/request', data);
    console.log('data', response);
    response.data.status = 'success';
    return response.data;
  } catch (e) {
    console.log(e)
    /*e.response.data.status = 'error';
    if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
    return e.response.data;*/
  }
}

export const getRequestList = () => async dispatch => {
  const request = await axios.get(`/api/requests`)
  dispatch({
    type: GET_REQUEST,
    payload: request.data
  });
}

export const deleteRequest = (id) => async dispatch => {
    try {
        let token = localStorage.adminToken;
        let response = await axios.delete(`/api/request/${id}`);
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        return e.response.data;
    }
};

export const changeRequestStatus = (id, status) => async dispatch => {
    try {
        let response = await axios.get(`/api/request/changestatus/${id}/${status}`);
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        return e.response.data;
    }
}; 

export const getBuyerRequest = () => async dispatch => {
  const request = await axios.get(`/api/buyer/requests`)
  dispatch({
    type: BUYER_REQUEST,
    payload: request.data
  });
}

