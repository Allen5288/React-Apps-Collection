import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import UpdateBook from "./components/UpdateBook";
import "./ReduxBookLibrary.scss";

const ReduxBookLibrary = () => {
  return (
    <Provider store={store}>
      <div id="redux-book-library">
        <h1>Redux Book Library</h1>
        <AddBook />
        <UpdateBook />
        <BookList />
      </div>
    </Provider>
  );
};

export default ReduxBookLibrary;
