import { GET_PAGES, FIND_PAGE } from "../../_actions/admin/types";

const intialState = {
  pages: []
};

const pageReducer = (state = intialState, action) => {

  switch (action.type) {
    case GET_PAGES:
      return {
        ...state,
        pages: action.payload
      };
     case FIND_PAGE:
      return {
        ...state,
        page: action.payload
      };
      
    default:
      return state;
  }
};

export default pageReducer;
