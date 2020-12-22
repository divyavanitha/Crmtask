import axios from 'axios';
import {
  GET_MYALLGIGS,
  CREATE_REQUEST,
  GET_ERRORS,
  GET_GIGSBYID,
  DELETE_GIGS

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

