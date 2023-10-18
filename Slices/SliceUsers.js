import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  uid:'',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  
  reducers: {
  setUser: (state,action) => {
     
      state.user = action.payload
      console.log(state.user);
    },
    // setUserInfo: (state,action) => {
     
    //   state.user = action.payload
    //   console.log()
    // },
  },
})


export const { setUser } = userSlice.actions

export default userSlice.reducer