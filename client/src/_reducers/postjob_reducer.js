import {
    CREATE_POSTJOB,
    GET_ALLPOSTJOB
} from '../_actions/types';


export default function (state = {}, action) {
    switch (action.type) {
      
        case GET_ALLPOSTJOB:
            return { ...state, userData: action.payload  }
            case CREATE_POSTJOB:
                return { ...state, userData: action.payload  }

        default:
            return state;
    }
}