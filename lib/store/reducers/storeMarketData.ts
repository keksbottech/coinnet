import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface storeMarketData {
  popularPairs: string | any
}

const initialState: storeMarketData = {
  popularPairs: 'BTC/USD',
}

export const storeMarketDataSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {
    getMarketData: (state, action: PayloadAction<any>) => {
        state.popularPairs = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { getMarketData } = storeMarketDataSlice.actions

export default storeMarketDataSlice.reducer