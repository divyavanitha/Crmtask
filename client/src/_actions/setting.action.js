import axios from 'axios';
import {
    SITE
} from './types';

export const site = () => async dispatch => {

    try {
        const response = await axios.get(`/api/settings`);

        dispatch({
            type: SITE,
            payload: response.data.responseData
        });

    } catch (e) {

    }

}