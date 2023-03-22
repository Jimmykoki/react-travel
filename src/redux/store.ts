import languageReducer from './language/languageReducer';
import recommendProdutsReducer from './recommendProduts/recommendProdutsReducer';
import { actionLog } from './middlewares/actionLog';
import { productDetailSlice } from './productDetail/slice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { productSearchSlice } from './productSearch/slice';
import { userSlice } from './user/slice';
import { shoppingCartSlice } from './shoppingCart/slice';
import { orderSlice } from './order/slice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
//local storage
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'], // only user will be persisted
};

const rootReducer = combineReducers({
  language: languageReducer,
  recommendProduts: recommendProdutsReducer,
  productDetail: productDetailSlice.reducer,
  productSearch: productSearchSlice.reducer,
  user: userSlice.reducer,
  shoppingCart: shoppingCartSlice.reducer,
  order: orderSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = createStore(rootReducer, applyMiddleware(thunk, actionLog));

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(actionLog),
  devTools: true,
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// eslint-disable-next-line import/no-anonymous-default-export
export default { store, persistor };
