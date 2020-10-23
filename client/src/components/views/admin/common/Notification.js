import React, { Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeNotification } from "../../../../_actions/admin/notifications.action";
import { useToasts } from 'react-toast-notifications'
import './Notification.css'

const Notification = () => {
  const dispatch = useDispatch();
    const { addToast } = useToasts()
    
  const notifications = useSelector((state) =>
    state.notifications.notifications);

  function closeNotification(id) {
    dispatch(removeNotification(id));
  }

  const notificationList = notifications.map(notification => {
    return (
      <div className="toast" key={`notification_${notification.id}`}>
        <div className="toast-header">
          <i className="fa fa-bell"></i>
          <strong className="mr-auto">{notification.title}</strong>
          <small>{notification.date.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' })}</small>
          <button type="button"
            className="ml-2 mb-1 close"
            data-dismiss="toast"
            aria-label="Close"
            onClick={() => closeNotification(notification.id)}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="toast-body">
          {notification.text}
        </div>
      </div>
    )
  });

  return (
    <div className="toast-wrapper">
      {notificationList}
    </div>
  );
};

export default Notification;
