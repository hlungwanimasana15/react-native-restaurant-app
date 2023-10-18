import { createSlice } from '@reduxjs/toolkit'
import { LogBox } from 'react-native'
import { auth } from '../firebase';

const initialState = {
  data: null,

}
const user = auth.currentUser
console.log(user);
export const dataSlice = createSlice({
  name: 'data',
  initialState,
  
  reducers: {
    setData: (state,action) => {
     
      state.data = action.payload
      console.log('7777777777777',state.data);
    },
  },
})


export const { setUserInfo } = dataSlice.actions

export default dataSlice.reducer