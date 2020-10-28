import { GET_ADMIN_SETTINGS } from "../../_actions/admin/types";

const intialState = {
  categories: []
};

const adminSettingsReducer = (state = intialState, action) => {

  switch (action.type) {

    case GET_ADMIN_SETTINGS:
      return {
        ...state,
        setting: action.payload
      };
      
    default:
      return state;
  }
};

export default adminSettingsReducer;
