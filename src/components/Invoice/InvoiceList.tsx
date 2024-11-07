import { useState } from 'react'
import { useInvoices } from '../../hooks/useInvoices'
import InvoiceModal from './InvoiceModal'
import type { Invoice } from '../../hooks/useInvoices'

const InvoiceList = () => {
  const { data: invoices, isLoading, error } = useInvoices()
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleRowClick = (invoice: Invoice) => {
    setSelectedInvoice(invoice)
    setIsModalOpen(true)
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading invoices</div>

  return (
    <>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-100">
            <tr>
              <th className="w-12 px-6 py-3 text-left">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Date</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Payee</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Description</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Due Date</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Amount</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invoices?.map((invoice) => (
              <tr 
                key={invoice.id} 
                onClick={() => handleRowClick(invoice)}
                className="hover:bg-gray-50 cursor-pointer"
              >
                <td className="px-6 py-4">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300"
                    onClick={(e) => e.stopPropagation()} 
                  />
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{invoice.date}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{invoice.vendor_name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{invoice.description}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{invoice.due_date}</td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {invoice.amount ? `$${invoice.amount?.toFixed(2)}` : ''}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    invoice.paid 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {invoice.paid ? 'Paid' : 'Open'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <InvoiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        invoice={selectedInvoice}
      />
    </>
  )
}

export default InvoiceList