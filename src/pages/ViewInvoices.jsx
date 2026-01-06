import React, { useState, useEffect } from 'react';
import { Eye, Calendar, User, Phone, CreditCard, FileText } from 'lucide-react';
import { invoiceService } from '../services/invoiceService';

const ViewInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const data = await invoiceService.getAllInvoices();
      setInvoices(data);
    } catch (err) {
      setError('Failed to fetch invoices: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const viewInvoiceDetails = async (id) => {
    try {
      const invoice = await invoiceService.getInvoiceById(id);
      // You can implement a modal or navigate to a detail page
      console.log('Invoice details:', invoice);
      alert(`Invoice ID: ${invoice.id}\nCustomer: ${invoice.customerName}\nTotal: ₹${invoice.total}`);
    } catch (err) {
      alert('Error fetching invoice details: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-xl text-gray-600">Loading invoices...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">{error}</div>
          <button 
            onClick={fetchInvoices}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            All Invoices
          </h1>
          <p className="text-gray-600 text-lg">Manage and view your optical invoices</p>
        </div>

        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8">
          {invoices.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-24 h-24 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-600 mb-2">No Invoices Found</h3>
              <p className="text-gray-500">Create your first invoice to get started</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="px-6 py-4 text-left font-bold text-gray-700">Invoice #</th>
                    <th className="px-6 py-4 text-left font-bold text-gray-700">Customer</th>
                    <th className="px-6 py-4 text-left font-bold text-gray-700">Phone</th>
                    <th className="px-6 py-4 text-left font-bold text-gray-700">Date</th>
                    <th className="px-6 py-4 text-left font-bold text-gray-700">Total</th>
                    <th className="px-6 py-4 text-left font-bold text-gray-700">Balance</th>
                    <th className="px-6 py-4 text-left font-bold text-gray-700">Payment</th>
                    <th className="px-6 py-4 text-left font-bold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-mono font-semibold text-blue-600">
                          {invoice.invoiceNumber}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <User className="w-4 h-4 text-gray-400 mr-2" />
                          <div>
                            <div className="font-semibold text-gray-800">{invoice.customerName}</div>
                            {invoice.customerAge && (
                              <div className="text-sm text-gray-500">Age: {invoice.customerAge}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-gray-600">
                          <Phone className="w-4 h-4 mr-2" />
                          {invoice.customerPhone || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          {new Date(invoice.date).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-lg text-green-600">
                          ₹{invoice.total?.toFixed(2) || '0.00'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`font-semibold ${invoice.balance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          ₹{invoice.balance?.toFixed(2) || '0.00'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <CreditCard className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="text-sm bg-gray-100 px-2 py-1 rounded-full">
                            {invoice.paymentMode || 'Cash'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => viewInvoiceDetails(invoice.id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewInvoices;