import axios from "axios";
import { toast } from "react-toastify";
import {
  ADD_PAYMENT,
  GET_PAYMENTS,
  GET_USER_PAYMENTS,
  PAYMENT_ERROR,
} from "../constants/paymentConstants";
import { resetCart } from "./cartActions";

// Add payment
export const addPayment = (token, paymentData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      "/api/payments/add_payment",
      paymentData,
      config
    );
    dispatch({ type: ADD_PAYMENT, payload: response.data });
    toast.success("Payment Successful, redirecting to home page...");
    setTimeout(() => {
      window.location.href = "/";
      dispatch(resetCart(token));
    }, 2000);
  } catch (error) {
    console.error(error);
    dispatch({
      type: PAYMENT_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get payments
export const getPayments = (token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get("/api/payments", config);
    dispatch({ type: GET_PAYMENTS, payload: response.data });
  } catch (error) {
    dispatch({
      type: PAYMENT_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get user payments
export const getUserPayments = (token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get("/api/users/payment_history", config);
    dispatch({ type: GET_USER_PAYMENTS, payload: response.data });
  } catch (error) {
    dispatch({
      type: PAYMENT_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
