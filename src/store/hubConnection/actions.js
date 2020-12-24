import * as actionTypes from "./actionTypes";

export const createConnection = () => ({
  type: actionTypes.CREATE_CONNECTION,
});

export const createConnectionSuccess = (connection) => ({
  type: actionTypes.CREATE_CONNECTION_SUCCESS,
  payload: connection,
});

export const createConnectionFailed = () => ({
  type: actionTypes.CREATE_CONNECTION_FAILED,
});
