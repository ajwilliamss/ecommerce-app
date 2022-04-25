import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../../components/Layout/Layout";
import ManageProduct from "../../components/ManageProduct/ManageProduct";
import Categories from "../../components/Categories/Categories";
import Payments from "../../components/Payments/Payments";
import { getPayments } from "../../redux/actions/paymentActions";
import Spinner from "../../components/Spinner/Spinner";
import "./Admin.scss";

const Admin = () => {
  // Access user & token from redux store
  const { user, token } = useSelector((state) => state.userReducer);

  // Access isLoading from redux store
  const { isLoading } = useSelector((state) => state.paymentReducer);

  // Access redux dispatch function
  const dispatch = useDispatch();

  // If the user is an admin, dispatch getPayments action
  useEffect(() => {
    if (user && user.role === "admin") {
      dispatch(getPayments(token));
    }
  }, []);

  return (
    <Layout>
      <h2 className="admin-heading">Admin Dashboard</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <section className="admin">
          <ManageProduct />
          <Categories />
          <Payments />
        </section>
      )}
    </Layout>
  );
};

export default Admin;
