import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./UserPayments.scss";

const UserPayments = () => {
  // Access user from redux store
  const { user } = useSelector((state) => state.userReducer);

  // Access payments from redux store
  const { payments } = useSelector((state) => state.paymentReducer);

  return (
    <section className="user-payments">
      <h3>Payment history of {user.name}</h3>
      <table>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Payment date</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {/* Iterate over categories array of objects */}
          {payments.map((payment) => {
            const { _id, transactionId, createdAt } = payment;
            return (
              <tr key={_id}>
                <td>{transactionId}</td>
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

export default UserPayments;
