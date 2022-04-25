import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { userReducer } from "./reducers/userReducer";
import { productReducer } from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducer";
import { paymentReducer } from "./reducers/paymentReducer";
import { categoryReducer } from "./reducers/categoryReducer";

const initialState = {};
const middleware = [thunk];

const rootReducer = combineReducers({
  userReducer,
  productReducer,
  cartReducer,
  paymentReducer,
  categoryReducer,
});

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
