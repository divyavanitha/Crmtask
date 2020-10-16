import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from "../../_actions/admin/types";

const initialState = {
    notifications: []
};

function notificationReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_NOTIFICATION: {
            let maxId= Math.max.apply(Math, state.notifications.map(o =>  o.id));
            if(maxId === -Infinity) { maxId = 0; }
            let newItem = {
                id: maxId + 1,
                date: new Date(),
                title: action.payload.title,
                text: action.payload.message
            };
            return {...state, notifications: [...state.notifications, newItem]};
        }
        case REMOVE_NOTIFICATION: {
            return {...state, notifications: state.notifications
                .filter(Notification => Notification.id !== action.id)};
        }
        default:
            return state;
    }
}


export default notificationReducer;