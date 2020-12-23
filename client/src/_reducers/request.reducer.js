import {
    GET_REQUEST,
} from '../_actions/types';

const intialState = {
    request: {}
};
export default function (state = intialState, action) {
    switch (action.type) {

        case GET_REQUEST:
            return { ...state, requests: action.payload }

        default:
            return state;
    }
}