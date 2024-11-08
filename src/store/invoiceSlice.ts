import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Invoice } from '../hooks/useInvoices'

interface InvoiceState {
  invoices: Invoice[]
  isLoading: boolean
  error: string | null
  selectedInvoice: Invoice | null
  checkedInvoices: number[]
}

const initialState: InvoiceState = {
  invoices: [],
  isLoading: true,
  error: null,
  selectedInvoice: null,
  checkedInvoices: []
}

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    setInvoices: (state, action: PayloadAction<Invoice[]>) => {
      state.invoices = action.payload
      state.isLoading = false
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
      state.isLoading = false
    },
    setSelectedInvoice: (state, action: PayloadAction<Invoice | null>) => {
      state.selectedInvoice = action.payload
    },
    setCheckedInvoices: (state, action: PayloadAction<number[]>) => {
      state.checkedInvoices = action.payload
    },
    checkInvoice: (state, action: PayloadAction<number>) => {
      if (!state.checkedInvoices.includes(action.payload)) {
        state.checkedInvoices.push(action.payload)
      }
    },
    uncheckInvoice: (state, action: PayloadAction<number>) => {
      state.checkedInvoices = state.checkedInvoices.filter(id => id !== action.payload)
    },
    clearCheckedInvoices: (state) => {
      state.checkedInvoices = []
    }
  }
})

export const { 
  setInvoices, 
  setLoading, 
  setError, 
  setSelectedInvoice,
  setCheckedInvoices,
  checkInvoice,
  uncheckInvoice,
  clearCheckedInvoices
} = invoiceSlice.actions

export default invoiceSlice.reducer 