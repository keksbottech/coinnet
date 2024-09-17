import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface storeFavoriteData {
  favorites: any
}

const initialState: storeFavoriteData = {
  favorites: null,
}

export const storeFavoriteDataSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    getFavoriteData: (state, action: PayloadAction<any>) => {
        state.favorites = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { getFavoriteData } = storeFavoriteDataSlice.actions

export default storeFavoriteDataSlice.reducer