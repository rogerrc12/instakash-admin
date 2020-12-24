import * as actionTypes from "./actionTypes";
const initialState = {
  documentTypes: [],
  error: "",
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_DOCUMENT_TYPES_SUCCESS:
      return { ...state, documentTypes: payload.data };

    case actionTypes.API_ERROR:
      return { ...state, error: payload };

    default:
      return state;
  }
}
