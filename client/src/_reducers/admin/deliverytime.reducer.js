import { GET_DELIVERY_TIMES, FIND_DELIVERY_TIME } from "../../_actions/admin/types";
const intialState = {
  deliverytimes: []
};

const deliveryTimeReducer = (state = intialState, action) => {

  switch (action.type) {
    case GET_DELIVERY_TIMES:
      return {
        ...state,
        deliverytimes: action.payload
      };
    case FIND_DELIVERY_TIME:
      return {
        ...state,
        deliverytime: action.payload
      };
    default:
      return state;
  }
};

export default deliveryTimeReducer;
