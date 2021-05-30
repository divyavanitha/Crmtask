import { ADMIN_USER, LOG_OUT } from "../../_actions/admin/types";

const intialState = {
  isAuthenticated: false,
  admin: {},
  permissions: {},
  users: []
};

const adminReducer = (state = intialState, action) => {

  switch (action.type) {
    case ADMIN_USER:
      return {
        ...state,
        isAuthenticated: (action.payload !== "") ? true : false,
        admin: action.payload
      };
    
    case LOG_OUT:
      return {
        ...state,
        isAuthenticated: false,
        admin: ""
      };
    default:
      return state;
  }
};

export default adminReducer;
