import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface storeTransactionDetails {
  transactionDetails: any,
  transactionFallback: any,
  transactionWebviewFallback: any
}

const initialState: storeTransactionDetails = {
  transactionDetails: null,
  transactionFallback: null,
  transactionWebviewFallback:null
}

export const storeTransactionDetailsSlice = createSlice({
  name: 'transaction details',
  initialState,
  reducers: {
    getTransactionDetails: (state, action: PayloadAction<any>) => {
        state.transactionDetails = action.payload
    },
    getTransactionFallback: (state, action: PayloadAction<any>) => {
      state.transactionFallback = action.payload
  },
  getTransactionWebviewFallback: (state, action: PayloadAction<any>) => {
    state.transactionWebviewFallback = action.payload
}
  },
})

// Action creators are generated for each case reducer function
export const { getTransactionDetails, getTransactionFallback, getTransactionWebviewFallback } = storeTransactionDetailsSlice.actions

export default storeTransactionDetailsSlice.reducer