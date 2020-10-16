import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    GET_ALLPOSTJOB,
     GET_CATEGORY,
     GET_SUBCATEGORY
} from '../_actions/types';



const userReducer = (state = {}, action) => {

    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                isAuthenticated: (action.payload !== "") ? true : false,
                user: action.payload
            };
        case REGISTER_USER:
            return {
                ...state,
                isAuthenticated: (action.payload !== "") ? true : false,
                user: action.payload
            };
        case AUTH_USER:
            return {
                ...state,
                isAuthenticated: (action.payload !== "") ? true : false,
                user: action.payload
            };
        case GET_CATEGORY:
        return { ...state, category: action.payload  }
        case GET_SUBCATEGORY:
        return { ...state, subcategory: action.payload  }
        case LOGOUT_USER:
            return { ...state }
        case GET_ALLPOSTJOB:
            return { ...state, userData: action.payload }
        default:
            return state;
    }
};

export default userReducer;