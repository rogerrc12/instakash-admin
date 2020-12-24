import * as actionTypes from "./actionTypes";

export const getDocumentTypes = () => ({
  type: actionTypes.GET_DOCUMENT_TYPES,
});

export const getDocumentTypesSuccess = (data) => ({
  type: actionTypes.GET_DOCUMENT_TYPES_SUCCESS,
  payload: { data },
});

export const apiError = (msg) => ({
  type: actionTypes.API_ERROR,
  payload: msg,
});
