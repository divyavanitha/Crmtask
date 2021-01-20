import { GET_REQUESTS, USER_DETAILS } from "../../_actions/admin/types";

const intialState = {
  requests: []
};

const requestReducer = (state = intialState, action) => {

  switch (action.type) {
    case GET_REQUESTS:
      return {
        ...state,
        requests: action.payload
      };
    case USER_DETAILS:
      return {
        ...state,
        details: action.payload
      };
    default:
      return state;
  }
};

export default requestReducer;
