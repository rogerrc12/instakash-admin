import * as actionTypes from "./actionTypes";
const initialState = {
  schedule: [],
  error: "",
  success: "",
  isLoading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_SCHEDULE:
      return { ...state, isLoading: true };

    case actionTypes.GET_SCHEDULE_SUCCESS:
      return { ...state, schedule: payload.schedule, isLoading: false };

    case actionTypes.EDIT_SCHEDULE_SUCCESS:
      return { ...state, success: payload };

    case actionTypes.CLEAR_ALERT:
      return { ...state, error: "", success: "" };

    case actionTypes.API_ERROR:
      return { ...state, error: payload };

    default:
      return state;
  }
}
