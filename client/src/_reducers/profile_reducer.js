import {
    GET_PROFILE,
    GET_POST,
    FIND_POST

} from '../_actions/types';


export default function (state = {}, action) {
    switch (action.type) {
        
        case GET_PROFILE:
            return { ...state, getprofile: action.payload }


        case GET_POST:
            return { ...state, posts: action.payload }

         case FIND_POST:
            return { ...state, post: action.payload }
        

        default:
            return state;
    }
}