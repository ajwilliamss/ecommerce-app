import axios from "axios";
import {
  CREATE_PRODUCT,
  GET_PRODUCTS,
  GET_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  PRODUCT_ERROR,
} from "../constants/productConstants";

// Create product
export const createProduct = (token, productData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      "/api/products/create",
      productData,
      config
    );
    dispatch({ type: CREATE_PRODUCT, payload: response.data });
    window.location.href = `/products/${response.data._id}`;
  } catch (error) {
    console.error(error);
    dispatch({
      type: PRODUCT_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get products
export const getProducts = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/products");
    dispatch({ type: GET_PRODUCTS, payload: response.data });
  } catch (error) {
    console.error(error);
    dispatch({
      type: PRODUCT_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get product
export const getProduct = (productId) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/products/${productId}`);
    dispatch({ type: GET_PRODUCT, payload: response.data });
  } catch (error) {
    console.error(error);
    dispatch({
      type: PRODUCT_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Update product
export const updateProduct =
  (token, productId, productData) => async (dispatch) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(
        `/api/products/${productId}`,
        productData,
        config
      );
      dispatch({ type: UPDATE_PRODUCT, payload: response.data });
      setTimeout(() => {
        window.location.href = `/products/${response.data._id}`;
      }, 2000);
    } catch (error) {
      console.error(error);
      dispatch({
        type: PRODUCT_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// Delete product
export const deleteProduct = (token, productId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.delete(`/api/products/${productId}`, config);
    dispatch({ type: DELETE_PRODUCT, payload: productId });
  } catch (error) {
    console.error(error);
    dispatch({
      type: PRODUCT_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
