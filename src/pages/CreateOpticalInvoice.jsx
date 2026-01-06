import React, { useState, useEffect } from 'react';
import { Plus, Minus, Save, Printer, Calculator, Eye, Calendar, User, Package2, Sparkles } from 'lucide-react';
import { invoiceService } from '../services/invoiceService';

const CreateOpticalInvoice = () => {
  const [invoice, setInvoice] = useState({
    customerName: '',
    customerPhone: '',
    customerAddress: '',
    customerAge: '',
    prescription: {
      rightEye: { sphere: '', cylinder: '', axis: '', add: '' },
      leftEye: { sphere: '', cylinder: '', axis: '', add: '' },
      pd: '',
      doctorName: '',
      prescriptionDate: ''
    },
    items: [{ 
      frame: '', 
      framePrice: 0, 
      lens: '', 
      lensPrice: 0, 
      quantity: 1,
      total: 0,
      customFrame: '',
      customLens: ''
    }],
    discount: 0,
    tax: 18,
    includeTax: true,
    advance: 0,
    deliveryDate: '',
    remarks: '',
    paymentMode: 'Cash'
  });

  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
useEffect(() => {
  const token = localStorage.getItem("token");
  console.log("JWT TOKEN FROM STORAGE 👉", token);

  if (!token) {
    console.warn("⚠️ No token found! User not authenticated");
  }
}, []);

  
  useEffect(() => {
    const today = new Date();
    const invoiceNum = `INV-${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}-${String(Date.now()).slice(-4)}`;
    setInvoiceNumber(invoiceNum);
    setCurrentDate(today.toISOString().split('T')[0]);
  }, []);

  useEffect(() => {
    setIsCalculating(true);
    const timer = setTimeout(() => setIsCalculating(false), 300);
    return () => clearTimeout(timer);
  }, [invoice.items, invoice.discount, invoice.tax, invoice.includeTax, invoice.advance]);

  const addItem = () => {
    setInvoice(prev => ({
      ...prev,
      items: [...prev.items, { 
        frame: '', 
        framePrice: 0, 
        lens: '', 
        lensPrice: 0, 
        quantity: 1,
        total: 0,
        customFrame: '',
        customLens: ''
      }]
    }));
  };

  const removeItem = (index) => {
    setInvoice(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const updateItem = (index, field, value) => {
    setInvoice(prev => {
      const newItems = [...prev.items];
      newItems[index] = { ...newItems[index], [field]: value };
      if (field === 'framePrice' || field === 'lensPrice' || field === 'quantity') {
        const framePrice = parseFloat(newItems[index].framePrice) || 0;
        const lensPrice = parseFloat(newItems[index].lensPrice) || 0;
        const quantity = parseInt(newItems[index].quantity) || 1;
        newItems[index].total = (framePrice + lensPrice) * quantity;
      }
      return { ...prev, items: newItems };
    });
  };

  const updatePrescription = (eye, field, value) => {
    setInvoice(prev => ({
      ...prev,
      prescription: {
        ...prev.prescription,
        [eye]: { ...prev.prescription[eye], [field]: value }
      }
    }));
  };

  const saveInvoice = async () => {
    if (!invoice.customerName || invoice.items.length === 0) {
      alert('Please fill in customer name and add at least one item');
      return;
    }

    try {
      const invoiceData = {
  invoiceNumber,
  paymentMode: invoice.paymentMode,
  remarks: invoice.remarks,
  deliveryDate: invoice.deliveryDate || null,

  discount: invoice.discount,
  tax: invoice.tax,
  advance: invoice.advance,

  customer: {
    name: invoice.customerName,
    phone: invoice.customerPhone,
    address: invoice.customerAddress,
    age: invoice.customerAge ? Number(invoice.customerAge) : null
  },

  prescription: invoice.prescription,

  items: invoice.items.map(item => ({
    frame: item.frame === 'manual' ? item.customFrame : item.frame,
    framePrice: item.framePrice,
    lens: item.lens === 'manual' ? item.customLens : item.lens,
    lensPrice: item.lensPrice,
    quantity: item.quantity,
    total: item.total
  }))
};


      const savedInvoice = await invoiceService.createInvoice(invoiceData);
      
      // Trigger refresh in InvoiceList
      localStorage.setItem('invoiceCreated', 'true');
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'invoiceCreated',
        newValue: 'true'
      }));
      
      alert(`Invoice saved successfully! ID: ${savedInvoice.id}`);
      return savedInvoice;
    } catch (error) {
      alert('Error saving invoice: ' + error.message);
      throw error;
    }
  };

  const generateInvoice = async () => {
    if (!invoice.customerName || invoice.items.length === 0 || (!invoice.items[0].frame && !invoice.items[0].lens)) {
      alert('Please fill in customer name and add at least one frame or lens');
      return;
    }

    try {
      // Save to backend first
      const savedInvoice = await saveInvoice();
      
      const invoiceData = {
        ...invoice,
        invoiceNumber,
        date: new Date().toLocaleDateString(),
        subtotal,
        discountAmount,
        taxAmount,
        total,
        id: savedInvoice.id
      };
    
      // Generate print view
      printInvoice(invoiceData);
    } catch (error) {
      console.error('Error generating invoice:', error);
    }
  };

  const printInvoice = (invoiceData) => {
    
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
            .prescription { margin-bottom: 15px; border: 1px solid #ddd; padding: 10px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
            th, td { border: 1px solid #ddd; padding: 6px; text-align: left; font-size: 11px; }
            th { background-color: #f5f5f5; font-weight: bold; }
            .totals { text-align: right; margin-top: 10px; }
            .total-row { font-weight: bold; font-size: 14px; }
            .footer { margin-top: 20px; border-top: 1px solid #ddd; padding-top: 10px; font-size: 10px; }
            .signature { display: flex; justify-content: space-between; margin-top: 30px; }
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
              <strong>Date:</strong> ${invoiceData.date}<br>
              <strong>Payment Mode:</strong> ${invoiceData.paymentMode}
            </div>
            <div>
              ${invoiceData.deliveryDate ? `<strong>Delivery Date:</strong> ${new Date(invoiceData.deliveryDate).toLocaleDateString()}<br>` : ''}
            </div>
          </div>
          
          <div class="customer-info">
            <strong>Bill To:</strong><br>
            <strong>Name:</strong> ${invoiceData.customerName}<br>
            <strong>Phone:</strong> ${invoiceData.customerPhone}<br>
            ${invoiceData.customerAge ? `<strong>Age:</strong> ${invoiceData.customerAge}<br>` : ''}
            <strong>Address:</strong> ${invoiceData.customerAddress}
          </div>
          
          ${invoiceData.prescription.doctorName ? `
          <div class="prescription">
            <strong>Prescription Details:</strong><br>
            <strong>Doctor:</strong> ${invoiceData.prescription.doctorName} | 
            <strong>Date:</strong> ${invoiceData.prescription.prescriptionDate ? new Date(invoiceData.prescription.prescriptionDate).toLocaleDateString() : ''}<br>
            <table style="margin-top: 5px;">
              <tr>
                <th>Eye</th><th>SPH</th><th>CYL</th><th>AXIS</th><th>ADD</th>
              </tr>
              <tr>
                <td>Right (OD)</td>
                <td>${invoiceData.prescription.rightEye.sphere}</td>
                <td>${invoiceData.prescription.rightEye.cylinder}</td>
                <td>${invoiceData.prescription.rightEye.axis}</td>
                <td>${invoiceData.prescription.rightEye.add}</td>
              </tr>
              <tr>
                <td>Left (OS)</td>
                <td>${invoiceData.prescription.leftEye.sphere}</td>
                <td>${invoiceData.prescription.leftEye.cylinder}</td>
                <td>${invoiceData.prescription.leftEye.axis}</td>
                <td>${invoiceData.prescription.leftEye.add}</td>
              </tr>
            </table>
            ${invoiceData.prescription.pd ? `<strong>PD:</strong> ${invoiceData.prescription.pd}` : ''}
          </div>
          ` : ''}
          
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Description</th>
                <th>Frame</th>
                <th>Lens</th>
                <th>Qty</th>
                <th>Rate</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              ${invoiceData.items.map((item, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${item.description || '-'}</td>
                  <td>${item.frame === 'manual' ? (item.customFrame || 'Custom Frame') : (item.frame || '-')}</td>
                  <td>${item.lens === 'manual' ? (item.customLens || 'Custom Lens') : (item.lens || '-')}</td>
                  <td>${item.quantity}</td>
                  <td>₹${(item.framePrice + item.lensPrice).toFixed(2)}</td>
                  <td>₹${item.total.toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <div class="totals">
            <div>Subtotal: ₹${invoiceData.subtotal.toFixed(2)}</div>
            <div>Discount (${invoiceData.discount}%): -₹${invoiceData.discountAmount.toFixed(2)}</div>
            ${invoiceData.includeTax ? `<div>GST (${invoiceData.tax}%): ₹${invoiceData.taxAmount.toFixed(2)}</div>` : ''}
            <div class="total-row">Total: ₹${invoiceData.total.toFixed(2)}</div>
            <div>Advance Paid: ₹${invoiceData.advance.toFixed(2)}</div>
            <div class="total-row" style="color: red;">Balance Due: ₹${(invoiceData.total - invoiceData.advance).toFixed(2)}</div>
          </div>
          
          ${invoiceData.remarks ? `
          <div style="margin-top: 15px;">
            <strong>Remarks:</strong> ${invoiceData.remarks}
          </div>
          ` : ''}
          
          <div class="footer">
            <div>Terms & Conditions:</div>
            <div>1. Goods once sold will not be taken back.</div>
            <div>2. Warranty as per company policy.</div>
            <div>3. Payment due within 30 days.</div>
          </div>
          
          <div class="signature">
            <div>Customer Signature</div>
            <div>Authorized Signatory</div>
          </div>
          
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

  const subtotal = invoice.items.reduce((sum, item) => sum + item.total, 0);
  const discountAmount = (subtotal * invoice.discount) / 100;
  const taxAmount = invoice.includeTax ? ((subtotal - discountAmount) * invoice.tax) / 100 : 0;
  const total = subtotal - discountAmount + taxAmount;
  const balance = total - invoice.advance;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Animated Header */}
        <div className="text-center mb-8 animate-fadeInUp">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl mb-4 shadow-2xl transform hover:scale-110 transition-transform duration-300">
            <Sparkles className="w-10 h-10 text-white animate-pulse" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Create Optical Invoice
          </h1>
          <p className="text-gray-600 text-lg">Generate professional invoices with modern design</p>
        </div>

        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 animate-slideInUp">
          {/* Invoice Header */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <User className="w-7 h-7 mr-3" />
                  Customer Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Customer Name *"
                    value={invoice.customerName}
                    onChange={(e) => setInvoice(prev => ({ ...prev, customerName: e.target.value }))}
                    className="w-full p-4 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all transform focus:scale-105"
                  />
                  <input
                    type="text"
                    placeholder="Phone Number"
                    value={invoice.customerPhone}
                    onChange={(e) => setInvoice(prev => ({ ...prev, customerPhone: e.target.value }))}
                    className="w-full p-4 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all transform focus:scale-105"
                  />
                </div>
                <div className="grid grid-cols-4 gap-4 mt-4">
                  <input
                    type="number"
                    placeholder="Age"
                    value={invoice.customerAge}
                    onChange={(e) => setInvoice(prev => ({ ...prev, customerAge: e.target.value }))}
                    className="w-full p-4 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all transform focus:scale-105"
                  />
                  <textarea
                    placeholder="Customer Address"
                    value={invoice.customerAddress}
                    onChange={(e) => setInvoice(prev => ({ ...prev, customerAddress: e.target.value }))}
                    className="col-span-3 w-full p-4 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all transform focus:scale-105"
                    rows="2"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200 shadow-lg">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                  <Calendar className="w-6 h-6 mr-2 text-blue-600" />
                  Invoice Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Invoice Number</label>
                    <input
                      type="text"
                      value={invoiceNumber}
                      readOnly
                      className="w-full p-3 bg-blue-50 border-2 border-blue-200 rounded-xl text-blue-800 font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Date</label>
                    <input
                      type="date"
                      value={currentDate}
                      onChange={(e) => setCurrentDate(e.target.value)}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Payment Mode</label>
                    <select
                      value={invoice.paymentMode}
                      onChange={(e) => setInvoice(prev => ({ ...prev, paymentMode: e.target.value }))}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="Cash">💵 Cash</option>
                      <option value="Card">💳 Card</option>
                      <option value="UPI">📱 UPI</option>
                      <option value="Cheque">📄 Cheque</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Delivery Date</label>
                    <input
                      type="date"
                      value={invoice.deliveryDate}
                      onChange={(e) => setInvoice(prev => ({ ...prev, deliveryDate: e.target.value }))}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Items Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                <Package2 className="w-8 h-8 mr-3 text-blue-600" />
                Items & Services
              </h2>
              <button
                onClick={addItem}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl hover:shadow-2xl transition-all duration-300 flex items-center space-x-3 transform hover:scale-105 hover:-translate-y-1"
              >
                <Plus className="w-6 h-6" />
                <span className="font-semibold">Add Item</span>
              </button>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="px-4 py-4 text-left font-bold text-gray-700">Frame</th>
                      <th className="px-4 py-4 text-left font-bold text-gray-700">Frame Price</th>
                      <th className="px-4 py-4 text-left font-bold text-gray-700">Lens</th>
                      <th className="px-4 py-4 text-left font-bold text-gray-700">Lens Price</th>
                      <th className="px-4 py-4 text-left font-bold text-gray-700">Qty</th>
                      <th className="px-4 py-4 text-left font-bold text-gray-700">Total</th>
                      <th className="px-4 py-4 text-left font-bold text-gray-700">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.items.map((item, index) => (
                      <tr key={index} className="border-b border-gray-200 hover:bg-white/70 transition-all duration-200">
                        <td className="px-4 py-4">
                          {item.frame === 'manual' ? (
                            <input
                              type="text"
                              placeholder="Enter frame name"
                              value={item.customFrame || ''}
                              onChange={(e) => updateItem(index, 'customFrame', e.target.value)}
                              className="w-full p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                          ) : (
                            <select
                              value={item.frame}
                              onChange={(e) => {
                                updateItem(index, 'frame', e.target.value);
                                if (e.target.value !== 'manual') {
                                  updateItem(index, 'customFrame', '');
                                }
                              }}
                              className="w-full p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            >
                              <option value="">Select Frame</option>
                              <option value="Ray-Ban Aviator">Ray-Ban Aviator</option>
                              <option value="Oakley Sports">Oakley Sports</option>
                              <option value="Classic Frame">Classic Frame</option>
                              <option value="Metal Frame">Metal Frame</option>
                              <option value="Plastic Frame">Plastic Frame</option>
                              <option value="manual">✏️ Manual Entry</option>
                            </select>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          <input
                            type="number"
                            value={item.framePrice}
                            onChange={(e) => updateItem(index, 'framePrice', parseFloat(e.target.value) || 0)}
                            className="w-28 p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          />
                        </td>
                        <td className="px-4 py-4">
                          {item.lens === 'manual' ? (
                            <input
                              type="text"
                              placeholder="Enter lens type"
                              value={item.customLens || ''}
                              onChange={(e) => updateItem(index, 'customLens', e.target.value)}
                              className="w-full p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                          ) : (
                            <select
                              value={item.lens}
                              onChange={(e) => {
                                updateItem(index, 'lens', e.target.value);
                                if (e.target.value !== 'manual') {
                                  updateItem(index, 'customLens', '');
                                }
                              }}
                              className="w-full p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            >
                              <option value="">Select Lens</option>
                              <option value="Progressive Lens">Progressive Lens</option>
                              <option value="Single Vision">Single Vision</option>
                              <option value="Blue Light Filter">Blue Light Filter</option>
                              <option value="Anti-Glare">Anti-Glare</option>
                              <option value="Photochromic">Photochromic</option>
                              <option value="manual">✏️ Manual Entry</option>
                            </select>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          <input
                            type="number"
                            value={item.lensPrice}
                            onChange={(e) => updateItem(index, 'lensPrice', parseFloat(e.target.value) || 0)}
                            className="w-28 p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          />
                        </td>
                        <td className="px-4 py-4">
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 1)}
                            className="w-20 p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          />
                        </td>
                        <td className="px-4 py-4">
                          <div className={`font-bold text-xl ${isCalculating ? 'animate-pulse text-blue-600' : 'text-gray-800'} transition-colors`}>
                            ₹{item.total.toFixed(2)}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <button
                            onClick={() => removeItem(index)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-3 rounded-xl transition-all transform hover:scale-110"
                          >
                            <Minus className="w-6 h-6" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Totals Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div></div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-blue-200 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Calculator className="w-7 h-7 mr-3 text-blue-600" />
                Invoice Summary
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b-2 border-gray-200">
                  <span className="text-gray-600 font-medium">Subtotal:</span>
                  <span className={`font-bold text-xl ${isCalculating ? 'animate-pulse text-blue-600' : 'text-gray-800'}`}>
                    ₹{subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-600 font-medium">Discount (%):</span>
                  <input
                    type="number"
                    value={invoice.discount}
                    onChange={(e) => setInvoice(prev => ({ ...prev, discount: parseFloat(e.target.value) || 0 }))}
                    className="w-24 p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
                <div className="flex justify-between items-center py-3 border-b-2 border-gray-200">
                  <span className="text-gray-600 font-medium">Discount Amount:</span>
                  <span className="text-red-600 font-bold text-lg">-₹{discountAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <label className="flex items-center text-gray-600 font-medium">
                    <input
                      type="checkbox"
                      checked={invoice.includeTax}
                      onChange={(e) => setInvoice(prev => ({ ...prev, includeTax: e.target.checked }))}
                      className="mr-3 w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    Include Tax ({invoice.tax}%)
                  </label>
                </div>
                {invoice.includeTax && (
                  <div className="flex justify-between items-center py-3 border-b-2 border-gray-200">
                    <span className="text-gray-600 font-medium">Tax ({invoice.tax}%):</span>
                    <span className="font-bold text-lg text-green-600">₹{taxAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center py-4 bg-blue-100 rounded-2xl px-6 border-2 border-blue-300">
                  <span className="text-2xl font-bold text-blue-800">Total:</span>
                  <span className={`text-3xl font-bold ${isCalculating ? 'animate-pulse text-blue-600' : 'text-blue-800'}`}>
                    ₹{total.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-600 font-medium">Advance:</span>
                  <input
                    type="number"
                    value={invoice.advance}
                    onChange={(e) => setInvoice(prev => ({ ...prev, advance: parseFloat(e.target.value) || 0 }))}
                    className="w-32 p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
                <div className="flex justify-between items-center py-4 bg-red-100 rounded-2xl px-6 border-2 border-red-300">
                  <span className="text-2xl font-bold text-red-800">Balance:</span>
                  <span className={`text-3xl font-bold ${isCalculating ? 'animate-pulse text-red-600' : 'text-red-800'}`}>
                    ₹{balance.toFixed(2)}
                  </span>
                </div>
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Remarks</label>
                  <textarea
                    placeholder="Special instructions or notes"
                    value={invoice.remarks}
                    onChange={(e) => setInvoice(prev => ({ ...prev, remarks: e.target.value }))}
                    className="w-full p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    rows="3"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-8">
            <button 
              onClick={saveInvoice}
              className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-10 py-5 rounded-2xl hover:shadow-2xl transition-all duration-300 flex items-center space-x-3 transform hover:scale-105 hover:-translate-y-1"
            >
              <Save className="w-6 h-6" />
              <span className="font-semibold text-lg">Save Draft</span>
            </button>
            <button 
              onClick={generateInvoice} 
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-10 py-5 rounded-2xl hover:shadow-2xl transition-all duration-300 flex items-center space-x-3 transform hover:scale-105 hover:-translate-y-1"
            >
              <Printer className="w-6 h-6" />
              <span className="font-semibold text-lg">Generate Invoice</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOpticalInvoice;