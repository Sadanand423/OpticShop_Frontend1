import React, { useState, useEffect } from 'react';
import { Search, Eye, Download, Edit, Trash2, RefreshCw } from 'lucide-react';
import { invoiceService } from '../services/invoiceService';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editInvoice, setEditInvoice] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewInvoiceData, setViewInvoiceData] = useState(null);

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
      
      // Handle different response formats and sort by ID descending (newest first)
      const invoiceArray = Array.isArray(data) ? data : (data.invoices || data.data || []);
      const sortedInvoices = invoiceArray.sort((a, b) => b.id - a.id);
      setInvoices(sortedInvoices);
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
      setViewInvoiceData(invoice);
      setShowViewModal(true);
    } catch (err) {
      alert('Error fetching invoice: ' + err.message);
    }
  };

  const deleteInvoice = async (id) => {
    if (!confirm('Are you sure you want to delete this invoice?')) return;
    
    try {
      await invoiceService.deleteInvoice(id);
      alert('Invoice deleted successfully!');
      fetchInvoices(); // Refresh list
    } catch (err) {
      alert('Error deleting invoice: ' + err.message);
    }
  };

  const editInvoiceHandler = (invoice) => {
    setEditInvoice({
      id: invoice.id,
      paymentMode: invoice.paymentMode || 'Cash',
      remarks: invoice.remarks || '',
      deliveryDate: invoice.deliveryDate || '',
      advance: invoice.advance || 0,
      balance: invoice.balance || 0
    });
    setShowEditModal(true);
  };

  const updateInvoice = async () => {
    try {
      // Calculate new balance when advance changes
      const updatedData = {
        ...editInvoice,
        balance: (viewInvoiceData?.total || 0) - editInvoice.advance
      };
      
      await invoiceService.updateInvoice(editInvoice.id, updatedData);
      alert('Invoice updated successfully!');
      setShowEditModal(false);
      fetchInvoices();
    } catch (err) {
      alert('Error updating invoice: ' + err.message);
    }
  };

  const printInvoiceFromView = (invoiceData) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice - ${invoiceData.invoiceNumber}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; font-size: 12px; }
            .header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #000; padding-bottom: 10px; }
            .shop-name { font-size: 24px; font-weight: bold; margin-bottom: 5px; }
            .shop-details { font-size: 10px; color: #666; }
            .invoice-info { display: flex; justify-content: space-between; margin-bottom: 15px; }
            .customer-info { margin-bottom: 15px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
            th, td { border: 1px solid #ddd; padding: 6px; text-align: left; font-size: 11px; }
            th { background-color: #f5f5f5; font-weight: bold; }
            .totals { text-align: right; margin-top: 10px; }
            .total-row { font-weight: bold; font-size: 14px; }
            .footer { margin-top: 20px; border-top: 1px solid #ddd; padding-top: 10px; font-size: 10px; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="shop-name">OPTICAL SHOP</div>
            <div class="shop-details">
              Address: 123 Main Street, City - 123456<br>
              Phone: +91 9876543210 | Email: info@opticalshop.com<br>
              GST No: 22AAAAA0000A1Z5
            </div>
          </div>
          
          <div class="invoice-info">
            <div>
              <strong>Invoice No:</strong> ${invoiceData.invoiceNumber}<br>
              <strong>Date:</strong> ${new Date(invoiceData.invoiceDate).toLocaleDateString()}<br>
              <strong>Payment Mode:</strong> ${invoiceData.paymentMode}
            </div>
            <div>
              ${invoiceData.deliveryDate ? `<strong>Delivery Date:</strong> ${new Date(invoiceData.deliveryDate).toLocaleDateString()}<br>` : ''}
            </div>
          </div>
          
          <div class="customer-info">
            <strong>Bill To:</strong><br>
            <strong>Name:</strong> ${invoiceData.customer?.name || 'N/A'}<br>
            <strong>Phone:</strong> ${invoiceData.customer?.phone || 'N/A'}<br>
            <strong>Address:</strong> ${invoiceData.customer?.address || 'N/A'}
          </div>
          
          <table>
            <thead>
              <tr>
                <th>S.No</th><th>Frame</th><th>Lens</th><th>Frame Price</th><th>Lens Price</th><th>Qty</th><th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${invoiceData.items?.map((item, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${item.frame || '-'}</td>
                  <td>${item.lens || '-'}</td>
                  <td>₹${item.framePrice}</td>
                  <td>₹${item.lensPrice}</td>
                  <td>${item.quantity}</td>
                  <td>₹${item.total}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <div class="totals">
            <div>Subtotal: ₹${invoiceData.subtotal}</div>
            <div>Discount (${invoiceData.discountPercent}%): -₹${invoiceData.discountAmount}</div>
            <div>Tax (${invoiceData.taxPercent}%): ₹${invoiceData.taxAmount}</div>
            <div class="total-row">Total: ₹${invoiceData.total}</div>
            <div>Advance: ₹${invoiceData.advance}</div>
            <div class="total-row">Balance: ₹${invoiceData.balance}</div>
          </div>
          
          ${invoiceData.remarks ? `<div style="margin-top: 15px;"><strong>Remarks:</strong> ${invoiceData.remarks}</div>` : ''}
          
          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = function() {
                window.close();
              }
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const downloadInvoice = async (invoice) => {
    try {
      const fullInvoice = await invoiceService.getInvoiceById(invoice.id);
      printInvoiceFromView(fullInvoice);
    } catch (err) {
      alert('Error downloading invoice: ' + err.message);
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
                        <button 
                          onClick={() => downloadInvoice(invoice)}
                          className="text-green-600 hover:text-green-800" 
                          title="Download"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => editInvoiceHandler(invoice)}
                          className="text-yellow-600 hover:text-yellow-800" 
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => deleteInvoice(invoice.id)}
                          className="text-red-600 hover:text-red-800" 
                          title="Delete"
                        >
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

      {/* View Modal */}
      {showViewModal && viewInvoiceData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-2/3 max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Invoice Details</h2>
              <div className="flex space-x-2">
                <button 
                  onClick={() => printInvoiceFromView(viewInvoiceData)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Print Invoice
                </button>
                <button onClick={() => setShowViewModal(false)} className="text-gray-500 hover:text-gray-700 text-2xl">
                  ×
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Invoice Info</h3>
                <p><strong>Number:</strong> {viewInvoiceData.invoiceNumber}</p>
                <p><strong>Date:</strong> {new Date(viewInvoiceData.invoiceDate).toLocaleDateString()}</p>
                <p><strong>Payment Mode:</strong> {viewInvoiceData.paymentMode}</p>
                <p><strong>Delivery Date:</strong> {viewInvoiceData.deliveryDate ? new Date(viewInvoiceData.deliveryDate).toLocaleDateString() : 'N/A'}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Customer Info</h3>
                <p><strong>Name:</strong> {viewInvoiceData.customer?.name || 'N/A'}</p>
                <p><strong>Phone:</strong> {viewInvoiceData.customer?.phone || 'N/A'}</p>
                <p><strong>Address:</strong> {viewInvoiceData.customer?.address || 'N/A'}</p>
                <p><strong>Age:</strong> {viewInvoiceData.customer?.age || 'N/A'}</p>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Items</h3>
              <table className="w-full border">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border p-2">Frame</th>
                    <th className="border p-2">Lens</th>
                    <th className="border p-2">Frame Price</th>
                    <th className="border p-2">Lens Price</th>
                    <th className="border p-2">Qty</th>
                    <th className="border p-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {viewInvoiceData.items?.map((item, index) => (
                    <tr key={index}>
                      <td className="border p-2">{item.frame || 'N/A'}</td>
                      <td className="border p-2">{item.lens || 'N/A'}</td>
                      <td className="border p-2">₹{item.framePrice}</td>
                      <td className="border p-2">₹{item.lensPrice}</td>
                      <td className="border p-2">{item.quantity}</td>
                      <td className="border p-2">₹{item.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Financial Summary</h3>
                <p><strong>Subtotal:</strong> ₹{viewInvoiceData.subtotal}</p>
                <p><strong>Discount:</strong> {viewInvoiceData.discountPercent}% (-₹{viewInvoiceData.discountAmount})</p>
                <p><strong>Tax:</strong> {viewInvoiceData.taxPercent}% (₹{viewInvoiceData.taxAmount})</p>
                <p><strong>Total:</strong> ₹{viewInvoiceData.total}</p>
                <p><strong>Advance:</strong> ₹{viewInvoiceData.advance}</p>
                <p><strong>Balance:</strong> ₹{viewInvoiceData.balance}</p>
              </div>
              
              {viewInvoiceData.remarks && (
                <div>
                  <h3 className="font-semibold mb-2">Remarks</h3>
                  <p>{viewInvoiceData.remarks}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Invoice</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Payment Mode</label>
                <select
                  value={editInvoice.paymentMode}
                  onChange={(e) => setEditInvoice(prev => ({...prev, paymentMode: e.target.value}))}
                  className="w-full p-2 border rounded"
                >
                  <option value="Cash">Cash</option>
                  <option value="Card">Card</option>
                  <option value="UPI">UPI</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Advance</label>
                <input
                  type="number"
                  value={editInvoice.advance}
                  onChange={(e) => setEditInvoice(prev => ({...prev, advance: parseFloat(e.target.value) || 0}))}
                  className="w-full p-2 border rounded"
                />
                <small className="text-gray-500">
                  Balance will be: ₹{((viewInvoiceData?.total || 0) - editInvoice.advance).toFixed(2)}
                </small>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Delivery Date</label>
                <input
                  type="date"
                  value={editInvoice.deliveryDate}
                  onChange={(e) => setEditInvoice(prev => ({...prev, deliveryDate: e.target.value}))}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Remarks</label>
                <textarea
                  value={editInvoice.remarks}
                  onChange={(e) => setEditInvoice(prev => ({...prev, remarks: e.target.value}))}
                  className="w-full p-2 border rounded"
                  rows="3"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button 
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 border rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={updateInvoice}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceList;