import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface storeAuthenticationInfo {
  authenticationInfo: any,
  otpCode:any
}

const initialState: storeAuthenticationInfo = {
  authenticationInfo: null,
  otpCode:''
}

export const storeAuthenticationInfoSlice = createSlice({
  name: 'authentication info',
  initialState,
  reducers: {
    getauthenticationInfo: (state, action: PayloadAction<any>) => {
        state.authenticationInfo = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { getauthenticationInfo } = storeAuthenticationInfoSlice.actions

export default storeAuthenticationInfoSlice.reducer