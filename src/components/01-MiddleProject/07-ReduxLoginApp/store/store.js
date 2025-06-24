import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./useSlice";

const store = configureStore({
  reducer: { userRole: userReducer }, // userRole is the key for the user slice
});

export default store;
