import { GET_SKILLS, FIND_SKILL } from "../../_actions/admin/types";
const intialState = {
  skills: []
};

const skillReducer = (state = intialState, action) => {

  switch (action.type) {
    case GET_SKILLS:
      return {
        ...state,
        skills: action.payload
      };
     case FIND_SKILL:
      return {
        ...state,
        skill: action.payload
      };
    default:
      return state;
  }
};

export default skillReducer;
