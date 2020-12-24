import * as actionTypes from "./actionTypes";

export const getStatus = () => ({
  type: actionTypes.GET_STATUS,
});

export const getStatusSuccess = (data) => ({
  type: actionTypes.GET_STATUS_SUCCESS,
  payload: { data },
});

export const editStatus = (values, id, reset) => ({
  type: actionTypes.EDIT_STATUS,
  payload: { values, id, reset },
});

export const editStatusSuccess = (msg) => ({
  type: actionTypes.EDIT_STATUS_SUCCESS,
  payload: msg,
});

export const clearAlert = () => ({
  type: actionTypes.CLEAR_ALERT,
});

export const apiError = (msg) => ({
  type: actionTypes.API_ERROR,
  payload: msg,
});
