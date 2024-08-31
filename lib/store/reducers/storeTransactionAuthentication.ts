import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface storeTransactionAuthenticationData {
  transactionName: any
}

const initialState: storeTransactionAuthenticationData = {
  transactionName: null,
}

export const storeTransactionDataSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    getTransactionData: (state, action: PayloadAction<any>) => {
        state.transactionName = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { getTransactionData } = storeTransactionDataSlice.actions

export default storeTransactionDataSlice.reducer