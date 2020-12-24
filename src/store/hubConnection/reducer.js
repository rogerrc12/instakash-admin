import * as actionTypes from "./actionTypes";
const initialState = {
  connection: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.CREATE_CONNECTION_SUCCESS:
      return { connection: payload };

    case actionTypes.CREATE_CONNECTION_FAILED:
      return { connection: null };

    default:
      return state;
  }
}
