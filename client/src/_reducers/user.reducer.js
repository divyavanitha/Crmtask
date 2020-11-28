import {
    AUTH_USER,
    LOGOUT_USER,
    GET_ALLPOSTJOB,
    GET_CATEGORY,
    GET_SUBCATEGORY,
    GET_SLIDES,
    GET_GIGS,
    FIND_GIG,
    GET_DELIVERY_TIME,
    GET_PACKAGE,
    GET_CART_LIST,
    GET_CART_COUNT,
    BUYER_ORDER_LIST,
    BUYER_ORDER_DETAILS,
    SELLER_ORDER_LIST,
    SELLER_ORDER_DETAILS,
    FIND_CART
} from '../_actions/types';

let initialState = {
    isAuthenticated: false,
    user: {},
    cart_count: 0
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
        case GET_ALLPOSTJOB:
            return { ...state, userData: action.payload }
        case GET_DELIVERY_TIME:
            return { ...state, delivery_times: action.payload }
        case GET_PACKAGE:
            return { ...state, packages: action.payload }
        case GET_CART_LIST:
            return { ...state, cart_lists: action.payload }
        case BUYER_ORDER_LIST:
            return { ...state, buyer_order_list: action.payload }
        case BUYER_ORDER_DETAILS:
        return { ...state, buyer_order_details: action.payload }
        case SELLER_ORDER_LIST:
            return { ...state, seller_order_list: action.payload }
        case SELLER_ORDER_DETAILS:
        return { ...state, seller_order_details: action.payload }
        case FIND_CART:
        return { ...state, cart_details: action.payload }
        /*case GET_CART_COUNT:
        let s = {...state}
        console.log('count',s.cart_count);
            return { ...state, cart_count: s.cart_count+action.payload }*/
        default:
            return state;
    }
};

export default userReducer;