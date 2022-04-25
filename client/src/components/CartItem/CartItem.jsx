import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/actions/cartActions";
import { FaTrash } from "react-icons/fa";
import "./CartItem.scss";

const CartItem = ({ cartItem }) => {
  // Destructure cart item object
  const { _id, name, image, price, quantity } = cartItem;

  // Access token from redux store
  const { token } = useSelector((state) => state.userReducer);

  // Access redux dispatch function
  const dispatch = useDispatch();

  // Handle cart item removal
  const handleRemove = () => {
    if (
      window.confirm(
        "Please confirm that you want to remove this product from your cart"
      )
    ) {
      // Dispatch removeFromCart with token & cartItem _id
      dispatch(removeFromCart(token, _id));
    }
  };

  return (
    <div className="cart-item">
      <img src={image.url} alt={name} className="cart-item-img" />
      <h4>{name}</h4>
      <span>R{price * quantity}</span>
      <div className="qty">
        <label htmlFor="quantity">Qty:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => dispatch(addToCart(_id, e.target.value))}
        />
      </div>
      <FaTrash onClick={() => handleRemove()} />
    </div>
  );
};

export default CartItem;
