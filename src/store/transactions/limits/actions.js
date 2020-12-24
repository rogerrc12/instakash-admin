import * as actionTypes from "./actionTypes";

export const getLimits = () => ({
  type: actionTypes.GET_LIMITS,
});

export const getLimitsSuccess = (data) => ({
  type: actionTypes.GET_LIMITS_SUCCESS,
  payload: { data },
});

export const editLimits = (values, limitsData, reset) => ({
  type: actionTypes.EDIT_LIMITS,
  payload: { values, limitsData, reset },
});

export const editLimitsSuccess = (msg) => ({
  type: actionTypes.EDIT_LIMITS_SUCCESS,
  payload: msg,
});

export const clearSuccessLimitsAlert = () => ({
  type: actionTypes.CLEAR_SUCCESS_ALERT,
});

export const clearErrorLimitsAlert = () => ({
  type: actionTypes.CLEAR_ERROR_ALERT,
});

export const apiError = (msg) => ({
  type: actionTypes.API_ERROR,
  payload: msg,
});
