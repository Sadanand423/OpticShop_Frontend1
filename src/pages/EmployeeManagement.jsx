import React, { useState } from 'react';
import { UserPlus, Edit, Trash2, Eye, EyeOff, Save, X } from 'lucide-react';

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([
    { id: 1, employeeId: 'EMP001', username: 'john_doe', password: 'password123', name: 'John Doe', role: 'Cashier', status: 'Active' },
    { id: 2, employeeId: 'EMP002', username: 'jane_smith', password: 'secure456', name: 'Jane Smith', role: 'Sales', status: 'Active' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showPasswords, setShowPasswords] = useState({});
  const [formData, setFormData] = useState({
    employeeId: '',
    username: '',
    password: '',
    name: '',
    role: 'Cashier'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setEmployees(employees.map(emp => 
        emp.id === editingId ? { ...emp, ...formData } : emp
      ));
      setEditingId(null);
    } else {
      const newEmployee = {
        id: Date.now(),
        employeeId: formData.employeeId,
        ...formData,
        status: 'Active'
      };
      setEmployees([...employees, newEmployee]);
    }
    setFormData({ employeeId: '', username: '', password: '', name: '', role: 'Cashier' });
    setShowForm(false);
  };

  const handleEdit = (employee) => {
    setFormData({
      employeeId: employee.employeeId,
      username: employee.username,
      password: employee.password,
      name: employee.name,
      role: employee.role
    });
    setEditingId(employee.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  const togglePasswordVisibility = (id) => {
    setShowPasswords(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const resetForm = () => {
    setFormData({ employeeId: '', username: '', password: '', name: '', role: 'Cashier' });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Employee Management</h1>
            <p className="text-gray-600 mt-1">Manage employee accounts and credentials</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
          >
            <UserPlus className="w-5 h-5" />
            <span>Add Employee</span>
          </button>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              {editingId ? 'Edit Employee' : 'Add New Employee'}
            </h2>
            <button
              onClick={resetForm}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID</label>
              <input
                type="text"
                value={formData.employeeId}
                onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., EMP001"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Cashier">Cashier</option>
                <option value="Sales">Sales</option>
                <option value="Manager">Manager</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <div className="md:col-span-2 flex space-x-4">
              <button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>{editingId ? 'Update' : 'Create'} Employee</span>
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 text-white px-6 py-3 rounded-xl hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Employee List */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">Employee List</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Employee ID</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Username</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Password</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Role</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {employees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{employee.employeeId}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{employee.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-900">{employee.username}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-900">
                        {showPasswords[employee.id] ? employee.password : '••••••••'}
                      </span>
                      <button
                        onClick={() => togglePasswordVisibility(employee.id)}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        {showPasswords[employee.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-3 py-1 text-sm font-semibold bg-blue-100 text-blue-800 rounded-full">
                      {employee.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                      employee.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(employee)}
                        className="text-blue-600 hover:text-blue-800 transition-colors p-2 hover:bg-blue-50 rounded-lg"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(employee.id)}
                        className="text-red-600 hover:text-red-800 transition-colors p-2 hover:bg-red-50 rounded-lg"
                      >
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

export default EmployeeManagement;