import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBooks, removeBook } from '../redux/bookSlice'

const BookList = () => {
  const { books, loading, error } = useSelector((state) => state.books);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleRemoveBook = async (bookId) => {
    try {
      await dispatch(removeBook(bookId)).unwrap();
    } catch (error) {
      console.error("Failed to remove book:", error);
    }
  };
  if (loading) {
    return <div className="loading-message">Loading books...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="book-section book-list">
      <h2>Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <span className="book-info">{book.title} by {book.author}</span>
            <button className="delete-btn" onClick={() => handleRemoveBook(book.id)}>Delete</button>
          </li>
        ))}
        {books.length === 0 && <li className="no-books">No books available</li>}
      </ul>
    </div>
  )
}

export default BookList