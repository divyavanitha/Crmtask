import axios from 'axios';
import {
  GET_MYALLGIGS,
  GET_ALLGIGS,
  GET_ERRORS,
  GET_GIGSBYID,
  DELETE_GIGS,
  FIND_GIG

} from './types';

//const dispatch = useDispatch();

export const creategigs = (data) => async dispatch => {
  try {
    let response = await axios.post('/api/gig', data);
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

export const updatePricing = (data) => async dispatch => {
  try {
    let response = await axios.post('/api/gig/pricing', data);
    console.log('data', response);
    response.data.status = 'success';
    return response.data;
  } catch (e) {
    e.response.data.status = 'error';
    if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
    return e.response.data;
  }
}

export const createFaq = (data) => async dispatch => {
  try {
    let response = await axios.post('/api/gig/faq', data);

    dispatch({
        type: FIND_GIG,
        payload: response.data
      })
    response.data.status = 'success';
    return response.data;
  } catch (e) {
    e.response.data.status = 'error';
    if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
    return e.response.data;
  }
}

export const updateFaq = (data) => async dispatch => {
  try {
    let response = await axios.patch('/api/gig/faq', data);

    dispatch({
        type: FIND_GIG,
        payload: response.data
      })
    response.data.status = 'success';
    return response.data;
  } catch (e) {
    e.response.data.status = 'error';
    if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
    return e.response.data;
  }
}

export const updateDelete = (data) => async dispatch => {
  try {
    let response = await axios.delete('/api/gig/faq', data);

   /* dispatch({
        type: FIND_GIG,
        payload: response.data
      })*/
    response.data.status = 'success';
    return response.data;
  } catch (e) {
    e.response.data.status = 'error';
    if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
    return e.response.data;
  }
}

export const updateRequirement = (data) => async dispatch => {
  try {
    let response = await axios.post('/api/gig/requirement', data);
    console.log('data', response);
    response.data.status = 'success';
    return response.data;
  } catch (e) {
    e.response.data.status = 'error';
    if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
    return e.response.data;
  }
}

export const updateImage = (data) => async dispatch => {
  try {
    console.log('da', (data.get("photo[]"))[0]);
    let response = await axios.post('/api/gig/upload', data);
    console.log('data', response);
    response.data.status = 'success';
    return response.data;
  } catch (e) {
    /*e.response.data.status = 'error';
    if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
    return e.response.data;*/
  }
}

export const updateConfirm = (data) => async dispatch => {
  try {

    let response = await axios.post('/api/gig/confirm', data);
    console.log('data', response);
    response.data.status = 'success';
    return response.data;
  } catch (e) {
    e.response.data.status = 'error';
    if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
    return e.response.data;
  }
}

export const getGigList = (data) => async dispatch => {
  const gig = await axios.get(`/api/gigs`, data)
  dispatch({
    type: GET_ALLGIGS,
    payload: gig.data
  });

  return gig.data.responseData;
}

export const submitApproval = (id) => async () => {
  try {
    let response = await axios.get(`/api/gig/submit/approval/${id}`);
    console.log('data', response);
    response.data.status = 'success';
    return response.data;
  } catch (e) {
    e.response.data.status = 'error';
    if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
    return e.response.data;
  }
}

export const changeGigStatus = (data) => async dispatch => {
    try {
        let response = await axios.post('/api/change/gigstatus', data);
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        return e.response.data;
    }
}; 


// Delete Post
export const deleteGig = (id) => async dispatch => {
  try {
    let response = await axios.delete(`/api/gig/delete/${id}`);
    response.data.status = 'success';
    return response.data;
  } catch (e) {
    e.response.data.status = 'error';
    return e.response.data;
  }
};
