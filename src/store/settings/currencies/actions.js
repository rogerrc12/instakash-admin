import * as actionTypes from "./actionTypes";

export const getCurrencies = () => ({
  type: actionTypes.GET_CURRENCIES,
});

export const getCurrenciesSuccess = (data) => ({
  type: actionTypes.GET_CURRENCIES_SUCCESS,
  payload: { data },
});

export const apiError = (msg) => ({
  type: actionTypes.API_ERROR,
  payload: msg,
});
