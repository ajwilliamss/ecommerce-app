import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import Product from "../../components/Product/Product";
import Spinner from "../../components/Spinner/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../redux/actions/productActions";
import { getCategories } from "../../redux/actions/categoryActions";
import { toast } from "react-toastify";
import "./Home.scss";

const Home = () => {
  // Access productReducer state from redux store
  const { isLoading, products, error } = useSelector(
    (state) => state.productReducer
  );

  // Access categories from redux store
  const { categories } = useSelector((state) => state.categoryReducer);

  // Add state to page
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productCategory, setProductCategory] = useState("");
  const [productSort, setProductSort] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [numProducts, setNumProducts] = useState(6);

  // Slice filtered products array of objects
  const slicedProducts = filteredProducts.slice(0, numProducts);

  // Access redux dispatch function
  const dispatch = useDispatch();

  // Filter by category
  const filterByCategory = () => {
    if (productCategory === "all") {
      setFilteredProducts(products);
    } else {
      const matchedProducts = products.filter(
        (product) => product.category === productCategory
      );
      setFilteredProducts(matchedProducts);
    }
  };

  // Sort by price, newest or oldest
  const sortProducts = () => {
    if (productSort === "all") {
      setFilteredProducts(products);
    } else if (productSort === "hightolow") {
      const highToLow = [...products].sort(
        ({ price: a }, { price: b }) => b - a
      );
      setFilteredProducts(highToLow);
    } else if (productSort === "lowtohigh") {
      const lowToHigh = [...products].sort(
        ({ price: a }, { price: b }) => a - b
      );
      setFilteredProducts(lowToHigh);
    } else if (productSort === "newest") {
      const newestSort = [...products].sort((a, b) => {
        const c = new Date(a.createdAt).getTime();
        const d = new Date(b.createdAt).getTime();
        return d - c;
      });
      setFilteredProducts(newestSort);
    } else if (productSort === "oldest") {
      const oldestSort = [...products].sort((a, b) => {
        const c = new Date(a.createdAt).getTime();
        const d = new Date(b.createdAt).getTime();
        return c - d;
      });
      setFilteredProducts(oldestSort);
    }
  };

  // Search for product
  const handleSearch = () => {
    const search = products.filter((product) =>
      product.name.toLowerCase().includes(productSearch)
    );
    setFilteredProducts(search);
  };

  // Invoke getProducts & getCategories upon initial render
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
  }, []);

  // If there are products update the state
  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  // If productCategory changes, invoke filterByCategory
  useEffect(() => {
    filterByCategory();
  }, [productCategory]);

  // If productSort changes, invoke sortProducts
  useEffect(() => {
    sortProducts();
  }, [productSort]);

  // If productSearch changes, invoke handleSearch
  useEffect(() => {
    handleSearch();
  }, [productSearch]);

  // If error display error notification
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <Layout>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <section className="filters-container">
            <div className="category-group">
              <label htmlFor="category-filter">Filter by category:</label>
              <select
                name="category-filter"
                onChange={(e) => setProductCategory(e.target.value)}
              >
                <option value="all">Select Category</option>
                {/* Iterate over categories array of objects */}
                {categories.map((category) => {
                  return (
                    <option key={category._id} value={category.name}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="sort-by-group">
              <label htmlFor="sort-by">Sort by:</label>
              <select
                name="sort-by"
                onChange={(e) => setProductSort(e.target.value)}
              >
                <option value="all">Select Option</option>
                <option value="hightolow">Price: High to Low</option>
                <option value="lowtohigh">Price: Low to High</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
            <div className="search-group">
              <label htmlFor="search">Search:</label>
              <input
                type="search"
                name="search"
                onChange={(e) => setProductSearch(e.target.value.toLowerCase())}
              />
            </div>
          </section>
          <section className="products-container">
            {/* Iterate over slicedProducts array of objects */}
            {slicedProducts.map((product) => {
              return <Product key={product._id} product={product} />;
            })}
          </section>
          <div className="load-more">
            {filteredProducts.length > 6 && (
              <button
                type="buttton"
                onClick={() => setNumProducts((prevState) => prevState + 3)}
              >
                Load More
              </button>
            )}
          </div>
        </>
      )}
    </Layout>
  );
};

export default Home;
