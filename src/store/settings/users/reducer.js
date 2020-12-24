import { GET_USERS_SUCCESS, API_ERROR, ADD_USER_SUCCESS, GET_ROLES_SUCCESS, EDIT_USER_SUCCESS, CLEAR_ALERT } from "./actionTypes";

const initialState = {
  users: [],
  roles: [],
  error: "",
  success: "",
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case GET_ROLES_SUCCESS:
      return (state = { ...state, roles: action.payload });
    case GET_USERS_SUCCESS:
      return (state = { ...state, users: action.payload });
    case ADD_USER_SUCCESS:
    case EDIT_USER_SUCCESS:
      return (state = { ...state, success: action.payload });
    case API_ERROR:
      return (state = { ...state, error: action.payload });
    case CLEAR_ALERT:
      return (state = { ...state, error: "", success: "" });
    default:
      return (state = { ...state });
  }
};

export default profile;
