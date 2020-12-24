import * as actionTypes from "./actionTypes";
const initialState = {
  currencies: [],
  error: "",
  isLoading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_CURRENCIES_SUCCESS:
      return { ...state, currencies: payload.data };

    case actionTypes.API_ERROR:
      return { ...state, error: payload };

    default:
      return state;
  }
}
