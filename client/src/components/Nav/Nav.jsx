import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/actions/userActions";
import "./Nav.scss";

const Nav = () => {
  // Access user from redux store
  const { user } = useSelector((state) => state.userReducer);

  // Access cart from redux store
  const { cart } = useSelector((state) => state.cartReducer);

  // Access redux dispatch function
  const dispatch = useDispatch();

  return (
    <nav className="nav">
      <div className="logo">
        <h1>
          <Link to="/">E-Commerce</Link>
        </h1>
      </div>
      <div className="nav-section">
        <ul className="nav-items">
          <li className="nav-item">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/profile">Profile</Link>
          </li>
          <li className="nav-item">
            {user ? (
              <Link to="/login" onClick={() => dispatch(logoutUser())}>
                Logout
              </Link>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
          {user && user.role === "admin" && (
            <li className="nav-item">
              <Link to="/admin">Admin</Link>
            </li>
          )}
        </ul>
        <div className="cart-icon">
          <Link to="/cart">
            <FaShoppingCart className="shopping-cart" />
            <span>{user ? cart.length : 0}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
