import storage from 'redux-persist/lib/storage'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { apiSlice } from '../features/characterApi'
import characterReducer from '../features/characterSlice'

const reducers = {
  characterSlice: characterReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
}

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: [apiSlice.reducerPath],
}

const persistedReducer = persistReducer(persistConfig, combineReducers(reducers))

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
  devTools: import.meta.env.MODE !== 'production',
})

let persistor = persistStore(store)

export { persistor, store }
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
