import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface storeSelectedCoinData {
  selectedCoin: any
}

const initialState: storeSelectedCoinData = {
  selectedCoin: null,
}

export const storeSelectedCoinDataSlice = createSlice({
  name: 'selected coin',
  initialState,
  reducers: {
    getSelectedCoinData: (state, action: PayloadAction<any>) => {
        state.selectedCoin = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { getSelectedCoinData } = storeSelectedCoinDataSlice.actions

export default storeSelectedCoinDataSlice.reducer