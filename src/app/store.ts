import { configureStore } from '@reduxjs/toolkit'
import characterReducer from '../features/characterSlice'

export const store = configureStore({
  reducer: {
    characterSlice: characterReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
