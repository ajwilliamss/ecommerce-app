import axios from "axios";
import {
  GET_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  RESET_CART,
  CART_ERROR,
} from "../constants/cartConstants";

// Get cart
export const getCart = (token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get("/api/users/get_cart", config);
    dispatch({ type: GET_CART, payload: response.data });
  } catch (error) {
    console.error(error);
    dispatch({
      type: CART_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Add to cart
export const addToCart = (productId, quantity) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/products/${productId}`);
    dispatch({ type: ADD_TO_CART, payload: { ...response.data, quantity } });
  } catch (error) {
    console.error(error);
    dispatch({
      type: CART_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Update user cart
export const updateUserCart =
  (token, product, quantity) => async (dispatch) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.patch(
        "/api/users/update_cart",
        { cart: { ...product, quantity } },
        config
      );
    } catch (error) {
      console.error(error);
      dispatch({
        type: CART_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// Remove item from cart
export const removeFromCart = (token, productId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.delete(`/api/users/remove_item/${productId}`, config);
    dispatch({ type: REMOVE_FROM_CART, payload: productId });
  } catch (error) {
    console.error(error);
    dispatch({
      type: CART_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Reset cart
export const resetCart = (token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.get("/api/users/clear_cart", config);
    dispatch({ type: RESET_CART });
  } catch (error) {
    console.error(error);
    dispatch({
      type: CART_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
