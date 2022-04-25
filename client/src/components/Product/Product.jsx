import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, updateUserCart } from "../../redux/actions/cartActions";
import { deleteProduct } from "../../redux/actions/productActions";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Product.scss";

const Product = ({ product }) => {
  // Destructure product object
  const { _id, image, name, price, description } = product;

  // Access user & token from redux store
  const { user, token } = useSelector((state) => state.userReducer);

  // Access error from redux store
  const { error } = useSelector((state) => state.cartReducer);

  // Access redux dispatch function
  const dispatch = useDispatch();

  // Access react router navigate function
  const navigate = useNavigate();

  // By default, each item has a quantity of 1
  let quantity = 1;

  // Handle add to cart
  const handleClick = () => {
    // If user is logged in dispatch actions
    if (user) {
      dispatch(addToCart(_id, quantity));
      dispatch(updateUserCart(token, product, quantity));
      toast.success("Product added to cart");
    } else {
      toast.error("Please log in to add product to cart");
    }
  };

  // Handle product deletion
  const handleDelete = async () => {
    if (window.confirm("Please confirm that you want to delete this product")) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        await axios.post(
          "/api/images/delete_img",
          {
            public_id: image.public_id,
          },
          config
        );
        dispatch(deleteProduct(token, _id));
      } catch (error) {
        console.error(error);
        toast.error(error);
      }
    }
  };

  // If error display error notification
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="product">
      {user && user.role === "admin" && (
        <div className="admin-controls">
          <FaEdit onClick={() => navigate(`/edit/${_id}`)} />
          <FaTrash onClick={handleDelete} />
        </div>
      )}
      <img src={image && image.url} alt={name} />
      <h3>{name}</h3>
      <span className="product-price">R{price}</span>
      <p>{description}</p>
      <div className="product-btns">
        <button type="button" className="purchase-btn" onClick={handleClick}>
          Add to Cart
        </button>
        <button
          type="button"
          className="view-btn"
          onClick={() => navigate(`/products/${_id}`)}
        >
          View
        </button>
      </div>
    </div>
  );
};

export default Product;
