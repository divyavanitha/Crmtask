import axios from 'axios';
import queryString from 'query-string';
import setToken from '../components/utils/set_token';
import {
    AUTH_USER,
    LOGOUT_USER,
    RESET_PASSWORD,
    VERIFY,
    GET_ALLPOSTJOB,
    GET_MENUS,
    GET_CATEGORY,
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
    GET_DELIVERY_STATUS,
    GET_RATING,
    GET_CANCEL_REASON
} from './types';


export const login = (data) => async dispatch => {

    try {
        const response = await axios.post(`/api/login`, data);

        const { token } = response.data.responseData.user;

        localStorage.setItem('token', token);

        setToken(token);

        dispatch({
            type: AUTH_USER,
            payload: response.data.responseData.user
        });

    } catch (e) {

    }

}


export const register = (data) => async dispatch => {

    try {
        const response = await axios.post(`/api/register`, data);

        const { token } = response.data.responseData.user;

        localStorage.setItem('token', token);

        setToken(token);

        dispatch({
            type: AUTH_USER,
            payload: response.data.responseData.user
        });

    } catch (e) {

    }
}


export const social_login = (data) => async dispatch => {

    try {
        const response = await axios.post(`/api/social`, data);

        const { token } = response.data.responseData.user;

        localStorage.setItem('token', token);

        setToken(token);

        dispatch({
            type: AUTH_USER,
            payload: response.data.responseData.user
        });

    } catch (e) {

    }
}


export function auth() {

    const request = axios.get(`/api/users/user`, { headers: { 'Authorization': localStorage.getItem('jwtToken') } })
        .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
    // return {
    //     type: SET_CURRENT_USER,
    //     payload: decoded
    //   };
}

export const logout = () => dispatch => {

    localStorage.removeItem("token");

    setToken(false);

    dispatch({
        type: LOGOUT_USER,
        payload: ""
    })
}
export function forgetpassword(dataToSubmit) {
    const request = axios.post(`/api/auth/reset-password`, dataToSubmit)
        .then(response => response.data);

    return {
        type: RESET_PASSWORD,
        payload: request
    }
}
export function verification() {
    const request = axios.post(`/api/auth/verification`)
        .then(response => response.data);

    return {
        type: VERIFY,
        payload: request
    }
}
export function getallpostjob() {
    const request = axios.get(`/api/postjob/getallpostjob`)
        .then(response => response.data);

    return {
        type: GET_ALLPOSTJOB,
        payload: request
    }
}


export const getMenu = (data) => async dispatch => {

    try {
        let menu = await axios.get("/api/menu", data);

        dispatch({
            type: GET_MENUS,
            payload: menu.data.responseData
        });
    } catch (e) {
        console.log(e)
    }



};

export const getCategory = (data) => async dispatch => {
    const category = await axios.get(`/api/category`, data)
    dispatch({
        type: GET_CATEGORY,
        payload: category.data
    });
}

export const getDeliveryTime = (data) => async dispatch => {
    const delivery_time = await axios.get(`/api/delivery/time`, data)
    dispatch({
        type: GET_DELIVERY_TIME,
        payload: delivery_time.data
    });
}

export const getPackage = (data) => async dispatch => {
    const packages = await axios.get(`/api/package`, data)
    dispatch({
        type: GET_PACKAGE,
        payload: packages.data
    });
}

export const getSubCategory = (id) => async dispatch => {
    const subcategory = await axios.get(`/api/subcategory/${id}`)
    console.log("subcategory", subcategory.data)
    /*dispatch({
        type: GET_SUBCATEGORY,
        payload: subcategory.data
    });*/

    return subcategory.data;
}

export const getCancelReason = (type) => async dispatch => {
    const cancel_readon = await axios.get(`/api/cancel/reason/${type}`)
    dispatch({
        type: GET_CANCEL_REASON,
        payload: cancel_readon.data
    });
}

