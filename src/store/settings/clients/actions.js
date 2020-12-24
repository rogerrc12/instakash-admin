import * as actionTypes from "./actionTypes";

export const getClientDetails = (id) => ({
  type: actionTypes.GET_CLIENT_DETAILS,
  payload: { id },
});

export const getClientDetailsSuccess = (data) => ({
  type: actionTypes.GET_CLIENT_DETAILS_SUCCESS,
  payload: { data },
});

export const getClientActivity = (id) => ({
  type: actionTypes.GET_CLIENT_ACTIVITY,
  payload: { id },
});

export const getClientActivitySuccess = (data) => ({
  type: actionTypes.GET_CLIENT_ACTIVITY_SUCCESS,
  payload: { data },
});

export const updateClient = (values, id) => ({
  type: actionTypes.UPDATE_CLIENT,
  payload: { values, id },
});

export const updateClientSuccess = (msg) => ({
  type: actionTypes.UPDATE_CLIENT_SUCCESS,
  payload: msg,
});

export const clearAlert = () => ({
  type: actionTypes.CLEAR_ALERT,
});

export const apiError = (msg) => ({
  type: actionTypes.API_ERROR,
  payload: msg,
});
