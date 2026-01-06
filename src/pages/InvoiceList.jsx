import React, { useState, useEffect } from 'react';
import { Search, Eye, Download, Edit, Trash2, RefreshCw } from 'lucide-react';
import { invoiceService } from '../services/invoiceService';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchInvoices();
  }, []);

  // Auto-refresh when component mounts or when new invoice is created
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'invoiceCreated') {
        fetchInvoices();
        localStorage.removeItem('invoiceCreated');
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      console.log('Fetching invoices...');
      const data = await invoiceService.getAllInvoices();
      console.log('Fetched invoices:', data);
      
      // Handle different response formats
      const invoiceArray = Array.isArray(data) ? data : (data.invoices || data.data || []);
      setInvoices(invoiceArray);
      setError(null);
    } catch (err) {
      console.error('Error fetching invoices:', err);
      setError('Failed to fetch invoices: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const viewInvoice = async (id) => {
    try {
      const invoice = await invoiceService.getInvoiceById(id);
      const customerName = invoice.customer?.name || invoice.customerName || 'N/A';
      alert(`Invoice Details:\nID: ${invoice.id}\nCustomer: ${customerName}\nTotal: ₹${invoice.total}\nBalance: ₹${invoice.balance}`);
    } catch (err) {
      alert('Error fetching invoice: ' + err.message);
    }
  };

  const getStatusColor = (balance) => {
    if (balance === 0) return 'bg-green-100 text-green-800';
    if (balance > 0) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (balance) => {
    if (balance === 0) return 'Paid';
    if (balance > 0) return 'Pending';
    return 'Unknown';
  };

  const filteredInvoices = invoices.filter(invoice => {
    const customerName = invoice.customer?.name || invoice.customerName || '';
    const matchesSearch = customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.invoiceNumber?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || getStatusText(invoice.balance).toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-lg">Loading invoices...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Invoice List</h1>
        <div className="flex space-x-4">
          <button 
            onClick={fetchInvoices}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <div className="flex justify-between items-center">
            <span>{error}</span>
            <button 
              onClick={() => setError(null)}
              className="text-red-700 hover:text-red-900 font-bold"
            >
              ×
            </button>
          </div>
          <div className="mt-2 text-sm">
            <button 
              onClick={fetchInvoices}
              className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search invoices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                    {invoices.length === 0 ? 'No invoices found' : 'No invoices match your search'}
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-blue-600">
                      {invoice.invoiceNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {invoice.customer?.name || invoice.customerName || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {new Date(invoice.invoiceDate || invoice.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {invoice.items?.length || 0} items
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-semibold">
                      ₹{invoice.total?.toLocaleString() || '0'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(invoice.balance)}`}>
                        {getStatusText(invoice.balance)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => viewInvoice(invoice.id)}
                          className="text-blue-600 hover:text-blue-800" 
                          title="View"
                        >
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
                ))
              )}
            </tbody>
          </table>
        </div>

          <div className="px-6 py-4 border-t bg-gray-50">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                Showing {filteredInvoices.length} of {invoices.length} invoices
              </span>
              <div className="flex space-x-4 items-center">
                <span className="text-sm text-gray-500">Total: ₹{invoices.reduce((sum, inv) => sum + (inv.total || 0), 0).toLocaleString()}</span>
                <button 
                  onClick={() => console.log('Current invoices:', invoices)}
                  className="text-xs bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                  title="Debug: Log invoices to console"
                >
                  Debug
                </button>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default InvoiceList;