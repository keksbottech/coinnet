import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface storeExchangeData {
  exchange: any
}

const initialState: storeExchangeData = {
  exchange: {},
}

export const storeExchangeDataSlice = createSlice({
  name: 'exchange',
  initialState,
  reducers: {
    getExchangeData: (state, action: PayloadAction<any>) => {
        state.exchange = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { getExchangeData } = storeExchangeDataSlice.actions

export default storeExchangeDataSlice.reducer