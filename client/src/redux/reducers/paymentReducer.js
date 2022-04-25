import {
  ADD_PAYMENT,
  GET_PAYMENTS,
  GET_USER_PAYMENTS,
  PAYMENT_ERROR,
} from "../constants/paymentConstants";

const initialState = {
  payments: [],
  isLoading: true,
  error: "",
};

export const paymentReducer = (state = initialState, action) => {
  // Destructure action object
  const { type, payload } = action;

  switch (type) {
    case ADD_PAYMENT:
      return {
        ...state,
        payments: [...state.payments, payload],
        isLoading: false,
        error: "",
      };
    case GET_PAYMENTS:
    case GET_USER_PAYMENTS:
      return {
        ...state,
        payments: payload,
        isLoading: false,
        error: "",
      };
    case PAYMENT_ERROR:
      return {
        ...state,
        payments: [],
        isLoading: false,
        error: payload,
      };
    default:
      return state;
  }
};
