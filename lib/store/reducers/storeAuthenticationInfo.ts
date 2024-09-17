import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface storeAuthenticationInfo {
  authenticationInfo: any,
  otpCode:any,
  bvnImage: any
}

const initialState: storeAuthenticationInfo = {
  authenticationInfo: null,
  otpCode:'',
  bvnImage:''
}

export const storeAuthenticationInfoSlice = createSlice({
  name: 'authentication info',
  initialState,
  reducers: {
    getauthenticationInfo: (state, action: PayloadAction<any>) => {
        state.authenticationInfo = action.payload
    },
    getaBvnImage: (state, action: PayloadAction<any>) => {
      state.bvnImage = action.payload
  }
  }
})

// Action creators are generated for each case reducer function
export const { getauthenticationInfo, getaBvnImage } = storeAuthenticationInfoSlice.actions

export default storeAuthenticationInfoSlice.reducer