import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface storeOrdersData {
  orders: any,
  orderP2p:any,
  sellerId: any,
  selectedOrder:any
}

const initialState: storeOrdersData = {
  orders: [],
  orderP2p: null,
  sellerId: null,
  selectedOrder: null
}

export const storeOrdersDataSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    getOrdersData: (state, action: PayloadAction<any>) => {
        state.orders = action.payload
    },
    getOrderP2pData: (state, action: PayloadAction<any>) => {
      state.orderP2p = action.payload
  },
  getOrderSellerIdData: (state, action: PayloadAction<any>) => {
    state.sellerId = action.payload
},
getSelectedOrderData: (state, action: PayloadAction<any>) => {
  state.selectedOrder = action.payload
}
  }
})

// Action creators are generated for each case reducer function
export const { getOrdersData,getOrderP2pData,getOrderSellerIdData,getSelectedOrderData } = storeOrdersDataSlice.actions

export default storeOrdersDataSlice.reducer