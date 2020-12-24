import * as actionTypes from "./actionTypes";

export const getExchangeDetails = (id) => ({
  type: actionTypes.GET_EXCHANGE_DETAILS,
  payload: { id },
});

export const getExchangeDetailsSuccess = (details) => ({
  type: actionTypes.GET_EXCHANGE_DETAILS_SUCCESS,
  payload: { details },
});

export const approveExchange = (id, close, closeApprove, connection, details, invoice = null) => ({
  type: actionTypes.APPROVE_EXCHANGE,
  payload: { id, close, closeApprove, connection, details, invoice },
});

export const approveExchangeSuccess = () => ({
  type: actionTypes.APPROVE_EXCHANGE_SUCCESS,
});

export const approveExchangeCancel = () => ({
  type: actionTypes.APPROVE_EXCHANGE_CANCELED,
});

export const declineExchange = (id, connection, closeModal, message) => ({
  type: actionTypes.DECLINE_EXCHANGE,
  payload: { id, closeModal, message, connection },
});

export const declineExchangeSuccess = () => ({
  type: actionTypes.DECLINE_EXCHANGE_SUCCESS,
});

export const declineExchangeCancel = () => ({
  type: actionTypes.DECLINE_EXCHANGE_CANCELED,
});

export const editExchange = (id, details, values, update) => ({
  type: actionTypes.EDIT_EXCHANGE,
  payload: { id, details, values, update },
});

export const editExchangeSuccess = (msg) => ({
  type: actionTypes.EDIT_EXCHANGE_SUCCESS,
  payload: msg,
});

export const createInvoice = (id, close, details, update = null) => ({
  type: actionTypes.CREATE_INVOICE,
  payload: { id, close, details, update },
});

export const createInvoiceSuccess = () => ({
  type: actionTypes.CREATE_INVOICE_SUCCESS,
});

export const clearAlert = () => ({
  type: actionTypes.CLEAR_ALERT,
});

export const apiError = (msg) => ({
  type: actionTypes.API_ERROR,
  payload: msg,
});
