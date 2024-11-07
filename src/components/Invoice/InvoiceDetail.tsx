import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../store/store'
import { useEffect } from 'react'
import { setInvoices, setError } from '../../store/invoiceSlice'
import { mockInvoices } from '../../__mocks__/InvoiceData'

// During development, set to True to use mockdata.
const inDevelopment = true

const InvoiceDetail = () => {
  const params = useParams<{ id: string }>()
  const numericId = parseInt(params.id || '', 10)
  const dispatch = useDispatch()
  const { invoices, isLoading } = useSelector((state: RootState) => state.invoice)
  
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        if (inDevelopment) {
          if (!mockInvoices || mockInvoices.length === 0) {
            dispatch(setError('You are in Development mode, but data is missing from the mockdata file'))
            return
          }
          dispatch(setInvoices(mockInvoices))
          return
        }
        dispatch(setError('Data could not be loaded. Please contact support.'))
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load invoices. Please try again later.'
        dispatch(setError(errorMessage))
      }
    }

    fetchInvoices()
  }, [dispatch])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-full">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    )
  }

  const invoice = invoices.find(inv => inv.id === numericId)

  if (!invoice) {
    return (
      <div className="flex flex-col items-center justify-center min-h-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Invoice Not Found</h1>
        <p className="text-xl text-gray-600 text-center">
          The requested invoice could not be found.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Invoice Details</h1>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-sm font-medium text-gray-500">Invoice ID</p>
          <p className="mt-1 text-sm text-gray-900">{invoice.id}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Date</p>
          <p className="mt-1 text-sm text-gray-900">{invoice.date}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Vendor</p>
          <p className="mt-1 text-sm text-gray-900">{invoice.vendor_name}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Description</p>
          <p className="mt-1 text-sm text-gray-900">{invoice.description}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Due Date</p>
          <p className="mt-1 text-sm text-gray-900">{invoice.due_date}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Amount</p>
          <p className="mt-1 text-sm text-gray-900">
            {invoice.amount ? `$${invoice.amount.toFixed(2)}` : '-'}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Status</p>
          <span className={`mt-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            invoice.paid 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {invoice.paid ? 'Paid' : 'Unpaid'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default InvoiceDetail 