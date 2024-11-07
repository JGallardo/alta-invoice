import { useState, useEffect } from 'react'
import { mockInvoices } from '../../__mocks__/InvoiceData'
import type { Invoice } from '../../hooks/useInvoices'
import InvoiceModal from './InvoiceModal'

// During development, set to True to use mockdata.
// Normally use an environment variable and this is set to false in production.
const inDevelopment = true

const InvoiceList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())
  const [headerChecked, setHeaderChecked] = useState(false)
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        if (inDevelopment) {
          if (!mockInvoices || mockInvoices.length === 0) {
            setError('You are in Development mode, but data is missing from the mockdata file')
            setIsLoading(false)
            return
          }
          setInvoices(mockInvoices)
          setIsLoading(false)
          return
        }
        setError('Data could not be loaded. Please contact support.')
        setIsLoading(false)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load invoices. Please try again later.'
        setError(errorMessage)
        setIsLoading(false)
      }
    }

    fetchInvoices()
  }, [])

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = invoices.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(invoices.length / itemsPerPage)

  // Handle header checkbox change
  const handleHeaderCheckboxChange = (checked: boolean) => {
    setHeaderChecked(checked)
    if (checked) {
      // Check all current items
      const newCheckedItems = new Set(checkedItems)
      currentItems.forEach(item => newCheckedItems.add(item.id))
      setCheckedItems(newCheckedItems)
    } else {
      // Uncheck all items
      setCheckedItems(new Set())
    }
  }

  // Handle individual checkbox change
  const handleItemCheckboxChange = (checked: boolean, invoiceId: string) => {
    const newCheckedItems = new Set(checkedItems)
    if (checked) {
      newCheckedItems.add(invoiceId)
    } else {
      newCheckedItems.delete(invoiceId)
    }
    setCheckedItems(newCheckedItems)
    
    // Update header checkbox state
    const allCurrentChecked = currentItems.every(item => newCheckedItems.has(item.id))
    setHeaderChecked(allCurrentChecked)
  }

  // Handle page changes
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    setHeaderChecked(false)
  }

  // Handle row click
  const handleRowClick = (invoice: Invoice) => {
    setSelectedInvoice(invoice)
    setIsModalOpen(true)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-full">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-full">
        <p className="text-xl text-gray-600">{error}</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-blue-50 border-b">
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                <input
                  type="checkbox"
                  checked={headerChecked}
                  onChange={(e) => handleHeaderCheckboxChange(e.target.checked)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">Vendor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">Due Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentItems.map((invoice) => (
              <tr 
                key={invoice.id}
                className="cursor-pointer hover:bg-gray-50"
              >
                <td 
                  className="px-6 py-4 whitespace-nowrap"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <input
                    type="checkbox"
                    checked={checkedItems.has(invoice.id)}
                    onChange={(e) => handleItemCheckboxChange(e.target.checked, invoice.id)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                </td>
                <td 
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  onClick={() => handleRowClick(invoice)}
                >{invoice.date}</td>
                <td 
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  onClick={() => handleRowClick(invoice)}
                >{invoice.vendor_name}</td>
                <td 
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  onClick={() => handleRowClick(invoice)}
                >{invoice.description}</td>
                <td 
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  onClick={() => handleRowClick(invoice)}
                >{invoice.due_date}</td>
                <td 
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  onClick={() => handleRowClick(invoice)}
                >
                  {invoice.amount ? `$${invoice.amount.toFixed(2)}` : '-'}
                </td>
                <td 
                  className="px-6 py-4 whitespace-nowrap"
                  onClick={() => handleRowClick(invoice)}
                >
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    invoice.paid 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {invoice.paid ? 'Paid' : 'Unpaid'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
        <div className="flex items-center">
          <p className="text-sm text-gray-700">
            Showing{' '}
            <span className="font-medium">{indexOfFirstItem + 1}</span>
            {' '}-{' '}
            <span className="font-medium">
              {Math.min(indexOfLastItem, invoices.length)}
            </span>
            {' '}of{' '}
            <span className="font-medium">{invoices.length}</span>
            {' '}results
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md ${
              currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 rounded-md ${
                currentPage === page
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md ${
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Next
          </button>
        </div>
      </div>

      <InvoiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        invoice={selectedInvoice}
      />
    </div>
  )
}

export default InvoiceList