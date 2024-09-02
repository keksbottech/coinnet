import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface storeTransactionHistoryData {
  transactionHistory: any
}

const initialState: storeTransactionHistoryData = {
  transactionHistory: null,
}

export const storeTransactionHistorySlice = createSlice({
  name: 'transaction History',
  initialState,
  reducers: {
    getTransactionHistory: (state, action: PayloadAction<any>) => {
        state.transactionHistory = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { getTransactionHistory } = storeTransactionHistorySlice.actions

export default storeTransactionHistorySlice.reducer