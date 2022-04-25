import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { registerUser } from "../../redux/actions/userActions";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-toastify";
import "./Register.scss";

// Regular expression for password
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  // Access isAuthenticated & error from redux store
  const { isAuthenticated, error } = useSelector((state) => state.userReducer);

  // Add state to page
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  // Destructure formData object
  const { name, email, password, password2 } = formData;

  // Add state to page
  const [validPassword, setValidPassword] = useState(false);
  const [pwdIsFocused, setPwdIsFocused] = useState(false);
  const [confirmIsFocused, setConfirmIsFocused] = useState(false);
  const [isMatch, setIsMatch] = useState(false);

  // Add reference to email input
  const nameRef = useRef(null);

  // Access redux dispatch function
  const dispatch = useDispatch();

  // Handle input change
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Object properties represent inputs
    const userData = {
      name,
      email,
      password,
    };

    dispatch(registerUser(userData));
  };

  // Focus name input upon initial render
  useEffect(() => {
    nameRef.current.focus();
  }, []);

  // Test password
  useEffect(() => {
    setValidPassword(PASSWORD_REGEX.test(password));
    // Compare passwords
    setIsMatch(password === password2);
  }, [password, password2]);

  useEffect(() => {
    // If authenticated redirect to home page
    if (isAuthenticated) {
      window.location.href = "/";
    }

    // If error // If error display error notification
    if (error) {
      toast.error(error);
    }
  }, [isAuthenticated, error]);

  return (
    <Layout>
      <section className="register-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <h2>Register</h2>
          {/* Name */}
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            required
            ref={nameRef}
            value={name}
            onChange={handleChange}
          />

          {/* Email */}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="example@email.com"
            required
            value={email}
            onChange={handleChange}
          />

          {/* Password */}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password123"
            required
            onFocus={() => setPwdIsFocused(true)}
            onBlur={() => setPwdIsFocused(false)}
            value={password}
            onChange={handleChange}
          />
          {!validPassword && pwdIsFocused && (
            <p>
              Password must be 8 to 24 characters, include uppercase and
              lowercase letters, a number, and a special character. Special
              characters that are permitted: ! @ # $ %
            </p>
          )}

          {/* Confirm password */}
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            name="password2"
            placeholder="Password123"
            required
            onFocus={() => setConfirmIsFocused(true)}
            onBlur={() => setConfirmIsFocused(false)}
            value={password2}
            onChange={handleChange}
          />
          {!isMatch && confirmIsFocused && (
            <p>Confirm password must match the password</p>
          )}

          <button
            type="submit"
            className="register-btn"
            disabled={!validPassword || !isMatch ? true : false}
          >
            Register
          </button>
          <p>
            Already have an account?{" "}
            <Link to="/login" className="login-link">
              Login here
            </Link>
          </p>
        </form>
      </section>
    </Layout>
  );
};

export default Register;
