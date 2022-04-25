import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../../components/Layout/Layout";
import UserPayments from "../../components/UserPayments/UserPayments";
import { getUserPayments } from "../../redux/actions/paymentActions";
import { updateUser, deleteUser } from "../../redux/actions/userActions";
import Spinner from "../../components/Spinner/Spinner";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Profile.scss";

// Regular expression for password
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Profile = () => {
  // Access userReducer state from redux store
  const { user, token, error } = useSelector((state) => state.userReducer);

  // Access isLoading from redux store
  const { isLoading } = useSelector((state) => state.paymentReducer);

  // Input references
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPwdRef = useRef(null);

  // Add state to page
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [pwdIsFocused, setPwdIsFocused] = useState(false);
  const [confirmIsFocused, setConfirmIsFocused] = useState(false);
  const [isMatch, setIsMatch] = useState(false);

  // Access redux dispatch function
  const dispatch = useDispatch();

  // Access navigate method
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Object properties represent inputs
    const userData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    dispatch(updateUser(token, user._id, userData));
  };

  // Handle account deletion
  const handleDelete = () => {
    if (window.confirm("Please confirm that you want to delete your account")) {
      dispatch(deleteUser(token, user._id, navigate));
    }
  };

  // If user is logged in dispatch getUserPayments action
  useEffect(() => {
    if (user) {
      dispatch(getUserPayments(token));
    }
  }, []);

  // Test password
  useEffect(() => {
    setValidPassword(PASSWORD_REGEX.test(pwd));
    // Compare passwords
    setIsMatch(pwd === confirmPwd);
  }, [pwd, confirmPwd]);

  // If error display error notification
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <Layout>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <section className="profile-container">
            <form className="profile-form" onSubmit={handleSubmit}>
              <h2>Edit Profile</h2>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                ref={nameRef}
                defaultValue={user.name}
                required
              />
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                ref={emailRef}
                defaultValue={user.email}
                required
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                ref={passwordRef}
                value={pwd}
                required
                onFocus={() => setPwdIsFocused(true)}
                onBlur={() => setPwdIsFocused(false)}
                onChange={(e) => setPwd(e.target.value)}
              />
              {!validPassword && pwdIsFocused && (
                <p>
                  Password must be 8 to 24 characters, include uppercase and
                  lowercase letters, a number, and a special character. Special
                  characters that are permitted: ! @ # $ %
                </p>
              )}
              <label htmlFor="password2">Confirm Password</label>
              <input
                type="password"
                name="password2"
                ref={confirmPwdRef}
                value={confirmPwd}
                required
                onFocus={() => setConfirmIsFocused(true)}
                onBlur={() => setConfirmIsFocused(false)}
                onChange={(e) => setConfirmPwd(e.target.value)}
              />
              {!isMatch && confirmIsFocused && (
                <p>Confirm password must match the password</p>
              )}
              <button
                type="submit"
                className="profile-update-btn"
                disabled={!validPassword || !isMatch ? true : false}
              >
                Update
              </button>
              <button
                type="button"
                className="profile-delete-btn"
                onClick={handleDelete}
              >
                Delete Account
              </button>
            </form>
          </section>
          <UserPayments />
        </>
      )}
    </Layout>
  );
};

export default Profile;
