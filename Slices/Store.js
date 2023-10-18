import { configureStore } from '@reduxjs/toolkit'
import userSlice from './SliceUsers'
import CartReducer from './CartReducer'
import dataSlice from './dataSlice';

export const store = configureStore({
  reducer: { user: userSlice,
    cart: CartReducer,
    data: dataSlice,
  },
 
});

