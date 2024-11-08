import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import type { Invoice } from '../../hooks/useInvoices'

const InvoiceDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [invoice, setInvoice] = useState<Invoice | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/invoices/${id}`)
        setInvoice(response.data)
        setLoading(false)
      } catch (err) {
        setError('An invoice with that number does not exist')
        setLoading(false)
        console.error('Error fetching invoice:', err)
      }
    }

    fetchInvoice()
  }, [id])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>
  if (!invoice) return <div>Invoice not found</div>

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