import React, { useState } from 'react';
import { Plus, Search, Eye, Edit, Trash2 } from 'lucide-react';

const Prescriptions = () => {
  const [prescriptions] = useState([
    { 
      id: 1, 
      customerName: 'John Doe', 
      doctorName: 'Dr. Smith', 
      date: '2024-01-15',
      rightEye: { sphere: '-2.00', cylinder: '-0.50', axis: '90' },
      leftEye: { sphere: '-1.75', cylinder: '-0.25', axis: '85' }
    },
    { 
      id: 2, 
      customerName: 'Jane Smith', 
      doctorName: 'Dr. Johnson', 
      date: '2024-01-14',
      rightEye: { sphere: '+1.50', cylinder: '0.00', axis: '0' },
      leftEye: { sphere: '+1.25', cylinder: '-0.50', axis: '180' }
    },
  ]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Prescriptions</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add Prescription
        </button>
      </div>
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search prescriptions..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Doctor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Right Eye</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Left Eye</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {prescriptions.map((prescription) => (
                <tr key={prescription.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{prescription.customerName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{prescription.doctorName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{prescription.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    <div className="text-sm">
                      <div>SPH: {prescription.rightEye.sphere}</div>
                      <div>CYL: {prescription.rightEye.cylinder}</div>
                      <div>AXIS: {prescription.rightEye.axis}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    <div className="text-sm">
                      <div>SPH: {prescription.leftEye.sphere}</div>
                      <div>CYL: {prescription.leftEye.cylinder}</div>
                      <div>AXIS: {prescription.leftEye.axis}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button className="text-green-600 hover:text-green-800">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-800">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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
export default Prescriptions;