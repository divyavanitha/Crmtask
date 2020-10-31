import { GET_MENUS, FIND_MENU } from "../../_actions/admin/types";

const intialState = {
  menus: []
};

const menuReducer = (state = intialState, action) => {

  switch (action.type) {
    case GET_MENUS:
      return {
        ...state,
        menus: action.payload
      };
     case FIND_MENU:
      return {
        ...state,
        menus: action.payload
      };
      
    default:
      return state;
  }
};

export default menuReducer;
