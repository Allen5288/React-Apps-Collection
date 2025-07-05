import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fakeAPI from "../fakeAPI";

// Async thunk to fetch books
export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  try {
    const data = await fakeAPI.fetchBooks();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch books: " + error.message);
  }
});

// Async thunk to add a book
export const addBook = createAsyncThunk("books/addBook", async (newBook) => {
  try {
    const addedBook = await fakeAPI.addBook(newBook);
    return addedBook;
  } catch (error) {
    throw new Error("Failed to add book: " + error.message);
  }
});

// Async thunk to remove a book
export const removeBook = createAsyncThunk("books/removeBook", async (bookId) => {
  try {
    await fakeAPI.removeBook(bookId);
    return bookId;
  } catch (error) {
    throw new Error("Failed to remove book: " + error.message);
  }
});

// Async thunk to update a book
export const updateBook = createAsyncThunk("books/updateBook", async ({ bookId, updatedBook }) => {
  try {
    const updatedBookData = await fakeAPI.updateBook(bookId, updatedBook);
    return updatedBookData;
  } catch (error) {
    throw new Error("Failed to update book: " + error.message);
  }
});

const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch books cases
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
        state.error = null;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.error("Failed to fetch books:", action.error.message);
      })
      
      // Add book cases
      .addCase(addBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.loading = false;
        state.books.push(action.payload);
        state.error = null;
      })
      .addCase(addBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.error("Failed to add book:", action.error.message);
      })
      
      // Remove book cases
      .addCase(removeBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeBook.fulfilled, (state, action) => {
        state.loading = false;
        state.books = state.books.filter((book) => book.id !== action.payload);
        state.error = null;
      })
      .addCase(removeBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.error("Failed to remove book:", action.error.message);
      })
      
      // Update book cases
      .addCase(updateBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.books.findIndex((book) => book.id === action.payload.id);
        if (index !== -1) {
          state.books[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.error("Failed to update book:", action.error.message);
      });
  },
});

export const { clearError } = bookSlice.actions;

export default bookSlice.reducer;
