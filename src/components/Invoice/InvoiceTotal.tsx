import { useSelector } from 'react-redux'
import type { RootState } from '../../store/store'

const InvoiceTotal = () => {
  const { invoices } = useSelector((state: RootState) => state.invoice)

  // Group invoices by due date and calculate totals
  const totals = invoices.reduce((acc, invoice) => {
    const amount = invoice.amount || 0
    if (!acc[invoice.due_date]) {
      acc[invoice.due_date] = amount
    } else {
      acc[invoice.due_date] += amount
    }
    return acc
  }, {} as Record<string, number>)

  // Sort by due date
  const sortedDates = Object.keys(totals).sort((a, b) => 
    new Date(a).getTime() - new Date(b).getTime()
  )

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Invoice Totals by Due Date</h1>
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Amount
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedDates.map((date) => (
              <tr key={date}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${totals[date].toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Grand Total
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                ${Object.values(totals).reduce((sum, amount) => sum + amount, 0).toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}

export default InvoiceTotal 