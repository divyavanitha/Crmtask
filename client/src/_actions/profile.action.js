import axios from 'axios';

import {
  GET_PROFILE,
  GET_POST,
  FIND_POST
} from './types';

import queryString from 'query-string';

// Add Post
export const updateProfile = (data) => async dispatch => {

  try {
    let response = await axios.post('/api/profile', data);
    console.log('data', response);
    response.data.status = 'success';
    return response.data;
  } catch (e) {
    e.response.data.status = 'error';
    if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
    return e.response.data;
  }

}

export const getProfile = () => async dispatch => {
  try {
  const profile = await axios.get(`/api/profile`)
    console.log('state', profile);
    dispatch({
        type: GET_PROFILE,
        payload: profile.data
      })
  return profile.data.responseData;
  } catch (e) {
    dispatch({
        type: GET_PROFILE,
        payload: null
      })
  }

}

export const getPost = () => async dispatch => {
  try {
  const post = await axios.get(`/api/post`)
  console.log("poss", post.data);

    dispatch({
        type: GET_POST,
        payload: post.data
      })
  return post.data.responseData;
  } catch (e) {
    dispatch({
        type: GET_POST,
        payload: null
      })
  }

}

export const getPostbyId = (id) => dispatch => {
    
    axios
        .get(`/api/get/post/${id}`)
        .then(res => {
            dispatch({
                type: FIND_POST,
                payload: res.data
            })
        }
        )
        .catch(e =>
            dispatch({
                type: FIND_POST,
                payload: null
            })
        );
};

export const createComment = (data) => async dispatch => {

  try {
    let response = await axios.post('/api/comment', data);
    console.log('data', response);
    response.data.status = 'success';
    return response.data;
  } catch (e) {
    e.response.data.status = 'error';
    if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
    return e.response.data;
  }

}

export const getComments = () => async dispatch => {
    try {
      let response = await axios.get('/api/comment');
      console.log('data', response);
      response.data.status = 'success';
      return response.data;
    } catch (e) {
      e.response.data.status = 'error';
      if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
      return e.response.data;
    }
};


