import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Payments.scss";

const Payments = () => {
  // Access payments from redux store
  const { payments } = useSelector((state) => state.paymentReducer);

  return (
    <section className="all-payments">
      <h3>Payment history:</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Transaction ID</th>
            <th>Payment date</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {/* Iterate over payments array of objects */}
          {payments.map((payment) => {
            const { _id, name, transactionId, createdAt } = payment;
            return (
              <tr key={_id}>
                <td data-label="Name">{name}</td>
                <td data-label="Transaction ID">{transactionId}</td>
                <td data-label="Payment date">
                  {new Date(createdAt).toDateString()}
                </td>
                <td data-label="Details">
                  <Link to={`/order/${_id}`}>
                    <button type="button">View Details</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default Payments;
