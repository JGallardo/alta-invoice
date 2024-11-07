import { useQuery } from '@tanstack/react-query'
import { mockInvoices } from '../__mocks__/InvoiceData'

export interface Invoice {
  id: number
  date: string
  vendor_name: string
  amount: number | null
  due_date: string
  description: string
  paid: boolean
}

// TODO: Replace with actual API call when backend is ready
export const useInvoices = () => {
  return useQuery<Invoice[]>({
    queryKey: ['invoices'],
    queryFn: () => mockInvoices
  })
}