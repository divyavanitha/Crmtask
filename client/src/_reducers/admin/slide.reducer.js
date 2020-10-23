import { GET_SLIDES, FIND_SLIDE } from "../../_actions/admin/types";

const intialState = {
  slides: []
};

const slideReducer = (state = intialState, action) => {

  switch (action.type) {
    case GET_SLIDES:
      return {
        ...state,
        slides: action.payload
      };
     case FIND_SLIDE:
      return {
        ...state,
        slide: action.payload
      };
      
    default:
      return state;
  }
};

export default slideReducer;
