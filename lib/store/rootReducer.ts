import { combineReducers } from 'redux'
import storeUserInfo from './reducers/storeUserInfo'
import storeUserSession from './reducers/storeUserSession'
import storeMarketData from './reducers/storeMarketData'
import storeFavorites from './reducers/storeFavorites'


export const rootReducer = combineReducers({
   user: storeUserInfo,
   session: storeUserSession,
   market: storeMarketData,
   favorite: storeFavorites
})