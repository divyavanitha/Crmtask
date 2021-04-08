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
    CARDS,
    ADDCARD,
    PAYOUTCARDS,
    ADDPAYOUTCARD,
    WALLET,
    FIND_USER,
    GET_SELLER_BUYER,
    GET_NOTIFICATION,
    BUY_IT_AGAIN,
    PROFILE_GIGS,
    GET_SERVICE_GIGS
} from './types';


export const login = (data) => async dispatch => {

    try {
        
        const response = await axios.post(`/api/login`, data);

        const { token, refreshToken } = response.data.responseData.user;

        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);

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

        const { token, refreshToken } = response.data.responseData.user;

        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);

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
    localStorage.removeItem('refreshToken');

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

export const getNotification = () => async dispatch => {
    const notification = await axios.get(`/api/notifications`)
    dispatch({
        type: GET_NOTIFICATION,
        payload: notification.data
    });
    return notification.data;
}

export const freelancerList = (page = 1) => async dispatch => {
    const freelancer = await axios.get(`/api/freelancer/list?page=${page}`)
    return freelancer.data;
}

export const deleteNotification = (id) => async dispatch => {
    try {
        let response = await axios.delete(`/api/notifications/${id}`);
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        return e.response.data;
    }
};

export const buyItAgain = () => async dispatch => {
    const buyit = await axios.get(`/api/buyit/again`)
    dispatch({
        type: BUY_IT_AGAIN,
        payload: buyit.data
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

export const getGigbyId = (id) => async dispatch => {

    let response = await axios.get(`/api/gig/details/${id}`);

    dispatch({
        type: FIND_GIG,
        payload: response.data
    })
    response.data.status = 'success';
    return response.data;
};

export const profileGigs = (id) => async dispatch => {

    let response = await axios.get(`/api/profile/gigs/${id}`);

    dispatch({
        type: PROFILE_GIGS,
        payload: response.data
    })
    response.data.status = 'success';
    return response.data;
};

export const getCountry = (data) => async dispatch => {
    const countries = await axios.get(`/api/countries`)
    dispatch({
        type: GET_COUNTRY,
        payload: countries.data
    });
    return countries.data.responseData;
}

export const getState = (id) => async dispatch => {
    const states = await axios.get(`/api/states/${id}`)
    console.log('state', states);
    dispatch({
        type: GET_STATE,
        payload: states.data
    });
    return states.data;
}

export const getCity = (id) => async dispatch => {
    const cities = await axios.get(`/api/cities/${id}`)
    dispatch({
        type: GET_CITY,
        payload: cities.data
    });
    return cities.data;
}


export const getLanguage = (data) => async dispatch => {
    const languages = await axios.get(`/api/language`)
    dispatch({
        type: GET_LANGUAGE,
        payload: languages.data
    });
    return languages.data.responseData;
}


export const getGigbyName = (name) => async dispatch => {
    try {
        let response = await axios.get(`/api/gig/detail/${name}`);
        dispatch({
            type: FIND_GIG,
            payload: response.data
        });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        console.log(e);
        e.response.data.status = 'error';
        if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
        return e.response.data;
    }
};

export const getGigbyCategory = (data) => async dispatch => {

    let gig = await axios.get( `/api/list/gigs?${ queryString.stringify(data) }` );

    dispatch({
        type: GET_GIG,
        payload: gig.data
    });

};

export const getCartbyId = (id) => dispatch => {

    axios
        .get(`/api/cart/${id}`)
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
        let response = await axios.post('/api/cart', data);
        dispatch({
            type: ADD_CART_COUNT,
            payload: response.data.responseData.count
        });
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
        throw new Error(e.response.data);
    }
}

export const getGigWithoutAuth = (data) => async dispatch => {
    console.log(queryString.stringify(data));
    let gig = await axios.get( `/api/list/gigs?${ queryString.stringify(data) }` );

    dispatch({
        type: GET_GIGS,
        payload: gig.data
    });

};

export const getGigWithService = (data) => async dispatch => {

    let gig = await axios.get( `/api/list/gigs?service=${data}` );

    dispatch({
        type: GET_SERVICE_GIGS,
        payload: gig.data
    });

    return gig.data.responseData;
};

export const getCartList = (data) => async dispatch => {

    try {
        let cart = await axios.get("/api/cart", data);

        dispatch({
            type: GET_CART_LIST,
            payload: cart.data.responseData
        });
        return cart.data.responseData
    } catch (e) {
        console.log(e)
    }

};


export const deleteCart = (id) => async dispatch => {
    try {
        let response = await axios.delete(`/api/cart/${id}`);

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

export const findUser = (id) => async dispatch => {
    try {
        let response = await axios.get(`/api/user`);

        dispatch({
            type: FIND_USER,
            payload: response.data
        });

        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        return e.response.data;
    }
};

export const sellerBuyer = (id) => async dispatch => {
    try {
        let response = await axios.get(`/api/seller/buyer`);

        dispatch({
            type: GET_SELLER_BUYER,
            payload: response.data
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

export const getOrderDetails = (id) => async dispatch => {

    try{
        let response = await axios.get(`/api/get/orderdetails/${id}`);

        dispatch({
            type: SELLER_ORDER_DETAILS,
            payload: response.data
        });

        response.data.status = 'success';
        return response.data;
    } catch (e) {

        dispatch({
            type: SELLER_ORDER_DETAILS,
            payload: null
        })

        e.response.data.status = 'error';
        return e.response.data;
    }

};

export const getPagelist = (type) => async dispatch => {

    let url = type ? '/api/pages/list/' + type : '/api/pages/list';

    axios
        .get(url)
        .then(res => {
            dispatch({
                type: PAGE_LIST,
                payload: res.data.responseData.pages
            })
        }
        )
        .catch(e =>
            dispatch({
                type: PAGE_LIST,
                payload: null
            })
        );

};

export const getPages = () => async dispatch => {

    axios
        .get(`/api/pages`)
        .then(res => {
            dispatch({
                type: PAGES,
                payload: res.data.responseData.pages
            })
        }
        )
        .catch(e =>
            dispatch({
                type: PAGES,
                payload: null
            })
        );

};

export const getRecent = () => async dispatch => {

    axios
        .get(`/api/recent`)
        .then(res => {
            dispatch({
                type: RECENT_GIGS,
                payload: res.data.responseData.recent
            })
        }
        )
        .catch(e =>
            dispatch({
                type: RECENT_GIGS,
                payload: null
            })
        );

};

export const getFavourites = () => async dispatch => {

    axios
        .get(`/api/favourites`)
        .then(res => {
            dispatch({
                type: FAVOURITE_GIGS,
                payload: res.data.responseData.favourites
            })
        }
        )
        .catch(e =>
            dispatch({
                type: FAVOURITE_GIGS,
                payload: null
            })
        );

};

export const addFavourite = (id) => async dispatch => {

    try {
        const response = await axios.post(`/api/favourite/${id}`);

        dispatch({
            type: ADD_FAVOURITE_GIG,
            payload: response.data.responseData
        })

        return response.data.responseData;

    } catch (e) {
        return { status: false, favourite: null };
    }

};

export const addFavouritetoCart = () => async dispatch => {

    try {
        const response = await axios.get(`/api/favourite/cart`);

        dispatch({
            type: ADD_CART_COUNT,
            payload: response.data.responseData.count
        });

        dispatch({
            type: FAVOURITE_GIGS,
            payload: []
        })

        return response.data.responseData;

    } catch (e) {
        return { status: false, favourite: null };
    }

};

export const getRevenues = () => async dispatch => {

    try {

        const response = await axios.get(`/api/revenues`);
        return response.data.responseData;

    } catch (e) {
        return { withdrawalAmount: 500, pendingAmount: 38, gigAmount: 0, revenues: [] };
    }

};

export const getWithdrawals = () => async dispatch => {

    try {

        const response = await axios.get(`/api/withdrawal`);
        return response.data.responseData;

    } catch (e) {
        return { withdrawals: [] };
    }

};

export const withdrawl = (data) => async dispatch => {

    try {

        const response = await axios.post(`/api/withdrawal`, data);
        return response.data.responseData;

    } catch (e) {
        return { withdrawalAmount: 500, pendingAmount: 38, gigAmount: 0, revenues: [] };
    }

};

export const getRating = (id) => async dispatch => {
    try{
        const response = await axios.get(`/api/rating/${id}`)
        dispatch({
            type: GET_RATING,
            payload: response.data
        });
        response.data.status = 'success';
        return response.data;
    }catch(e) {
        e.response.data.status = 'error';
        return e.response.data;
    }
}

export const gigSubCatoegory = (data) => async dispatch => {

    try {
        let gig = await axios.get("/api/gig/subcategory", data);

        dispatch({
            type: GIG_SUBCATEGORY,
            payload: gig.data.responseData
        });
    } catch (e) {
        console.log(e)
    }

};

export const requestGigs = (id,sub) => async dispatch => {

    try {
        const response = await axios.get(`/api/request/gigs/${id}/${sub}`);

         dispatch({
            type: REQUEST_GIGS,
            payload: response.data.responseData
        })

        return response.data.responseData;

    } catch (e) {
        dispatch({
            type: REQUEST_GIGS,
            payload: null
        })
    }

};

export const getCard = () => async dispatch => {

    try {
        const response = await axios.get(`/api/cards`);

         dispatch({
            type: CARDS,
            payload: response.data.responseData.cards
        })

        return response.data.responseData;

    } catch (e) {
        dispatch({
            type: CARDS,
            payload: []
        })
    }

};

export const getWallet = () => async dispatch => {

    try {
        const response = await axios.get(`/api/wallet`);

        return response.data.responseData;

    } catch (e) {
        console.log(e);
    }

};

export const removeCard = (id) => async dispatch => {
    try {
        let response = await axios.delete(`/api/card/remove/${id}`);
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        return e.response.data;
    }
};

export const defaultCard = (id, status) => async dispatch => {
    try {
        let response = await axios.get(`/api/default/card/${id}`);
        response.data.status = 'success';
        return response.data;
    } catch (e) {
        e.response.data.status = 'error';
        return e.response.data;
    }
};


export const getPayoutCard = () => async dispatch => {

    try {
        const response = await axios.get(`/api/cards/payout`);

         dispatch({
            type: PAYOUTCARDS,
            payload: response.data.responseData.cards
        })

        return response.data.responseData;

    } catch (e) {
        dispatch({
            type: PAYOUTCARDS,
            payload: []
        })
    }

};

export const addCard = (data) => async dispatch => {

    try {
        console.log(data)
        const response = await axios.post(`/api/card/add`, data);

         dispatch({
            type: ADDCARD,
            payload: response.data.responseData.card
        })
        response.data.status = 'success';
        return response.data;

    } catch (e) {
        e.response.data.status = 'error';
        if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
        return e.response.data;
    }

};

export const addPayoutCard = (data) => async dispatch => {

    try {
        const response = await axios.post(`/api/card/payout/add`, data);
        response.data.status = 'success';
        return response.data;

    } catch (e) { 
        e.response.data.status = 'error';
        if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
        return e.response.data;
    }

};

export const addMoney = (data) => async dispatch => {

    try {
        const response = await axios.post(`/api/wallet`, data);

         dispatch({
            type: WALLET,
            payload: response.data.responseData
        })
        response.data.status = 'success';
        return response.data;

    } catch (e) {
        e.response.data.status = 'error';
        if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
        return e.response.data;
    }

};

export const changePassword = (data) => async dispatch => {

    try {

        const response = await axios.post(`/api/change/password`, data);
        response.data.status = 'success';
        return response.data;

    } catch (e) { 
        e.response.data.status = 'error';
        if (e.response.data.statusCode === 422) e.response.data.status = 'warning';
        return e.response.data;
    }

};

export const updateCart = (data) => async dispatch => {

    try {

        const response = await axios.patch(`/api/cart`, data);

        return response.data.responseData;

    } catch (e) { }

};

