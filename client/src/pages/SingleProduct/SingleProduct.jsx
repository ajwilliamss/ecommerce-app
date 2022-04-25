import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProduct, getProducts } from "../../redux/actions/productActions";
import { addToCart, updateUserCart } from "../../redux/actions/cartActions";
import { useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import Spinner from "../../components/Spinner/Spinner";
import Product from "../../components/Product/Product";
import { toast } from "react-toastify";
import "./SingleProduct.scss";

const SingleProduct = () => {
  const { product, products, error } = useSelector(
    (state) => state.productReducer
  );
  const { user, token } = useSelector((state) => state.userReducer);

  const [loading, setLoading] = useState(false);

  let quantity = 1;

  // Destructure product object
  const { _id, image, name, description, price, category } = product;

  const dispatch = useDispatch();
  const { productId } = useParams();

  useEffect(() => {
    if (productId) {
      setLoading(true);
      dispatch(getProduct(productId));
      dispatch(getProducts());

      const timer = setTimeout(() => {
        setLoading(false);
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [productId]);

  // If error
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Add to cart button
  const handleClick = () => {
    if (user) {
      dispatch(addToCart(_id, quantity));
      dispatch(updateUserCart(token, product, quantity));
      toast.success("Product added to cart");
    } else {
      toast.error("Please log in to add to cart");
    }
  };

  return (
    <Layout>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="single-product">
            <div className="single-product-section">
              <img
                src={image && image.url && image.url}
                alt={name}
                className="single-product-img"
              />
            </div>
            <div className="single-product-info">
              <h2>{name}</h2>
              <p>{description}</p>
              <span>R{price}</span>
              <div className="single-product-btn">
                <button type="button" onClick={handleClick}>
                  Add to Cart
                </button>
              </div>
            </div>
          </section>
          <section className="related-products">
            <h3>Related products</h3>
            <hr />
            <div className="related-products-section">
              {products.map((product) => {
                return (
                  product.category === category &&
                  product._id !== _id && (
                    <Product key={product._id} product={product} />
                  )
                );
              })}
            </div>
          </section>
        </>
      )}
    </Layout>
  );
};

export default SingleProduct;
