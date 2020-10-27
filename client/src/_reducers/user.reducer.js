import {
    AUTH_USER,
    LOGOUT_USER,
    GET_ALLPOSTJOB,
    GET_CATEGORY,
    GET_SUBCATEGORY
} from '../_actions/types';

let initialState = {
    isAuthenticated: false,
    user: {}
}

const userReducer = (state = initialState, action) => {

    switch (action.type) {
        case AUTH_USER:
            return {
                ...state,
                isAuthenticated: (action.payload !== "") ? true : false,
                user: action.payload
            };
        case LOGOUT_USER:
            return {
                ...state,
                isAuthenticated: (action.payload !== "") ? true : false,
                user: {}
            }
        case GET_CATEGORY:
            return { ...state, category: action.payload }
        case GET_SUBCATEGORY:
            return { ...state, subcategory: action.payload }
        case LOGOUT_USER:
            return { ...state }
        case GET_ALLPOSTJOB:
            return { ...state, userData: action.payload }
        default:
            return state;
    }
};

export default userReducer;