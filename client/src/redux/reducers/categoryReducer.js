import {
  ADD_CATEGORY,
  GET_CATEGORIES,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  CATEGORY_ERROR,
} from "../constants/categoryConstants";

const initialState = {
  categories: [],
  category: {},
  success: "",
  error: "",
};

export const categoryReducer = (state = initialState, action) => {
  // Destructure action object
  const { type, payload } = action;

  switch (type) {
    case ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, payload],
        success: "Category added",
        error: "",
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: payload,
        success: "",
        error: "",
      };
    case UPDATE_CATEGORY:
      return {
        ...state,
        category: payload,
        success: "Category updated",
        error: "",
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter((item) => item._id !== payload),
        success: "Category deleted",
        error: "",
      };
    case CATEGORY_ERROR:
      return {
        ...state,
        categories: [],
        category: {},
        success: "",
        error: payload,
      };
    default:
      return state;
  }
};
