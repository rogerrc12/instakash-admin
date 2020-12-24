import * as actionTypes from "./actionTypes";

export const getSettings = () => ({
  type: actionTypes.GET_SETTINGS,
});

export const getSettingsSuccess = (settings) => ({
  type: actionTypes.GET_SETTINGS_SUCCESS,
  payload: { settings },
});

export const updateSettings = (values) => ({
  type: actionTypes.UPDATE_SETTINGS,
  payload: { values },
});

export const updateSettingsSuccess = (msg) => ({
  type: actionTypes.UPDATE_SETTINGS_SUCCESS,
  payload: msg,
});

export const clearMessage = () => ({
  type: actionTypes.CLEAR_MESSAGE,
});

export const apiError = (msg) => ({
  type: actionTypes.API_ERROR,
  payload: msg,
});
