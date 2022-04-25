import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import "./OrderDetails.scss";

const OrderDetails = () => {
  // Access payments from redux store
  const { payments } = useSelector((state) => state.paymentReducer);

  // Get id parameter
  const { orderId } = useParams();

  return (
    <Layout>
      <section className="order-details-container">
        {/* Iterate over payments array of objects */}
        {payments.map((payment) => {
          const { _id, name, email, address, transactionId, createdAt, cart } =
            payment;
          return (
            _id === orderId && (
              <ul key={_id}>
                <li>
                  <strong>Name:</strong> {name}
                </li>
                <li>
                  <strong>Email:</strong> {email}
                </li>
                <li>
                  <strong>Address:</strong> {address}
                </li>
                <li>
                  <strong>Transaction ID:</strong> {transactionId}
                </li>
                <li>
                  <strong>Payment Date:</strong>{" "}
                  {new Date(createdAt).toString()}
                </li>
                <ul>
                  {cart.map((item) => (
                    <ul key={item._id}>
                      <li>
                        <strong>Product Name:</strong> {item.name}
                      </li>
                      <li>
                        <strong>Product Category:</strong> {item.category}
                      </li>
                      <li>
                        <strong>Quantity:</strong> {Number(item.quantity)}
                      </li>
                      <li>
                        <strong>Amount Paid:</strong> R
                        {item.price * Number(item.quantity)}
                      </li>
                    </ul>
                  ))}
                </ul>
              </ul>
            )
          );
        })}
      </section>
    </Layout>
  );
};

export default OrderDetails;
