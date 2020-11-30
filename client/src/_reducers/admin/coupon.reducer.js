import { GET_COUPONS, FIND_COUPON } from "../../_actions/admin/types";

const intialState = {
  coupons: []
};

const couponReducer = (state = intialState, action) => {

  switch (action.type) {
    case GET_COUPONS:
      return {
        ...state,
        coupons: action.payload
      };
    case FIND_COUPON:
      return {
        ...state,
        coupon: action.payload
      };

    default:
      return state;
  }
};

export default couponReducer;
