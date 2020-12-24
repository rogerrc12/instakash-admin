import * as actionTypes from "./actionTypes";

export const getNotifications = () => ({
  type: actionTypes.GET_NOTIFICATIONS,
});

export const getNotificationsSuccess = (data) => ({
  type: actionTypes.GET_NOTIFICATIONS_SUCCESS,
  payload: { data },
});

export const apiError = (msg) => ({
  type: actionTypes.API_ERROR,
  payload: msg,
});