export const getSlide = (data) => async dispatch => {

    let slide = await axios.get("/api/slide", data);

    dispatch({
        type: GET_SLIDES,
        payload: slide.data
    });

};

export const getGigbyId = (id) => dispatch => {
    axios
        .get(`/api/get/gig/details/${id}`)
        .then(res => {
            dispatch({
                type: FIND_GIG,
                payload: res.data
            })
        }
        )
        .catch(e =>
            dispatch({
                type: FIND_GIG,
                payload: null
            })
        );
};

export const getGigbyCategory = (data) => async dispatch => {

    let gig = await axios.get( `/api/list/gigs?${ queryString.stringify(data) }` );

    dispatch({
        type: GET_GIG,
        payload: gig.data
    });

};

export const getCartbyId = (id) => dispatch => {
    console.log('id', id);
    axios
        .get(`/api/find/cart/${id}`)
        .then(res => {

            dispatch({
                type: FIND_CART,
                payload: res.data
            })
        }
        )
        .catch(e =>
            dispatch({
                type: FIND_CART,
                payload: null
            })
        );
};


export const addCart = (data) => async dispatch => {
    try {
        let response = await axios.post('/api/gig/cart', data);
        dispatch({
            type: ADD_CART_COUNT,
            payload: response.data.responseData.count
        });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
        return e.response.data;
    }
}

export const getGigWithoutAuth = (data) => async dispatch => {

    let gig = await axios.get( `/api/list/gigs?${ queryString.stringify(data) }` );

    dispatch({
        type: GET_GIGS,
        payload: gig.data
    });

};

export const getCartList = (data) => async dispatch => {

    try {
        let cart = await axios.get("/api/gig/cart", data);

        dispatch({
            type: GET_CART_LIST,
            payload: cart.data.responseData
        });
    } catch (e) {
        console.log(e)
    }

};


export const deleteCart = (id) => async dispatch => {
    try {
        let response = await axios.delete(`/api/gig/cart/${id}`);

        dispatch({
            type: ADD_CART_COUNT,
            payload: response.data.responseData.length
        });

        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        return e.response.data;
    }
};



export const buyerOrderList = (data) => async dispatch => {

    try {
        let order = await axios.get("/api/buyer/orderlist", data);

        dispatch({
            type: BUYER_ORDER_LIST,
            payload: order.data.responseData
        });
    } catch (e) {
        console.log(e)
    }

};

export const getBuyerOrderDetails = (id) => async dispatch => {

    axios
        .get(`/api/buyer/orderdetails/${id}`)
        .then(res => {
            dispatch({
                type: BUYER_ORDER_DETAILS,
                payload: res.data
            })
        }
        )
        .catch(e =>
            dispatch({
                type: BUYER_ORDER_DETAILS,
                payload: null
            })
        );

};

export const sellerOrderList = (data) => async dispatch => {

    try {
        let order = await axios.get("/api/seller/orderlist", data);

        dispatch({
            type: SELLER_ORDER_LIST,
            payload: order.data.responseData
        });
    } catch (e) {
        console.log(e)
    }

};

export const getSellerOrderDetails = (id) => async dispatch => {

    axios
        .get(`/api/seller/orderdetails/${id}`)
        .then(res => {
            dispatch({
                type: SELLER_ORDER_DETAILS,
                payload: res.data
            })
        }
        )
        .catch(e =>
            dispatch({
                type: SELLER_ORDER_DETAILS,
                payload: null
            })
        );

};

export const getDeliveryStatus = (id) => async dispatch => {
    console.log('id', id);
    const delivery_status = await axios.get(`/api/delivery/status/${id}`)
    dispatch({
        type: GET_DELIVERY_STATUS,
        payload: delivery_status.data
    });
}

export const getRating = (id) => async dispatch => {
    console.log('id', id);
    const ratings = await axios.get(`/api/rating/${id}`)
    dispatch({
        type: GET_RATING,
        payload: ratings.data
    });
}

