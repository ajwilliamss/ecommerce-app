import axios from "axios";
import { toast } from "react-toastify";
import {
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  GET_USER,
  UPDATE_USER,
  DELETE_USER,
  USER_ERROR,
} from "../constants/userConstants";

// Register user
export const registerUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post("/api/users/register", userData);
    dispatch({ type: REGISTER_USER, payload: response.data });
  } catch (error) {
    console.error(error);
    dispatch({
      type: USER_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Login user
export const loginUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post("/api/users/login", userData);
    dispatch({ type: LOGIN_USER, payload: response.data });
  } catch (error) {
    console.error(error);
    dispatch({
      type: USER_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Logout user
export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_USER });
  } catch (error) {
    console.error(error);
    dispatch({
      type: USER_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get user
export const getUser = (token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get("/api/users/user", config);
    dispatch({ type: GET_USER, payload: response.data });
  } catch (error) {
    console.error(error);
    dispatch({
      type: USER_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Update user
export const updateUser = (token, userId, userData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(`/api/users/${userId}`, userData, config);
    dispatch({ type: UPDATE_USER, payload: response.data });
    toast.success("Profile updated");
  } catch (error) {
    console.error(error);
    dispatch({
      type: USER_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Delete user
export const deleteUser = (token, userId, navigate) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.delete(`/api/users/${userId}`, config);
    dispatch({ type: DELETE_USER });
    toast.success("Account deleted");
    navigate("/");
  } catch (error) {
    console.error(error);
    dispatch({
      type: USER_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
