import { GET_GIGS, FIND_GIG } from "../../_actions/admin/types";
const intialState = {
  gigs: []
};

const gigReducer = (state = intialState, action) => {

  switch (action.type) {
    case GET_GIGS:
      return {
        ...state,
        gigs: action.payload
      };
    case FIND_GIG:
      return {
        ...state,
        gig: action.payload
      };
    default:
      return state;
  }
};

export default gigReducer;
