import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface storeMarketData {
  popularPairs: string | any,
  marketData: any
}

const initialState: storeMarketData = {
  popularPairs: 'BTC/USD',
  marketData: null
}

export const storeMarketDataSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {
    getPopularPairsData: (state, action: PayloadAction<any>) => {
        state.popularPairs = action.payload
    },
    getMarketData: (state, action: PayloadAction<any>) => {
      state.marketData = action.payload
  }
  }
})

// Action creators are generated for each case reducer function
export const { getPopularPairsData, getMarketData } = storeMarketDataSlice.actions

export default storeMarketDataSlice.reducer