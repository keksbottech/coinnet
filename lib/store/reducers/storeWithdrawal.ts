import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface storeWithdrawaleData {
  withdrawal: any,
  withdrawMethod:any
}

const initialState: storeWithdrawaleData = {
  withdrawal: null,
  withdrawMethod:null
}

export const storeWithdrawaleDataSlice = createSlice({
  name: 'withdraw',
  initialState,
  reducers: {
    getWithdrawalData: (state, action: PayloadAction<any>) => {
        state.withdrawal = action.payload
    },
    getWithdrawalMethod: (state, action: PayloadAction<any>) => {
      state.withdrawMethod = action.payload
  }
  },
})

// Action creators are generated for each case reducer function
export const { getWithdrawalData, getWithdrawalMethod } = storeWithdrawaleDataSlice.actions

export default storeWithdrawaleDataSlice.reducer