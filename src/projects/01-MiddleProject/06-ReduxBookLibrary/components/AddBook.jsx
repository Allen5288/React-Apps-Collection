import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBook, clearError } from "../redux/bookSlice";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.books);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && author) {
      const newBook = { title, author };
      try {
        await dispatch(addBook(newBook)).unwrap();
        setTitle("");
        setAuthor("");
        // Clear any previous errors
        dispatch(clearError());
      } catch (error) {
        console.error("Failed to add book:", error);
      }
    }
  };
  return (
    <div className="book-section">
      <h2>Add Book</h2>
      {error && (
        <div className="error-message">
          Error: {error}
          <button onClick={() => dispatch(clearError())}>Clear Error</button>
        </div>
      )}
      <form className="add-book-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Book Title"
          required
          disabled={loading}
        />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Book Author"
          required
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default AddBook;
