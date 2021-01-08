import {
    AUTH_USER,
    LOGOUT_USER,
    GET_ALLPOSTJOB,
    GET_CATEGORY,
    GET_SUBCATEGORY,
    GET_SLIDES,
    GET_GIGS,
    GET_GIG,
    FIND_GIG,
    GET_DELIVERY_TIME,
    GET_PACKAGE,
    GET_CART_LIST,
    ADD_CART_COUNT,
    BUYER_ORDER_LIST,
    BUYER_ORDER_DETAILS,
    SELLER_ORDER_LIST,
    SELLER_ORDER_DETAILS,
    FIND_CART,
    GET_RATING,
    GET_CANCEL_REASON,
    RECENT_GIGS,
    FAVOURITE_GIGS,
    ADD_FAVOURITE_GIG,
    PAGES,
    PAGE_LIST,
    GIG_SUBCATEGORY,
    REQUEST_GIGS,
    GET_COUNTRY,
    GET_CITY,
    GET_STATE,
    GET_LANGUAGE,
    FIND_USER,
    GET_SELLER_BUYER,
    GET_NOTIFICATION,
    BUY_IT_AGAIN

} from '../_actions/types';

let initialState = {
    isAuthenticated: false,
    user: {},
    cart_count: 0,
    favourite: [],
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
            return { ...state, gigs: action.payload }
        case GET_GIG:
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
        case GET_COUNTRY:
            return { ...state, countries: action.payload }
        case GET_CITY:
            return { ...state, cities: action.payload }
        case GET_STATE:
            return { ...state, states: action.payload }
        case GET_LANGUAGE:
            return { ...state, languages: action.payload }
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
        case ADD_CART_COUNT:
            return { ...state, cart_count: action.payload }
        case GET_RATING:
            return { ...state, rating: action.payload }
        case GET_CANCEL_REASON:
            return { ...state, cancel_reason: action.payload }
        case RECENT_GIGS:
            return { ...state, recent: action.payload }
        case FAVOURITE_GIGS:
            return { ...state, favourites: action.payload }
        case FIND_USER:
            return { ...state, find_user: action.payload }
        case GET_NOTIFICATION:
            return { ...state, notification: action.payload }
        case GET_SELLER_BUYER:
            return { ...state, seller_buyer: action.payload }
        case BUY_IT_AGAIN:
            return { ...state, buy_it: action.payload}
        case ADD_FAVOURITE_GIG:
            let data = {...state}
            let response = action.payload;
            let fav = data.favourites;

            if(response.status) {
                fav.push(action.payload.favourite)
            } else {
                
                let t = fav.filter((fav) => { 
                    return fav.gig._id !== response.favourite.gig._id 
                })
                fav = [];
                if(t.length > 0) {
                    for(let i in t) {
                        fav.push(t[i])
                    }
                }
            }

            return { ...state , favourites: fav }
        case PAGES:
            return { ...state, pages: action.payload }
        case PAGE_LIST:
            return { ...state, page_list: action.payload }
        case GIG_SUBCATEGORY:
            return { ...state, gig_subcategory: action.payload }
        case REQUEST_GIGS:
            return { ...state, request_gigs: action.payload }
        default:
            return state;
    }
};

export default userReducer;