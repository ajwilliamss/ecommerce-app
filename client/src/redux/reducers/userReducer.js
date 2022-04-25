import {
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  GET_USER,
  UPDATE_USER,
  DELETE_USER,
  USER_ERROR,
} from "../constants/userConstants";

// Get token from local storage
const token = localStorage.getItem("token");

// null is used to ensure token & user are falsy
const initialState = {
  isAuthenticated: false,
  token: token ? token : null,
  user: null,
  error: "",
};

export const userReducer = (state = initialState, action) => {
  // Destructure action object
  const { type, payload } = action;

  switch (type) {
    case REGISTER_USER:
    case LOGIN_USER:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        isAuthenticated: true,
        token: payload,
        error: "",
      };
    case LOGOUT_USER:
    case DELETE_USER:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: null,
        error: "",
      };
    case GET_USER:
    case UPDATE_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
        error: "",
      };
    case USER_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: null,
        error: payload,
      };
    default:
      return state;
  }
};
