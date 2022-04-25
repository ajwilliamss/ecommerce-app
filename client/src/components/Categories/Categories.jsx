import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../../redux/actions/categoryActions";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./Categories.scss";

const Categories = () => {
  // Access token from redux store
  const { token } = useSelector((state) => state.userReducer);

  // Access categoryReducer state from redux store
  const { success, categories, error } = useSelector(
    (state) => state.categoryReducer
  );

  // Add state to component
  const [category, setCategory] = useState("");
  const [edit, setEdit] = useState(false);
  const [categoryId, setCategoryId] = useState("");

  // Access redux dispatch function
  const dispatch = useDispatch();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // If edit is true
    if (edit) {
      const categoryName = {
        name: category,
      };

      // Dispatch actions
      dispatch(updateCategory(token, categoryId, categoryName));
      dispatch(getCategories());
    } else {
      const categoryName = {
        name: category,
      };

      dispatch(addCategory(token, categoryName));
    }

    setCategory("");
    setEdit(false);
  };

  // Handle edit category
  const editCategory = (id, name) => {
    setCategoryId(id);
    setCategory(name);
    setEdit((prevState) => !prevState);
  };

  // Dispatch getCategories action upon initial render
  useEffect(() => {
    dispatch(getCategories());
  }, []);

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
    <section className="add-categories-container">
      <div className="add-categories-wrapper">
        <h3>Add/Edit category:</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <button type="submit">{edit ? "Update" : "Submit"}</button>
        </form>
        <ul className="category-list">
          {/* Iterate over categories array of objects */}
          {categories.map((item) => {
            return (
              <li key={item._id}>
                {item.name}
                <div className="category-icons">
                  <FaEdit onClick={() => editCategory(item._id, item.name)} />
                  <FaTrash
                    onClick={() => dispatch(deleteCategory(token, item._id))}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Categories;
