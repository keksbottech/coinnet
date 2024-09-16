import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface storeToggleData {
  toggleBalanceShown: any
}

const initialState: storeToggleData = {
  toggleBalanceShown: false,
}

export const storeToggleDataSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    getToggleData: (state, action: PayloadAction<any>) => {
        state.toggleBalanceShown = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { getToggleData } = storeToggleDataSlice.actions

export default storeToggleDataSlice.reducer