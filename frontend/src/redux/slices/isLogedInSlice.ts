import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface isLogedInState {
  value: boolean
}

const initialState: isLogedInState = {
  value: false,
}

export const isLogedInSlice = createSlice({
  name: 'isLogedIn',
  initialState,
  reducers: {
    setLogIn: (state) => {
      state.value = true
    },
    setLogOut:(state)=>{
        state.value = false
    }
  },
})

// Action creators are generated for each case reducer function
export const {setLogIn,setLogOut } = isLogedInSlice.actions

export default isLogedInSlice.reducer