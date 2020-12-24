import * as actionTypes from "./actionTypes";
const initialState = {
  notifications: null,
  error: "",
  isLoading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_NOTIFICATIONS_SUCCESS:
      return { ...state, isLoading: false, notifications: payload.data };

    case actionTypes.API_ERROR:
      return { ...state, error: payload };

    default:
      return state;
  }
}
