import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface storeTransactionDetails {
  transactionDetails: any
}

const initialState: storeTransactionDetails = {
  transactionDetails: null,
}

export const storeTransactionDetailsSlice = createSlice({
  name: 'escrow',
  initialState,
  reducers: {
    getTransactionDetails: (state, action: PayloadAction<any>) => {
        state.transactionDetails = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { getTransactionDetails } = storeTransactionDetailsSlice.actions

export default storeTransactionDetailsSlice.reducer