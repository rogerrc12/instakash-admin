import * as actionTypes from "./actionTypes";

const initialState = {
  currencyPrices: [],
  error: "",
  success: "",
  isUpdating: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.ADD_CURRENCY_PRICE_INIT:
      return { ...state, isUpdating: true };

    case actionTypes.ADD_CURRENCY_PRICE_SUCCESS:
      return { ...state, success: payload, isUpdating: false };

    case actionTypes.CLEAR_ALERT:
      return { ...state, success: "", error: "" };
    case actionTypes.API_ERROR:
      return { ...state, error: payload };
    default:
      return state;
  }
}
