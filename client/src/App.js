import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import Cart from "./pages/Cart/Cart";
import SingleProduct from "./pages/SingleProduct/SingleProduct";
import Admin from "./pages/Admin/Admin";
import OrderDetails from "./pages/OrderDetails/OrderDetails";
import NotFound from "./pages/NotFound/NotFound";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "./redux/actions/userActions";
import { getCart } from "./redux/actions/cartActions";
import BackToTop from "./utils/BackToTop";
import "./App.scss";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // If token exists get user & cart
    if (localStorage.token) {
      dispatch(getUser(localStorage.token));
      dispatch(getCart(localStorage.token));
    }
  }, []);

  const { user } = useSelector((state) => state.userReducer);

  return (
    <>
      <Router>
        <BackToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route path="/register" element={user ? <Home /> : <Register />} />
          <Route path="/profile" element={user ? <Profile /> : <Login />} />
          <Route path="/cart" element={user ? <Cart /> : <Login />} />
          {user && user.role === "admin" && (
            <>
              <Route path="/admin" element={<Admin />} />
              <Route path="/edit/:productId" element={<Admin />} />
            </>
          )}
          <Route path="/products/:productId" element={<SingleProduct />} />
          <Route path="/order/:orderId" element={<OrderDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
