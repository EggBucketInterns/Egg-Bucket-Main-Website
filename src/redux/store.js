import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web
import userReducer from "./userSlice";
import ordersReducer from "./orderSlice";
import productsReducer from "./productsSlice";
import localStorageReducer from "./localStorageSlice"; 

const persistConfig = {
  key: 'root', 
  storage, 
  // whitelist: ['products', 'localStorage'] // Optionally persist only specific slices
};

const persistedProductsReducer = persistReducer(persistConfig, productsReducer);
const persistedLocalStorageReducer = persistReducer(persistConfig, localStorageReducer);

export const store = configureStore({
  reducer: {
    user: userReducer,
    orders: ordersReducer,
    localStorage: persistedLocalStorageReducer, // Use the persisted reducer for localStorage
    products: persistedProductsReducer, // Use the persisted reducer for products
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);