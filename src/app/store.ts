import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import characterReducer from '../features/characterSlice'
import { apiSlice } from '../features/api'

export const store = configureStore({
  reducer: {
    characterSlice: characterReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware)
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
