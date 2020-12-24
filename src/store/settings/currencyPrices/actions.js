import * as actionTypes from "./actionTypes";

export const addCurrencyPrice = (values, update) => ({
  type: actionTypes.ADD_CURRENCY_PRICE_INIT,
  payload: { values, update },
});

export const addCurrencyPriceSuccess = (msg) => ({
  type: actionTypes.ADD_CURRENCY_PRICE_SUCCESS,
  payload: msg,
});

export const clearAlert = () => ({
  type: actionTypes.CLEAR_ALERT,
});

export const apiError = (msg) => ({
  type: actionTypes.API_ERROR,
  payload: msg,
});
