import * as actionTypes from "./actionTypes";

export const getRoles = () => ({
  type: actionTypes.GET_ROLES,
});

export const getRolesSuccess = (roles) => ({
  type: actionTypes.GET_ROLES_SUCCESS,
  payload: [...roles],
});

export const getUsers = () => ({
  type: actionTypes.GET_USERS,
});

export const getUsersSuccess = (users) => ({
  type: actionTypes.GET_USERS_SUCCESS,
  payload: [...users],
});

export const addUser = (values) => ({
  type: actionTypes.ADD_USER,
  payload: { values },
});

export const addUserSuccess = (msg) => ({
  type: actionTypes.ADD_USER_SUCCESS,
  payload: msg,
});

export const editUser = (values, userId) => ({
  type: actionTypes.EDIT_USER,
  payload: { values, userId },
});

export const editUserSuccess = (msg) => ({
  type: actionTypes.EDIT_USER_SUCCESS,
  payload: msg,
});

export const deleteUser = (id) => ({
  type: actionTypes.DELETE_USER,
  payload: { userId: id },
});

export const apiError = (msg) => ({
  type: actionTypes.API_ERROR,
  payload: msg,
});

export const clearAlert = () => ({
  type: actionTypes.CLEAR_ALERT,
});
