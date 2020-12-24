import * as actionTypes from "./actionTypes";
const initialState = {
  details: null,
  activity: {},
  error: "",
  success: "",
  isLoading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_CLIENT_DETAILS_SUCCESS:
      return { ...state, details: payload.data };

    case actionTypes.GET_CLIENT_ACTIVITY:
      return { ...state, isLoading: true };
    case actionTypes.GET_CLIENT_ACTIVITY_SUCCESS:
      return { ...state, activity: payload.data, isLoading: false };

    case actionTypes.UPDATE_CLIENT_SUCCESS:
      return { ...state, success: payload };

    case actionTypes.CLEAR_ALERT:
      return { ...state, success: "", error: "" };

    case actionTypes.API_ERROR:
      return { ...state, error: payload };

    default:
      return state;
  }
}
