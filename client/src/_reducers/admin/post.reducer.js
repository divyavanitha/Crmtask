import { GET_POSTS, FIND_POST } from "../../_actions/admin/types";

const intialState = {
  posts: []
};

const slideReducer = (state = intialState, action) => {

  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload
      };
    case FIND_POST:
      return {
        ...state,
        post: action.payload
      };

    default:
      return state;
  }
};

export default slideReducer;
