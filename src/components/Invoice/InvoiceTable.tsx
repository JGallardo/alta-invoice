interface Invoice {
    date: string
    payee: string
    description: string
    dueDate: string
    amount?: string
    status: 'Paid' | 'Open'
  }
  
  // TODO: remove mock data 
  const InvoiceTable = () => {
    const invoices: Invoice[] = [
      { date: '09/11/23', payee: 'Amazon', description: 'Rental', dueDate: '10/31/2023', status: 'Paid' },
      { date: '09/11/23', payee: 'Sysco', description: 'Rental', dueDate: '10/31/2023', amount: '$ 228.75', status: 'Open' },
      { date: '09/11/23', payee: 'US Foods', description: 'Rental', dueDate: '10/31/2023', status: 'Paid' },
      { date: '09/11/23', payee: 'Retal Inc', description: 'Rental', dueDate: '10/31/2023', status: 'Paid' },
      { date: '09/11/23', payee: 'Fiber Optics', description: 'Rental', dueDate: '10/31/2023', amount: '$ 150', status: 'Open' },
      { date: '09/11/23', payee: 'Ikea', description: 'Rental', dueDate: '10/31/2023', status: 'Paid' },
      { date: '09/11/23', payee: 'Costco', description: 'Rental', dueDate: '10/31/2023', status: 'Paid' },
      { date: '09/11/23', payee: 'Office Depot', description: 'Rental', dueDate: '10/31/2023', status: 'Paid' },
      { date: '09/11/23', payee: 'Sysco', description: 'Rental', dueDate: '10/31/2023', amount: '$ 350.00', status: 'Open' },
    ]
  
    return (
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
            {invoices.map((invoice, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{invoice.date}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{invoice.payee}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{invoice.description}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{invoice.dueDate}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{invoice.amount || ''}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    invoice.status === 'Paid' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {invoice.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  
  export default InvoiceTable