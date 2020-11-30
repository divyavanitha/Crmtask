import { GET_USERS, FIND_USER } from "../../_actions/admin/types";

const intialState = {
  users: []
};

const userReducer = (state = intialState, action) => {

  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload
      };
    case FIND_USER:
      return {
        ...state,
        user: action.payload
      };

    default:
      return state;
  }
};

export default userReducer;
