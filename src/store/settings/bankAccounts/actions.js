import * as actionTypes from "./actionTypes";

export const getCbAccounts = () => ({
  type: actionTypes.GET_CB_ACCOUNTS,
});

export const getCbAccountsSuccess = (data) => ({
  type: actionTypes.GET_CB_ACCOUNTS_SUCCESS,
  payload: { data },
});

export const addCbAccount = (values, reset) => ({
  type: actionTypes.ADD_CB_ACCOUNTS,
  payload: { values, reset },
});

export const addCbAccountSuccess = (msg) => ({
  type: actionTypes.ADD_CB_ACCOUNTS_SUCCESS,
  payload: msg,
});

export const editCbAccount = (values, accId, reset) => ({
  type: actionTypes.EDIT_CB_ACCOUNTS,
  payload: { values, accId, reset },
});

export const editCbAccountSuccess = (msg) => ({
  type: actionTypes.EDIT_CB_ACCOUNTS_SUCCESS,
  payload: msg,
});

export const clearAlert = () => ({
  type: actionTypes.CLEAR_CB_ACCOUNTS_ALERT,
});

export const apiError = (msg) => ({
  type: actionTypes.API_ERROR,
  payload: msg,
});
