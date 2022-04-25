import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createProduct,
  getProduct,
  updateProduct,
} from "../../redux/actions/productActions";
import { toast } from "react-toastify";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import productPlaceholder from "../../assets/placeholder.png";
import "./ManageProduct.scss";

const ManageProduct = () => {
  // Access token from redux store
  const { token } = useSelector((state) => state.userReducer);

  // Access categories from redux store
  const { categories } = useSelector((state) => state.categoryReducer);

  // Access productReducer state from redux store
  const { success, error, product } = useSelector(
    (state) => state.productReducer
  );

  // Add state to component
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
    category: "",
  });

  // Destructure formData object
  const { name, price, description, category } = formData;

  // Add state to component
  const [image, setImage] = useState({});
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // Access redux dispatch function
  const dispatch = useDispatch();

  // Get the product id parameter
  const { productId } = useParams();

  // Handle input change
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle image upload
  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];

      // If no file selected
      if (!file) {
        alert("No file selected");
      }

      // If image larger than 1mb
      if (file.size > 1024 * 1024) {
        alert("Image must be smaller than 1MB");
      }

      // If image not the correct type
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        alert("Only jpeg & png images allowed");
      }

      // Create FormData object
      let imageFile = new FormData();

      // Insert file property
      imageFile.append("file", file);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      setLoading(true);
      const response = await axios.post(
        "/api/images/upload",
        imageFile,
        config
      );
      setImage(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  };

  // Handle image delete
  const handleDelete = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      setLoading(true);
      await axios.post(
        "/api/images/delete_img",
        {
          public_id: image.public_id,
        },
        config
      );
      setImage({});
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Object properties match productModel fields
    const productData = {
      name,
      price,
      description,
      image,
      category,
    };

    // If edit mode is true dispatch actions
    if (editMode) {
      dispatch(updateProduct(token, productId, productData));
    } else {
      dispatch(createProduct(token, productData));
    }
  };

  // If there is a id parameter
  useEffect(() => {
    if (productId) {
      setEditMode(true);
      dispatch(getProduct(productId));

      setFormData({
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category,
      });

      setImage(product.image);
    }
  }, [productId, product]);

  useEffect(() => {
    // If success display success notification
    if (success) {
      toast.success(success);
    }

    // If error display error notification
    if (error) {
      toast.error(error);
    }
  }, [success, error]);

  return (
    <section className="create-product-container">
      <form className="manage-product-form" onSubmit={handleSubmit}>
        <h3>Create/Edit a product:</h3>
        <input
          type="file"
          name="file"
          id="image-upload"
          onChange={handleUpload}
        />
        {loading ? (
          <Spinner />
        ) : (
          <img
            src={image && image.url ? image.url : productPlaceholder}
            alt="Product"
          />
        )}
        <FaTrash onClick={handleDelete} />
        <label htmlFor="name">Product Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          required
        />
        <label htmlFor="price">Product Price</label>
        <input
          type="number"
          name="price"
          value={price}
          onChange={handleChange}
          required
        />
        <label htmlFor="description">Product Description</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={handleChange}
          required
        />
        <label htmlFor="category">Category</label>
        <select
          name="category"
          value={category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          {/* Iterate over categories array of objects */}
          {categories.map((category) => {
            return (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            );
          })}
        </select>
        <button type="submit">{editMode ? "Update" : "Submit"}</button>
      </form>
    </section>
  );
};

export default ManageProduct;
