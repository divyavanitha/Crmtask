import {
  
    CREATE_PROFILE,
    GET_PROFILE

} from '../_actions/types';


export default function (state = {}, action) {
    switch (action.type) {
      
        case CREATE_PROFILE:
            return { ...state, createprofile: action.payload  }
            case GET_PROFILE:
                return { ...state, getprofile: action.payload  }

        default:
            return state;
    }
}