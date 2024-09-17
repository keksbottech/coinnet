import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface storeEscrowData {
  escrowId: any
}

const initialState: storeEscrowData = {
  escrowId: null,
}

export const storeEscrowDataSlice = createSlice({
  name: 'escrow',
  initialState,
  reducers: {
    getEscrowData: (state, action: PayloadAction<any>) => {
        state.escrowId = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { getEscrowData } = storeEscrowDataSlice.actions

export default storeEscrowDataSlice.reducer