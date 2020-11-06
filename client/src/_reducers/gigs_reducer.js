import {
    GET_MYALLGIGS,
    GET_ALLGIGS,
     GET_GIGSBYID,
     DELETE_GIGS,
     CREATE_GIGS
} from '../_actions/types';


export default function (state = {}, action) {
    switch (action.type) {
      
        case GET_ALLGIGS:
            return { ...state, gigsData: action.payload  }
        case GET_MYALLGIGS:
            return { ...state, gigsData: action.payload  }
        case GET_GIGSBYID:
            return { ...state, gigsData: action.payload  }
        case CREATE_GIGS:
            return { ...state, gigsData: action.payload  }
        case DELETE_GIGS:
        return { ...state, gigsData: action.payload  }
        
        default:
            return state;
    }
}