import {
  CREATE_PRODUCT,
  GET_PRODUCTS,
  GET_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  PRODUCT_ERROR,
} from "../constants/productConstants";

const initialState = {
  product: {},
  products: [],
  isLoading: true,
  success: "",
  error: "",
};

export const productReducer = (state = initialState, action) => {
  // Destructure action object
  const { type, payload } = action;

  switch (type) {
    case CREATE_PRODUCT:
      return {
        ...state,
        products: [...state.products, payload],
        isLoading: false,
        success: "Product created",
        error: "",
      };
    case GET_PRODUCTS:
      return {
        ...state,
        products: payload,
        isLoading: false,
        success: "",
        error: "",
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: payload,
        isLoading: false,
        success: "",
        error: "",
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        product: payload,
        isLoading: false,
        success: "Product updated",
        error: "",
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((product) => product._id !== payload),
        isLoading: false,
        success: "",
        error: "",
      };
    case PRODUCT_ERROR:
      return {
        ...state,
        isLoading: false,
        success: "",
        error: payload,
      };
    default:
      return state;
  }
};
