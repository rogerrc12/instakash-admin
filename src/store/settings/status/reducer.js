import * as actionTypes from "./actionTypes";
const initialState = {
  status: [],
  error: "",
  success: "",
  isLoading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_STATUS_SUCCESS:
      return { ...state, status: payload.data, isLoading: false };

    case actionTypes.EDIT_STATUS_SUCCESS:
      return { ...state, success: payload };

    case actionTypes.CLEAR_ALERT:
      return { ...state, error: "", success: "" };

    case actionTypes.API_ERROR:
      return { ...state, error: payload };

    default:
      return state;
  }
}
