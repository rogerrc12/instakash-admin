import * as actionsTypes from "./actionTypes";

const initialState = {
  settings: {},
  success: "",
  error: "",
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionsTypes.GET_SETTINGS_SUCCESS:
      return { ...state, settings: payload.settings };

    case actionsTypes.UPDATE_SETTINGS_SUCCESS:
      return { ...state, success: payload };

    case actionsTypes.CLEAR_MESSAGE:
      return { ...state, error: "", success: "" };

    case actionsTypes.API_ERROR:
      return { ...state, error: payload };
    default:
      return state;
  }
}
