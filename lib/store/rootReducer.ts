import { combineReducers } from 'redux'
import storeUserInfo from './reducers/storeUserInfo'
import storeUserSession from './reducers/storeUserSession'
import storeMarketData from './reducers/storeMarketData'
import storeFavorites from './reducers/storeFavorites'
import storePaymentUrl from './reducers/storePaymentUrl'
import storeSelectedCoin from './reducers/storeSelectedCoin'
import storeWalletBalances from './reducers/storeWalletBalances'
import storeOrders from './reducers/storeOrders'
import storeExchangeData from './reducers/storeExchangeData'
import storeAuthenticationInfo from './reducers/storeAuthenticationInfo'
import storeWithdrawal from './reducers/storeWithdrawal'
import storeTransactionAuthentication from './reducers/storeTransactionAuthentication'
import storeMessages from './reducers/storeMessages'
import storeEscrowData from './reducers/storeEscrowData'


export const rootReducer = combineReducers({
   user: storeUserInfo,
   session: storeUserSession,
   market: storeMarketData,
   favorite: storeFavorites,
   paymentUrl: storePaymentUrl,
   selectedCoin: storeSelectedCoin,
   wallet: storeWalletBalances,
   orders: storeOrders,
   exchange: storeExchangeData,
   authenticationInfo: storeAuthenticationInfo,
   withdrawal: storeWithdrawal,
   transaction: storeTransactionAuthentication,
   messages: storeMessages,
   escrow: storeEscrowData
})