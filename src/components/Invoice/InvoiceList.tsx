import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { setInvoices } from '../../store/invoiceSlice'
import type { Invoice } from '../../hooks/useInvoices'
import InvoiceModal from './InvoiceModal'
import api from '../../utils/axios'

const InvoiceList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const [currentPage, setCurrentPage] = useState(1)
  const [checkedIds, setCheckedIds] = useState<number[]>([])
  const itemsPerPage = 10
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [headerChecked, setHeaderChecked] = useState(false)

  // Query for invoice list
  const { data: invoiceData, isLoading } = useQuery({
    queryKey: ['invoices', currentPage],
    queryFn: async () => {
      const response = await api.get(`/invoices?page=${currentPage}&limit=${itemsPerPage}`)
      dispatch(setInvoices(response.data.data))
      return response.data
    }
  })

  // Query for single invoice
  useQuery({
    queryKey: ['invoice', id],
    queryFn: async () => {
      if (id) {
        const response = await api.get(`/invoices/${id}`)
        setSelectedInvoice(response.data)
        setIsModalOpen(true)
        return response.data
      }
    },
    enabled: !!id
  })

  const handleRowClick = (invoice: Invoice) => {
    navigate(`/invoices/${invoice.id}`)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    navigate('/invoices')
  }

  const handleHeaderCheckboxChange = (checked: boolean) => {
    setHeaderChecked(checked)
    if (checked) {
      const newCheckedIds = (invoices as Invoice[]).map(item => item.id)
      setCheckedIds(newCheckedIds)
    } else {
      setCheckedIds([])
    }
  }

  const handleItemCheckboxChange = (checked: boolean, invoiceId: number) => {
    setCheckedIds(prev => {
      if (checked) {
        return [...prev, invoiceId]
      } else {
        return prev.filter(id => id !== invoiceId)
      }
    })
    
    const allCurrentChecked = (invoices as Invoice[]).every(item => checkedIds.includes(item.id))
    setHeaderChecked(allCurrentChecked)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    )
  }

  const invoices = invoiceData?.data || []
  const totalItems = invoiceData?.meta?.total || 0
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage

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
            {(invoices as Invoice[]).map((invoice) => (
              <tr 
                key={invoice.id}
                className="cursor-pointer hover:bg-gray-50"
              >
                <td 
                  className="px-6 py-4 whitespace-nowrap"
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type="checkbox"
                    checked={checkedIds.includes(invoice.id)}
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
            {totalItems > 0 ? (
              <>
                Showing{' '}
                <span className="font-medium">{indexOfFirstItem + 1}</span>
                {' '}-{' '}
                <span className="font-medium">
                  {Math.min(indexOfLastItem, totalItems)}
                </span>
                {' '}of{' '}
                <span className="font-medium">{totalItems}</span>
                {' '}results
              </>
            ) : (
              'No results'
            )}
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
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
              onClick={() => setCurrentPage(page)}
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
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
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
        onClose={handleModalClose}
        invoice={selectedInvoice}
      />
    </div>
  )
}

export default InvoiceList