import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface storeWalletBalancesData {
  walletTotalBalance: any
}

const initialState: storeWalletBalancesData = {
  walletTotalBalance: null,
}

export const storeWalletBalancesSlice = createSlice({
  name: 'wallet balance',
  initialState,
  reducers: {
    getWalletTotalBalance: (state, action: PayloadAction<any>) => {
        state.walletTotalBalance = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { getWalletTotalBalance } = storeWalletBalancesSlice.actions

export default storeWalletBalancesSlice.reducer