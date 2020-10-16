import { GET_LANGUAGES, FIND_LANGUAGE } from "../../_actions/admin/types";
const intialState = {
  languages: []
};

const languageReducer = (state = intialState, action) => {

  switch (action.type) {
    case GET_LANGUAGES:
      return {
        ...state,
        languages: action.payload
      };
     case FIND_LANGUAGE:
      return {
        ...state,
        language: action.payload
      };
    default:
      return state;
  }
};

export default languageReducer;
