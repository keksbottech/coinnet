import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface storeMessagesData {
  messages: any
}

const initialState: storeMessagesData = {
  messages: null,
}

export const storeMessagesDataSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    getMessagesData: (state, action: PayloadAction<any>) => {
        state.messages = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { getMessagesData } = storeMessagesDataSlice.actions

export default storeMessagesDataSlice.reducer