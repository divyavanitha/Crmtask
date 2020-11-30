import axios from 'axios';

import {
  CREATE_POSTJOB,
  GET_ERRORS,
  GET_ALLPOSTJOB,
  GET_MYALLPOSTJOB,
  GET_POSTJOBBYID,
  POST_LOADING,
  DELETE_POSTJOB
} from './types';

// Add Post
export async function createpostjob(dataToSubmit) {
  try {
    const request = await axios.post(`/api/postjob/createpostjob`, dataToSubmit)

    return {
      type: CREATE_POSTJOB,
      payload: request.data
    }

  }
  catch (err) {
    return {
      type: GET_ERRORS,
      payload: err.response.data
    }
  }



}

// export  const createpostjob = dataToSubmit => (dispatch) => {
//   // dispatch(clearErrors());
//   axios
//     .post('/api/postjob/createpostjob', dataToSubmit)
//     .then(response => {  

//       dispatch({
//         type: CREATE_POSTJOB,
//         payload: response.data,

//       })
//     }
//     )
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };

// Get Posts 
export const getallpostjob = () => dispatch => {
  //   dispatch(setPostLoading());
  axios
    .get('/api/postjob/getallpostjob')
    .then(res => {
      //console.log(res.data);
      dispatch({
        type: GET_ALLPOSTJOB,
        payload: res.data
      })
    }
    )
    .catch(err =>
      dispatch({
        type: GET_ALLPOSTJOB,
        payload: null
      })
    );
};

// Get Posts 
export const getallmypostjob = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get('/api/postjob/getmyallpostjob')
    .then(res =>
      dispatch({
        type: GET_MYALLPOSTJOB,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_MYALLPOSTJOB,
        payload: null
      })
    );
};

// Get findpostjobbyid
export const getPostById = id => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/postjob/findpostjobbyid/${id}`)
    .then(res =>
      dispatch({
        type: GET_POSTJOBBYID,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POSTJOBBYID,
        payload: null
      })
    );
};

// Delete Post
export const deletePostJob = id => dispatch => {
  axios
    .delete(`/api/postjob/deletepostjob/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_POSTJOB,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


// Add Comment
// export const addComment = (postId, commentData) => dispatch => {
//   dispatch(clearErrors());
//   axios
//     .post(`/api/posts/comment/${postId}`, commentData)
//     .then(res =>
//       dispatch({
//         type: GET_POST,
//         payload: res.data
//       })
//     )
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };

// // Delete Comment
// export const deleteComment = (postId, commentId) => dispatch => {
//   axios
//     .delete(`/api/posts/comment/${postId}/${commentId}`)
//     .then(res =>
//       dispatch({
//         type: GET_POST,
//         payload: res.data
//       })
//     )
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };

// Set loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};

// Clear errors
// export const clearErrors = () => {
//   return {
//     type: CLEAR_ERRORS
//   };
// };
