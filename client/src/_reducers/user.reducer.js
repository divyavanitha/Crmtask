import {
    AUTH_USER,
    LOGOUT_USER,
    GET_ALLPOSTJOB,
    GET_CATEGORY,
    GET_SUBCATEGORY,
    GET_SLIDES,
    GET_GIGS,
    FIND_GIG,
    GET_DELIVERY_TIME
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
        case GET_SLIDES:
            return { ...state, slide: action.payload }
        case GET_GIGS:
            return { ...state, gig: action.payload }
        case FIND_GIG:
            return { ...state, gig_details: action.payload }
        case LOGOUT_USER:
            return { ...state }
        case GET_ALLPOSTJOB:
            return { ...state, userData: action.payload }
        case GET_DELIVERY_TIME:
            return { ...state, delivery_times: action.payload }
        default:
            return state;
    }
};

export default userReducer;