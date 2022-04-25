import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPayment } from "../../redux/actions/paymentActions";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import Layout from "../../components/Layout/Layout";
import CartItem from "../../components/CartItem/CartItem";
import Spinner from "../../components/Spinner/Spinner";
import "./Cart.scss";

const Cart = () => {
  // Access token from redux store
  const { token } = useSelector((state) => state.userReducer);

  // Access cartReducer state from redux store
  const { cart, isLoading, error } = useSelector((state) => state.cartReducer);

  // Access redux dispatch function
  const dispatch = useDispatch();

  // Count cart items
  const countCartItems = () => {
    return cart.reduce(
      (prevQuantity, item) => prevQuantity + Number(item.quantity),
      0
    );
  };

  // Get cart total
  const cartTotal = () => {
    return cart.reduce(
      (prevPrice, item) => prevPrice + item.price * Number(item.quantity),
      0
    );
  };

  // Payment handler
  const handlePayment = () => {
    const paymentData = {
      cart,
      address: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      transactionId: uuidv4(),
    };

    dispatch(addPayment(token, paymentData));
  };

  // If error display error notification
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <Layout>
      <h2 className="cart-heading">Shopping Cart</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <section className="cart">
          {cart.length === 0 ? (
            <span>
              Cart is empty, <Link to="/">return home</Link>
            </span>
          ) : (
            <div className="cart-items">
              {/* Iterate over categories array of objects */}
              {cart.map((cartItem) => {
                const { _id } = cartItem;
                return (
                  <CartItem
                    key={_id}
                    cartItem={cartItem}
                    cartTotal={cartTotal}
                  />
                );
              })}
            </div>
          )}
          <div className="checkout-section">
            <div className="checkout-section-items">
              <h6>Cart Summary</h6>
              <p>Subtotal ({countCartItems()}) items:</p>
              <span>R{cartTotal()}</span>
              <button
                type="button"
                className="checkout-btn"
                onClick={handlePayment}
              >
                Pay Amount
              </button>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default Cart;
