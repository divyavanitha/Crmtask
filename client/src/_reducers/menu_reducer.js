import {
    GET_MENUS
} from '../_actions/types';

const intialState = {
    menu: {}
};

const menuReducer = (state = intialState, action) => {

    switch (action.type) {

        case GET_MENUS:
            return {
                ...state,
                menu: action.payload
            };

        default:
            return state;
    }
};

export default menuReducer;