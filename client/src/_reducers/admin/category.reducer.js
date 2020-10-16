import { GET_CATEGORIES, FIND_CATEGORY, DELETE_CATEGORY } from "../../_actions/admin/types";

const intialState = {
  categories: []
};

const categoryReducer = (state = intialState, action) => {

  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
     case FIND_CATEGORY:
      return {
        ...state,
        category: action.payload
      };
      case DELETE_CATEGORY:
      return {
        ...state,
        deleteCategory: action.payload
      };
    default:
      return state;
  }
};

export default categoryReducer;
