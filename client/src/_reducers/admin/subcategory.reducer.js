import { GET_SUB_CATEGORIES, FIND_SUB_CATEGORY, DELETE_SUB_CATEGORY } from "../../_actions/admin/types";

const intialState = {
  subcategories: []
};

const subCategoryReducer = (state = intialState, action) => {

  switch (action.type) {
    case GET_SUB_CATEGORIES:
      return {
        ...state,
        subcategories: action.payload
      };
     case FIND_SUB_CATEGORY:
      return {
        ...state,
        subcategory: action.payload
      };
      case DELETE_SUB_CATEGORY:
      return {
        ...state,
        deleteSubCategory: action.payload
      };
    default:
      return state;
  }
};

export default subCategoryReducer;
