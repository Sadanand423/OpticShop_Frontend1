import React, { useState } from 'react';
import { Search, Eye, Download, Edit, Trash2 } from 'lucide-react';

const InvoiceList = () => {
  const [invoices] = useState([
    { 
      id: 1, 
      invoiceNumber: 'INV-2024-001', 
      customerName: 'John Doe', 
      date: '2024-01-15', 
      amount: 15000, 
      status: 'Paid',
      items: 2
    },
    { 
      id: 2, 
      invoiceNumber: 'INV-2024-002', 
      customerName: 'Jane Smith', 
      date: '2024-01-14', 
      amount: 8500, 
      status: 'Pending',
      items: 1
    },
    { 
      id: 3, 
      invoiceNumber: 'INV-2024-003', 
      customerName: 'Bob Johnson', 
      date: '2024-01-13', 
      amount: 12000, 
      status: 'Overdue',
      items: 3
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Invoice List</h1>
        <div className="flex space-x-4">
          <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search invoices..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <input
              type="date"
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-blue-600">
                    {invoice.invoiceNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {invoice.customerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {invoice.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {invoice.items} items
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-semibold">
                    ₹{invoice.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800" title="View">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-800" title="Download">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="text-yellow-600 hover:text-yellow-800" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t bg-gray-50">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Showing 1-3 of 3 invoices</span>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border rounded hover:bg-gray-100">Previous</button>
              <button className="px-3 py-1 bg-blue-500 text-white rounded">1</button>
              <button className="px-3 py-1 border rounded hover:bg-gray-100">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceList;