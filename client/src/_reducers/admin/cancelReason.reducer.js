import { GET_CANCEL_REASONS, FIND_CANCEL_REASON } from "../../_actions/admin/types";

const intialState = {
  cancel_reasons: []
};

const cancelReasonReducer = (state = intialState, action) => {

  switch (action.type) {
    case GET_CANCEL_REASONS:
      return {
        ...state,
        cancel_reasons: action.payload
      };
    case FIND_CANCEL_REASON:
      return {
        ...state,
        cancel_reason: action.payload
      };
    
    default:
      return state;
  }
};

export default cancelReasonReducer;
