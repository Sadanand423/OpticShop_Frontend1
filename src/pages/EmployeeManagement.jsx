import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UserPlus, Edit, Trash2, Save, X } from 'lucide-react';

const BASE_URL = "http://localhost:8080";

const EmployeeManagement = () => {

  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    employeeId: '',
    username: '',
    password: '',
    name: '',
    role: 'Cashier'
  });

  /* ================= FETCH EMPLOYEES ================= */
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${BASE_URL}/api/admin/employees`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setEmployees(res.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      if (editingId) {
        await axios.put(
          `${BASE_URL}/api/admin/employees/${editingId}`,
          formData,
          config
        );
      } else {
        await axios.post(
          `${BASE_URL}/api/admin/employees`,
          formData,
          config
        );
      }

      resetForm();
      fetchEmployees();
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (emp) => {
    setFormData({
      employeeId: emp.employeeId,
      username: emp.username,
      password: '',
      name: emp.name,
      role: emp.role
    });
    setEditingId(emp.id);
    setShowForm(true);
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (window.confirm("Delete employee?")) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${BASE_URL}/api/admin/employees/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        fetchEmployees();
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  /* ================= RESET ================= */
  const resetForm = () => {
    setFormData({
      employeeId: '',
      username: '',
      password: '',
      name: '',
      role: 'Cashier'
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Employee Management</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-white text-green-600 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg"
          >
            <UserPlus size={18} /> Add Employee
          </button>
        </div>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-2xl border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
              {editingId ? "Edit Employee" : "Add New Employee"}
            </h2>
            <button 
              onClick={resetForm}
              className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-all"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID</label>
              <input
                placeholder="Enter Employee ID"
                value={formData.employeeId}
                onChange={e => setFormData({ ...formData, employeeId: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                placeholder="Enter Full Name"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                placeholder="Enter Username"
                value={formData.username}
                onChange={e => setFormData({ ...formData, username: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                required={!editingId}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <select
                value={formData.role}
                onChange={e => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              >
                <option>Cashier</option>
                <option>Sales</option>
                <option>Manager</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-green-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
              >
                <Save size={16} /> {editingId ? "Update Employee" : "Create Employee"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Emp ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Username</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.id} className="border-t">
                <td className="p-3">{emp.employeeId}</td>
                <td className="p-3">{emp.name}</td>
                <td className="p-3">{emp.username}</td>
                <td className="p-3">{emp.role}</td>
                <td className="p-3 flex gap-2">
                  <button onClick={() => handleEdit(emp)} className="text-blue-600">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => handleDelete(emp.id)} className="text-red-600">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default EmployeeManagement;
