import { GET_REQUESTS } from "../../_actions/admin/types";

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
    default:
      return state;
  }
};

export default requestReducer;
