import type { Invoice } from '../../hooks/useInvoices'

interface InvoiceModalProps {
  isOpen: boolean
  onClose: () => void
  invoice: Invoice | null
}

const InvoiceModal = ({ isOpen, onClose, invoice }: InvoiceModalProps) => {
  if (!isOpen || !invoice) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Invoice Details</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-500">Invoice ID</label>
            <p className="font-medium">{invoice.id}</p>
          </div>

          <div>
            <label className="text-sm text-gray-500">Date</label>
            <p className="font-medium">{invoice.date}</p>
          </div>

          <div>
            <label className="text-sm text-gray-500">Vendor</label>
            <p className="font-medium">{invoice.vendor_name}</p>
          </div>
          
          <div>
            <label className="text-sm text-gray-500">Amount</label>
            <p className="font-medium">{invoice.amount ? `$${invoice.amount.toFixed(2)}` : '-'}</p>
          </div>
          
          <div>
            <label className="text-sm text-gray-500">Due Date</label>
            <p className="font-medium">{invoice.due_date}</p>
          </div>
          
          <div>
            <label className="text-sm text-gray-500">Description</label>
            <p className="font-medium">{invoice.description}</p>
          </div>
          
          <div>
            <label className="text-sm text-gray-500">Status</label>
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
              invoice.paid 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {invoice.paid ? 'Paid' : 'Open'}
            </span>
          </div>
        </div>
        
        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default InvoiceModal