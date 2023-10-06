import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './SliceUsers'

export const store = configureStore({
  reducer: {user:userSlice},
})

