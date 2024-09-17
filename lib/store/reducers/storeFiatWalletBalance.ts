import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface storeWalletBalancesData {
  fiatWalletBalance: any
}

const initialState: storeWalletBalancesData = {
  fiatWalletBalance: null,
}

export const storeFiatWalletBalancesSlice = createSlice({
  name: 'fiat wallet balance',
  initialState,
  reducers: {
    getFiatWalletBalance: (state, action: PayloadAction<any>) => {
        state.fiatWalletBalance = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { getFiatWalletBalance } = storeFiatWalletBalancesSlice.actions

export default storeFiatWalletBalancesSlice.reducer