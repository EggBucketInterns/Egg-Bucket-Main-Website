import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import ordersReducer from "./orderSlice";
import productsReducer from "./productsSlice"
import localStorageReducer from "./localStorageSlice"; // Import the new slice

export const store = configureStore({
  reducer: {
    user: userReducer,
    orders: ordersReducer,
    localStorage: localStorageReducer, // Add the new reducer
    products: productsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
