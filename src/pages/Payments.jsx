import React, { useState } from 'react';
import { Plus, Search, CreditCard, Banknote, Smartphone } from 'lucide-react';

const Payments = () => {
  const [payments] = useState([
    { 
      id: 1, 
      invoiceNumber: 'INV-2024-001', 
      customerName: 'John Doe', 
      amount: 15000, 
      paymentMethod: 'Card', 
      date: '2024-01-15',
      status: 'Completed'
    },
    { 
      id: 2, 
      invoiceNumber: 'INV-2024-002', 
      customerName: 'Jane Smith', 
      amount: 4250, 
      paymentMethod: 'UPI', 
      date: '2024-01-14',
      status: 'Completed'
    },
    { 
      id: 3, 
      invoiceNumber: 'INV-2024-003', 
      customerName: 'Bob Johnson', 
      amount: 12000, 
      paymentMethod: 'Cash', 
      date: '2024-01-13',
      status: 'Pending'
    },
  ]);

  const getPaymentIcon = (method) => {
    switch (method) {
      case 'Card': return <CreditCard className="w-4 h-4" />;
      case 'Cash': return <Banknote className="w-4 h-4" />;
      case 'UPI': return <Smartphone className="w-4 h-4" />;
      default: return <CreditCard className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalPayments = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const completedPayments = payments.filter(p => p.status === 'Completed').length;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Payments</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Record Payment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="bg-green-500 p-3 rounded-full text-white mr-4">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Payments</p>
              <p className="text-2xl font-bold text-gray-800">₹{totalPayments.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="bg-blue-500 p-3 rounded-full text-white mr-4">
              <Banknote className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-800">{completedPayments}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="bg-yellow-500 p-3 rounded-full text-white mr-4">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-800">{payments.length - completedPayments}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search payments..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All Methods</option>
              <option value="card">Card</option>
              <option value="cash">Cash</option>
              <option value="upi">UPI</option>
            </select>
            <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-blue-600">
                    {payment.invoiceNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {payment.customerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-semibold">
                    ₹{payment.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getPaymentIcon(payment.paymentMethod)}
                      <span className="ml-2 text-gray-600">{payment.paymentMethod}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {payment.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(payment.status)}`}>
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payments;