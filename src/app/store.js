import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/Cart/cartSlice';
import userReducer from '../features/Auth/userSlice';

const rootReducer = {
  cart: cartReducer,
  user: userReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
