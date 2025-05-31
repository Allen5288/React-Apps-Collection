import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBook } from "../redux/bookSlice";

const UpdateBook = () => {
  const [selectedBookId, setSelectedBookId] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.books);

  const handleBookSelect = (bookId) => {
    const book = books.find((b) => b.id === parseInt(bookId));
    if (book) {
      setSelectedBookId(bookId);
      setTitle(book.title);
      setAuthor(book.author);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedBookId && title && author) {
      try {
        await dispatch(updateBook({
          bookId: parseInt(selectedBookId),
          updatedBook: { title, author }
        })).unwrap();
        
        // Reset form
        setSelectedBookId("");
        setTitle("");
        setAuthor("");
      } catch (error) {
        console.error("Failed to update book:", error);
      }
    }
  };
  return (
    <div className="book-section update-book-section">
      <h2>Update Book</h2>
      <div className="book-selector">
        <label>Select Book to Update:</label>
        <select 
          value={selectedBookId} 
          onChange={(e) => handleBookSelect(e.target.value)}
          disabled={loading}
        >
          <option value="">Select a book...</option>
          {books.map((book) => (
            <option key={book.id} value={book.id}>
              {book.title} by {book.author}
            </option>
          ))}
        </select>
      </div>
      
      {selectedBookId && (
        <form className="update-form" onSubmit={handleSubmit}>
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
          <div className="form-buttons">
            <button className="update-btn" type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Book"}
            </button>
            <button 
              className="cancel-btn"
              type="button" 
              onClick={() => {
                setSelectedBookId("");
                setTitle("");
                setAuthor("");
              }}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateBook;
