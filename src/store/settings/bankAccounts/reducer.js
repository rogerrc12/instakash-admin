import * as actionTypes from "./actionTypes";
const initialState = {
  accounts: [],
  error: "",
  success: "",
  isLoading: true,
  isProcessing: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_CB_ACCOUNTS:
      return { ...state, isLoading: true };
    case actionTypes.GET_CB_ACCOUNTS_SUCCESS:
      return { ...state, isLoading: false, accounts: payload.data };

    case actionTypes.EDIT_CB_ACCOUNTS:
      return { ...state, isProcessing: true };
    case actionTypes.EDIT_CB_ACCOUNTS_SUCCESS:
      return { ...state, isProcessing: false, success: payload };

    case actionTypes.CLEAR_CB_ACCOUNTS_ALERT:
      return { ...state, success: "", error: "" };

    case actionTypes.API_ERROR:
      return { ...state, error: payload };

    default:
      return state;
  }
}
