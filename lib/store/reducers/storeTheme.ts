import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface storeThemeData {
  theme: any
}

const initialState: storeThemeData = {
  theme: false,
}

export const storeThemeDataSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    getThemeData: (state, action: PayloadAction<any>) => {
        state.theme = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { getThemeData } = storeThemeDataSlice.actions

export default storeThemeDataSlice.reducer