import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../redux/actions/userActions";
import { BiMenu } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import "./MobileNav.scss";

const MobileNav = () => {
  // Access user from redux store
  const { user } = useSelector((state) => state.userReducer);

  // Access cart from redux store
  const { cart } = useSelector((state) => state.cartReducer);

  // Add state to component
  const [open, setOpen] = useState(false);

  // Access redux dispatch function
  const dispatch = useDispatch();

  // React icon
  const menuIcon = (
    <BiMenu onClick={() => setOpen((prevState) => !prevState)} />
  );

  // React icon
  const closeIcon = (
    <MdClose onClick={() => setOpen((prevState) => !prevState)} />
  );

  return (
    <div className="mobile-nav">
      <div className="mobile-logo">
        <h1>
          <Link to="/">E-Commerce</Link>
        </h1>
      </div>
      {open ? closeIcon : menuIcon}
      {open && (
        <div className="mobile-nav-section">
          <ul className="mobile-nav-items" onClick={() => setOpen(false)}>
            <li className="mobile-nav-item">
              <Link to="/">Home</Link>
            </li>
            <li className="mobile-nav-item">
              <Link to="/profile">Profile</Link>
            </li>
            <li className="mobile-nav-item">
              {user ? (
                <Link to="/login" onClick={() => dispatch(logoutUser())}>
                  Logout
                </Link>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>
            {user && user.role === "admin" && (
              <li className="mobile-nav-item">
                <Link to="/admin">Admin</Link>
              </li>
            )}
            <li>
              <Link to="/cart">
                Cart: <span>{user ? cart.length : 0}</span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
