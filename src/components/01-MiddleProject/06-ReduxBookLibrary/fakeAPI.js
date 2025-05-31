import initialBooks from './fakeAPIData.json';

const FAKE_DELAY = 2000;

// Create a mutable copy of the initial books data
let booksData = [...initialBooks];

const fakeAPI = {
  fetchBooks: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...booksData]); // Return a copy
      }, FAKE_DELAY);
    });
  },

  addBook: (newBook) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const bookToAdd = {
          ...newBook,
          id: booksData.length > 0 ? Math.max(...booksData.map((b) => b.id)) + 1 : 1,
        };
        booksData = [...booksData, bookToAdd]; // Create new array
        resolve(bookToAdd);
      }, FAKE_DELAY);
    });
  },

  removeBook: (bookId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const bookExists = booksData.find((b) => b.id === bookId);
        if (bookExists) {
          booksData = booksData.filter((b) => b.id !== bookId);
          resolve(bookId);
        } else {
          throw new Error(`Book with id ${bookId} not found`);
        }
      }, FAKE_DELAY);
    });
  },

  updateBook: (bookId, updatedBook) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const bookIndex = booksData.findIndex((b) => b.id === bookId);
        if (bookIndex !== -1) {
          const updatedBookData = {
            ...booksData[bookIndex],
            ...updatedBook,
            id: bookId, // Ensure ID doesn't change
          };
          booksData = [
            ...booksData.slice(0, bookIndex),
            updatedBookData,
            ...booksData.slice(bookIndex + 1),
          ];
          resolve(updatedBookData);
        } else {
          throw new Error(`Book with id ${bookId} not found`);
        }
      }, FAKE_DELAY);
    });
  },
};

export default fakeAPI;
