import {
    AUTH_USER,
    LOGOUT_USER,

} from '../_actions/types';

let initialState = {
    isAuthenticated: false,
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

        default:
            return state;
    }
};

export default userReducer;