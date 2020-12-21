import axios from 'axios';
import {
  GET_MYALLGIGS,
  GET_ALLGIGS,
  GET_ERRORS,
  GET_GIGSBYID,
  DELETE_GIGS

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

export const updateFaq = (data) => async dispatch => {
  try {
    let response = await axios.post('/api/gig/faq', data);
    console.log('data', response);
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
    e.response.data.status = 'error';
    if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
    return e.response.data;
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
}

export const submitApproval = (id) => async dispatch => {
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
