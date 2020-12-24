import * as actionTypes from "./actionTypes";
const initialState = {
  limits: [],
  isLoading: true,
  success: "",
  error: "",
  isProcessing: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_LIMITS:
      return { ...state, isLoading: true };
    case actionTypes.GET_LIMITS_SUCCESS:
      return { ...state, isLoading: false, limits: payload.data };

    case actionTypes.EDIT_LIMITS:
      return { ...state, isProcessing: true };
    case actionTypes.EDIT_LIMITS_SUCCESS:
      return { ...state, isProcessing: false, success: payload };

    case actionTypes.CLEAR_SUCCESS_ALERT:
      return { ...state, success: "" };
    case actionTypes.CLEAR_ERROR_ALERT:
      return { ...state, error: "" };

    case actionTypes.API_ERROR:
      return { ...state, error: payload };

    default:
      return state;
  }
}
