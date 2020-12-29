import {
    GET_REQUEST,
    BUYER_REQUEST,
    SENT_OFFER,
    VIEW_OFFER
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
        case SENT_OFFER:
            return { ...state, offer: action.payload}
        case VIEW_OFFER:
            return { ...state, view_offer: action.payload}
        default:
            return state;
    }
}