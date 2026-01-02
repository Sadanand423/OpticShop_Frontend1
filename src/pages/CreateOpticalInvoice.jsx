import React, { useState } from 'react';
import { Plus, Minus, Save, Printer } from 'lucide-react';

const CreateOpticalInvoice = () => {
  const [invoice, setInvoice] = useState({
    customerName: '',
    customerPhone: '',
    customerAddress: '',
    prescription: {
      rightEye: { sphere: '', cylinder: '', axis: '', add: '' },
      leftEye: { sphere: '', cylinder: '', axis: '', add: '' },
      pd: '',
      doctorName: '',
      prescriptionDate: ''
    },
    items: [{ frame: '', framePrice: 0, lens: '', lensPrice: 0, total: 0 }],
    discount: 0,
    tax: 18,
    includeTax: true,
    advance: 0,
  });

  const addItem = () => {
    setInvoice(prev => ({
      ...prev,
      items: [...prev.items, { frame: '', framePrice: 0, lens: '', lensPrice: 0, total: 0 }]
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
      if (field === 'framePrice' || field === 'lensPrice') {
        newItems[index].total = newItems[index].framePrice + newItems[index].lensPrice;
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

  const generateInvoice = () => {
    if (!invoice.customerName || invoice.items.length === 0 || (!invoice.items[0].frame && !invoice.items[0].lens)) {
      alert('Please fill in customer name and add at least one frame or lens');
      return;
    }
    
    const invoiceData = {
      ...invoice,
      invoiceNumber: `INV-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      subtotal,
      discountAmount,
      taxAmount,
      total
    };
    
    // Create printable invoice
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice - ${invoiceData.invoiceNumber}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .invoice-details { display: flex; justify-content: space-between; margin-bottom: 20px; }
            .prescription { margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .totals { text-align: right; }
            .total-row { font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Optical Invoice</h1>
            <p>Invoice #: ${invoiceData.invoiceNumber}</p>
            <p>Date: ${invoiceData.date}</p>
          </div>
          
          <div class="invoice-details">
            <div>
              <h3>Customer Details:</h3>
              <p><strong>Name:</strong> ${invoiceData.customerName}</p>
              <p><strong>Phone:</strong> ${invoiceData.customerPhone}</p>
              <p><strong>Address:</strong> ${invoiceData.customerAddress}</p>
            </div>
            ${invoiceData.prescription.doctorName ? `
            <div class="prescription">
              <h3>Prescription:</h3>
              <p><strong>Doctor:</strong> ${invoiceData.prescription.doctorName}</p>
              <p><strong>Right Eye:</strong> SPH: ${invoiceData.prescription.rightEye.sphere}, CYL: ${invoiceData.prescription.rightEye.cylinder}, AXIS: ${invoiceData.prescription.rightEye.axis}</p>
              <p><strong>Left Eye:</strong> SPH: ${invoiceData.prescription.leftEye.sphere}, CYL: ${invoiceData.prescription.leftEye.cylinder}, AXIS: ${invoiceData.prescription.leftEye.axis}</p>
            </div>
            ` : ''}
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Frame</th>
                <th>Frame Price</th>
                <th>Lens</th>
                <th>Lens Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${invoiceData.items.map(item => `
                <tr>
                  <td>${item.frame || '-'}</td>
                  <td>₹${item.framePrice.toFixed(2)}</td>
                  <td>${item.lens || '-'}</td>
                  <td>₹${item.lensPrice.toFixed(2)}</td>
                  <td>₹${item.total.toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <div class="totals">
            <p>Subtotal: ₹${invoiceData.subtotal.toFixed(2)}</p>
            <p>Discount (${invoiceData.discount}%): -₹${invoiceData.discountAmount.toFixed(2)}</p>
            ${invoiceData.includeTax ? `<p>Tax (${invoiceData.tax}%): ₹${invoiceData.taxAmount.toFixed(2)}</p>` : ''}
            <p class="total-row">Total: ₹${invoiceData.total.toFixed(2)}</p>
            <p>Advance: ₹${invoiceData.advance.toFixed(2)}</p>
            <p class="total-row" style="color: red;">Balance: ₹${(invoiceData.total - invoiceData.advance).toFixed(2)}</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const subtotal = invoice.items.reduce((sum, item) => sum + item.total, 0);
  const discountAmount = (subtotal * invoice.discount) / 100;
  const taxAmount = invoice.includeTax ? ((subtotal - discountAmount) * invoice.tax) / 100 : 0;
  const total = subtotal - discountAmount + taxAmount;
  const balance = total - invoice.advance;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Create Optical Invoice</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Customer Name"
                value={invoice.customerName}
                onChange={(e) => setInvoice(prev => ({ ...prev, customerName: e.target.value }))}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={invoice.customerPhone}
                onChange={(e) => setInvoice(prev => ({ ...prev, customerPhone: e.target.value }))}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Address"
                value={invoice.customerAddress}
                onChange={(e) => setInvoice(prev => ({ ...prev, customerAddress: e.target.value }))}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
              />
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Invoice Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Date</label>
                <input
                  type="date"
                  defaultValue={new Date().toISOString().split('T')[0]}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Number</label>
                <input
                  type="text"
                  value="INV-2024-001"
                  readOnly
                  className="w-full p-3 border rounded-lg bg-gray-50"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Prescription Details */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Prescription Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <input
                type="text"
                placeholder="Doctor Name"
                value={invoice.prescription.doctorName}
                onChange={(e) => setInvoice(prev => ({ ...prev, prescription: { ...prev.prescription, doctorName: e.target.value } }))}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="date"
                placeholder="Prescription Date"
                value={invoice.prescription.prescriptionDate}
                onChange={(e) => setInvoice(prev => ({ ...prev, prescription: { ...prev.prescription, prescriptionDate: e.target.value } }))}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left">Eye</th>
                  <th className="px-4 py-3 text-left">Sphere (SPH)</th>
                  <th className="px-4 py-3 text-left">Cylinder (CYL)</th>
                  <th className="px-4 py-3 text-left">Axis</th>
                  <th className="px-4 py-3 text-left">Add</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">Right Eye (OD)</td>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      placeholder="0.00"
                      value={invoice.prescription.rightEye.sphere}
                      onChange={(e) => updatePrescription('rightEye', 'sphere', e.target.value)}
                      className="w-20 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      placeholder="0.00"
                      value={invoice.prescription.rightEye.cylinder}
                      onChange={(e) => updatePrescription('rightEye', 'cylinder', e.target.value)}
                      className="w-20 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      placeholder="0"
                      value={invoice.prescription.rightEye.axis}
                      onChange={(e) => updatePrescription('rightEye', 'axis', e.target.value)}
                      className="w-16 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      placeholder="0.00"
                      value={invoice.prescription.rightEye.add}
                      onChange={(e) => updatePrescription('rightEye', 'add', e.target.value)}
                      className="w-20 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">Left Eye (OS)</td>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      placeholder="0.00"
                      value={invoice.prescription.leftEye.sphere}
                      onChange={(e) => updatePrescription('leftEye', 'sphere', e.target.value)}
                      className="w-20 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      placeholder="0.00"
                      value={invoice.prescription.leftEye.cylinder}
                      onChange={(e) => updatePrescription('leftEye', 'cylinder', e.target.value)}
                      className="w-20 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      placeholder="0"
                      value={invoice.prescription.leftEye.axis}
                      onChange={(e) => updatePrescription('leftEye', 'axis', e.target.value)}
                      className="w-16 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      placeholder="0.00"
                      value={invoice.prescription.leftEye.add}
                      onChange={(e) => updatePrescription('leftEye', 'add', e.target.value)}
                      className="w-20 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Pupillary Distance (PD)</label>
            <input
              type="text"
              placeholder="63mm"
              value={invoice.prescription.pd}
              onChange={(e) => setInvoice(prev => ({ ...prev, prescription: { ...prev.prescription, pd: e.target.value } }))}
              className="w-32 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Items</h2>
            <button
              onClick={addItem}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left">Frame</th>
                  <th className="px-4 py-3 text-left">Frame Price</th>
                  <th className="px-4 py-3 text-left">Lens</th>
                  <th className="px-4 py-3 text-left">Lens Price</th>
                  <th className="px-4 py-3 text-left">Total</th>
                  <th className="px-4 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-3">
                      <select
                        value={item.frame}
                        onChange={(e) => updateItem(index, 'frame', e.target.value)}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Frame</option>
                        <option value="Ray-Ban Aviator">Ray-Ban Aviator</option>
                        <option value="Oakley Sports">Oakley Sports</option>
                        <option value="Classic Frame">Classic Frame</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        value={item.framePrice}
                        onChange={(e) => updateItem(index, 'framePrice', parseFloat(e.target.value) || 0)}
                        className="w-24 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={item.lens}
                        onChange={(e) => updateItem(index, 'lens', e.target.value)}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Lens</option>
                        <option value="Progressive Lens">Progressive Lens</option>
                        <option value="Single Vision">Single Vision</option>
                        <option value="Blue Light Filter">Blue Light Filter</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        value={item.lensPrice}
                        onChange={(e) => updateItem(index, 'lensPrice', parseFloat(e.target.value) || 0)}
                        className="w-24 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-4 py-3 font-semibold">₹{item.total.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => removeItem(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div></div>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Discount (%):</span>
              <input
                type="number"
                value={invoice.discount}
                onChange={(e) => setInvoice(prev => ({ ...prev, discount: parseFloat(e.target.value) || 0 }))}
                className="w-20 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-between">
              <span>Discount Amount:</span>
              <span className="text-red-600">-₹{discountAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={invoice.includeTax}
                  onChange={(e) => setInvoice(prev => ({ ...prev, includeTax: e.target.checked }))}
                  className="mr-2"
                />
                <span>Include Tax ({invoice.tax}%)</span>
              </label>
            </div>
            {invoice.includeTax && (
              <div className="flex justify-between">
                <span>Tax ({invoice.tax}%):</span>
                <span>₹{taxAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold border-t pt-2">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Advance:</span>
              <input
                type="number"
                value={invoice.advance}
                onChange={(e) => setInvoice(prev => ({ ...prev, advance: parseFloat(e.target.value) || 0 }))}
                className="w-24 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-2">
              <span>Balance:</span>
              <span className="text-red-600">₹{balance.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 flex items-center">
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </button>
          <button onClick={generateInvoice} className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 flex items-center">
            <Printer className="w-4 h-4 mr-2" />
            Generate Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateOpticalInvoice;