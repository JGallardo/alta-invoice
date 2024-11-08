import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { setInvoices } from '../../store/invoiceSlice'
import type { RootState } from '../../store/store'
import type { Invoice } from '../../hooks/useInvoices'
import InvoiceModal from './InvoiceModal'

const inDevelopment = false

const InvoiceList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const { invoices } = useSelector((state: RootState) => state.invoice)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [checkedIds, setCheckedIds] = useState<number[]>([])
  const itemsPerPage = 10
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [headerChecked, setHeaderChecked] = useState(false)

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        if (!inDevelopment) {
          const response = await axios.get(`http://localhost:3000/invoices?page=${currentPage}&limit=${itemsPerPage}`)
          dispatch(setInvoices(response.data.data))
          setTotalItems(response.data.meta.total)

          if (id) {
            try {
              const invoiceResponse = await axios.get(`http://localhost:3000/invoices/${id}`)
              setSelectedInvoice(invoiceResponse.data)
              setIsModalOpen(true)
            } catch {
              setIsErrorModalOpen(true)
              setTimeout(() => {
                setIsErrorModalOpen(false)
                navigate('/invoices')
              }, 3000)
            }
          }
        }
      } catch (err) {
        console.error('Failed to fetch invoices:', err)
      }
    }

    fetchInvoices()
  }, [dispatch, currentPage, id, navigate])

  const handleRowClick = (invoice: Invoice) => {
    navigate(`/invoices/${invoice.id}`)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    navigate('/invoices')
  }

  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage

  const handleHeaderCheckboxChange = (checked: boolean) => {
    setHeaderChecked(checked)
    if (checked) {
      const newCheckedIds = invoices.map(item => item.id)
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
    
    const allCurrentChecked = invoices.every(item => checkedIds.includes(item.id))
    setHeaderChecked(allCurrentChecked)
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
            {invoices.map((invoice) => (
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

      {/* Error Modal */}
      {isErrorModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Invoice Not Found</h3>
              <p className="text-sm text-gray-500">
                The requested invoice number does not exist. You will be redirected to the invoice list.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default InvoiceList