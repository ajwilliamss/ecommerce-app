import {
  GET_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  RESET_CART,
  CART_ERROR,
} from "../constants/cartConstants";

const initialState = {
  cart: [],
  isLoading: true,
  error: "",
};

export const cartReducer = (state = initialState, action) => {
  // Destructure action object
  const { type, payload } = action;

  switch (type) {
    case GET_CART:
      return {
        ...state,
        cart: payload,
        isLoading: false,
        error: "",
      };
    case ADD_TO_CART:
      const cartItem = payload;

      const cartItemExists = state.cart.find(
        (item) => item._id === cartItem._id
      );

      if (cartItemExists) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item._id === cartItemExists._id ? cartItem : item
          ),
          isLoading: false,
          error: "",
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, cartItem],
          isLoading: false,
          error: "",
        };
      }
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== payload),
        isLoading: false,
        error: "",
      };
    case RESET_CART:
      return {
        ...state,
        cart: [],
        isLoading: false,
        error: "",
      };
    case CART_ERROR:
      return {
        ...state,
        cart: [],
        isLoading: false,
        error: payload,
      };
    default:
      return state;
  }
};
