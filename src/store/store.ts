import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import invoiceReducer from './invoiceSlice'

export const store = configureStore({
  reducer: {
    invoice: invoiceReducer,
    auth: authReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch