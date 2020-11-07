import { GET_PACKAGES, FIND_PACKAGE } from "../../_actions/admin/types";

const intialState = {
  packages: []
};

const packageReducer = (state = intialState, action) => {

  switch (action.type) {
    case GET_PACKAGES:
      return {
        ...state,
        packages: action.payload
      };
     case FIND_PACKAGE:
      return {
        ...state,
        package: action.payload
      };
      
    default:
      return state;
  }
};

export default packageReducer;
