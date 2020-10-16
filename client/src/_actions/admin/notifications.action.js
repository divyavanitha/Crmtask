import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from "./types";

export function addNotification(title, text) {
    return { type: ADD_NOTIFICATION, text: text, title: title };
}

export function removeNotification(id) {
    return { type: REMOVE_NOTIFICATION, id: id };
}
