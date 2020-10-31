import axios from 'axios';
import { useDispatch } from "react-redux";
import {
 GET_MYALLGIGS,
 GET_ALLGIGS,
  GET_ERRORS,
  GET_GIGSBYID,
  DELETE_GIGS,
  CREATE_GIGS
  
} from './types';

//const dispatch = useDispatch();

export const creategigs = (data) =>  async dispatch => {
  try {
        let response = await axios.post('/api/gig', data);
        response.data.status = 'success';
        return response.data;
    } catch(e) {
        e.response.data.status = 'error';
        if(e.response.data.statusCode == 422) e.response.data.status = 'warning';
        return e.response.data;
    }
 }


// Add Post
// export const creategigs = postjob => dispatch => {
//   // dispatch(clearErrors());
//   axios
//     .post('/api/gigs/create', postjob)
//     .then(res =>
//       dispatch({
//         type: CREATE_GIGS,
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

// Get Posts 
export const getallgigs = () => dispatch => {
//   dispatch(setPostLoading());
  axios
    .get('/api/gigs/getallgigs')
    .then(res => {
      //console.log(res.data);
      dispatch({
        type: GET_ALLGIGS,
        payload: res.data
      })
    }
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: null
      })
    );
};

// Get Posts 
export const getmyallgigs = () => dispatch => {
    // dispatch(setPostLoading());
    axios
      .get('/api/gigs/getmyallgigs')
      .then(res =>
        dispatch({
          type: GET_MYALLGIGS,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_MYALLGIGS,
          payload: null
        })
      );
  };

// Get findpostjobbyid
export const getgigsById = id => dispatch => {
  //dispatch(setPostLoading());
  axios
    .get(`/api/gigs/findgigbyid/${id}`)
    .then(res =>
      dispatch({
        type: GET_GIGSBYID,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_GIGSBYID,
        payload: null
      })
    );
};

// Delete Post
export const deletegigs = id => dispatch => {
  axios
    .delete(`/api/gigs/deletepostjob/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_GIGS,
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
// export const setPostLoading = () => {
//   return {
//     type: POST_LOADING
//   };
// };

// Clear errors
// export const clearErrors = () => {
//   return {
//     type: CLEAR_ERRORS
//   };
// };
