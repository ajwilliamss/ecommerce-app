import axios from "axios";
import {
  ADD_CATEGORY,
  GET_CATEGORIES,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  CATEGORY_ERROR,
} from "../constants/categoryConstants";

// Add category
export const addCategory = (token, categoryName) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      "/api/categories/add_category",
      categoryName,
      config
    );
    dispatch({ type: ADD_CATEGORY, payload: response.data });
  } catch (error) {
    console.error(error);
    dispatch({
      type: CATEGORY_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get categories
export const getCategories = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/categories");
    dispatch({ type: GET_CATEGORIES, payload: response.data });
  } catch (error) {
    console.error(error);
    dispatch({
      type: CATEGORY_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Update category
export const updateCategory =
  (token, categoryId, categoryName) => async (dispatch) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(
        `/api/categories/${categoryId}`,
        categoryName,
        config
      );
      dispatch({ type: UPDATE_CATEGORY, payload: response.data });
    } catch (error) {
      console.error(error);
      dispatch({
        type: CATEGORY_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// Delete category
export const deleteCategory = (token, categoryId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.delete(`/api/categories/${categoryId}`, config);
    dispatch({ type: DELETE_CATEGORY, payload: categoryId });
  } catch (error) {
    console.error(error);
    dispatch({
      type: CATEGORY_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
