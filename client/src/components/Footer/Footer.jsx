import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/actions/userActions";
import { Link } from "react-router-dom";
import "./Footer.scss";

const Footer = () => {
  // Access user from redux store
  const { user } = useSelector((state) => state.userReducer);

  // Access redux dispatch function
  const dispatch = useDispatch();

  return (
    <footer className="footer">
      <div className="footer-wrapper">
        <div className="column1">
          <Link to="/">
            <h1>E-Commerce</h1>
          </Link>
          <ul className="footer-address">
            <li>123-456-7890</li>
            <li>City name, country</li>
            <li>123 Street Address</li>
          </ul>
        </div>
        <div className="column2">
          <ul className="footer-nav-items">
            <li className="footer-nav-item">
              <Link to="/">Home</Link>
            </li>
            <li className="footer-nav-item">
              <Link to="/Profile">Profile</Link>
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
        </div>
        <div className="column3">
          <ul>
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor sit amet.</li>
          </ul>
        </div>
      </div>
      <div className="row">
        <p>
          &copy; {new Date().getFullYear()} AJ Williams | All rights reserved |
          Terms Of Service | Privacy
        </p>
      </div>
    </footer>
  );
};

export default Footer;
