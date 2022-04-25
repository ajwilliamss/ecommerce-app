import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../redux/actions/userActions";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-toastify";
import "./Login.scss";

const Login = () => {
  // Access isAuthenticated & error from redux store
  const { isAuthenticated, error } = useSelector((state) => state.userReducer);

  // Add state to page
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Destructure formData object
  const { email, password } = formData;

  // Add reference to email input
  const emailRef = useRef(null);

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

    // userData object properties represent inputs
    const userData = {
      email,
      password,
    };

    dispatch(loginUser(userData));
  };

  // Focus name input upon initial render
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    // If authenticated redirect to home page
    if (isAuthenticated) {
      window.location.href = "/";
    }

    // If error display error notification
    if (error) {
      toast.error(error);
    }
  }, [isAuthenticated, error]);

  return (
    <Layout>
      <section className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="example@email.com"
            required
            ref={emailRef}
            value={email}
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password123"
            required
            value={password}
            onChange={handleChange}
          />
          <button type="submit">Login</button>
          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </form>
      </section>
    </Layout>
  );
};

export default Login;
