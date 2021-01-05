import axios from 'axios';

import {
  CREATE_PROFILE,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_PROFILE,
  GET_PROFILES,
  DELETEPROFILE,

} from './types';

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



// Get Posts 
// export const getprofilebyid = () => dispatch => {
// //   dispatch(setPostLoading());
//   axios
//     .get('/api/profile/getprofilebyid')
//     .then(res =>
//       dispatch({
//         type: GET_PROFILE,
//         payload: res.data
//       })
//     )
//     .catch(err =>
//       dispatch({
//         type: GET_PROFILE,
//         payload: null
//       })
//     );
// };

// Get Posts 
// export const getprofile = () => dispatch => {
//   //   dispatch(setPostLoading());
//     axios
//       .get('/api/profile/all')
//       .then(res =>
//         dispatch({
//           type: GET_PROFILE,
//           payload: res.data
//         })
//       )
//       .catch(err =>
//         dispatch({
//           type: GET_PROFILE,
//           payload: null
//         })
//       );
//   };




// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
