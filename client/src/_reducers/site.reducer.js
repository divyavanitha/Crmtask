import { SITE } from '../_actions/types';

export default function (state = {}, action) {
    switch (action.type) {
      
        case SITE:
            return { ...state, settings: action.payload  }
        
        default:
            return state;
    }
}