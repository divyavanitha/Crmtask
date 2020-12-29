import {
    GET_REQUEST,
    BUYER_REQUEST
} from '../_actions/types';

const intialState = {
    request: {}
};
export default function (state = intialState, action) {
    switch (action.type) {
        case GET_REQUEST:
            return { ...state, requests: action.payload }
        case BUYER_REQUEST:
        	return { ...state, request: action.payload}
        default:
            return state;
    }
}