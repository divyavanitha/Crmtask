import axios from 'axios';

import {
  CREATE_PROFILE,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_PROFILE,
  GET_PROFILES,
  DELETEPROFILE
} from './types';

// Add Post
export function createprofile(dataToSubmit) {
  
 const request=axios.post(`api/profile/create`, dataToSubmit)
      .then(response => {  
        return {
        type: CREATE_PROFILE,
        payload: response.data
    }});
     
return request;
 
}

export const getprofilebyid = () => dispatch =>  {

 axios.get(`/api/profile/getprofilebyid`)
      .then(res => {
        dispatch({
          type: GET_PROFILE,
          payload: res.data
      })
    })
    .catch(err =>
            dispatch({
              type: GET_PROFILE,
              payload: null
            })
          );
   

      
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
