import * as actionTypes from "./actionTypes";

const initialState = {
  currencyExchanges: [],
  exchangeDetails: null,
  error: "",
  isLoading: true,
  isProcessing: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.APPROVE_EXCHANGE:
    case actionTypes.EDIT_EXCHANGE:
    case actionTypes.DECLINE_EXCHANGE:
    case actionTypes.CREATE_INVOICE:
      return { ...state, isProcessing: true };

    case actionTypes.GET_EXCHANGE_DETAILS:
      return { ...state, isLoading: true, exchangeDetails: null };

    case actionTypes.GET_EXCHANGE_DETAILS_SUCCESS:
      return { ...state, exchangeDetails: payload.details, isLoading: false };

    case actionTypes.APPROVE_EXCHANGE_SUCCESS:
    case actionTypes.DECLINE_EXCHANGE_SUCCESS:
    case actionTypes.EDIT_EXCHANGE_SUCCESS:
    case actionTypes.DECLINE_EXCHANGE_CANCELED:
    case actionTypes.APPROVE_EXCHANGE_CANCELED:
    case actionTypes.CREATE_INVOICE_SUCCESS:
      return { ...state, isProcessing: false };

    case actionTypes.CLEAR_ALERT:
      return { ...state, error: "", success: "" };

    case actionTypes.API_ERROR:
      return { ...state, error: payload, isLoading: false, isProcessing: false };

    default:
      return state;
  }
}
