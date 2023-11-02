import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userSlice from './SliceUsers'
import CartReducer from './CartReducer'
import dataSlice from './dataSlice';

const cartPersistConfig = {
  key: 'cart', 
  storage: AsyncStorage, 
  whitelist: ['cart'], 
};

const cartPersistedReducer = persistReducer(cartPersistConfig, CartReducer);

export const store = configureStore({
  reducer: { user: userSlice,
    cart:  cartPersistedReducer,
    data: dataSlice,
  },
 
});

export const persistor = persistStore(store);
