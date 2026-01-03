import React, { useState } from 'react';
import { User, Lock, Save, Eye, EyeOff } from 'lucide-react';

const AdminProfile = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newUsername: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleUpdateCredentials = async (e) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/admin/update-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newUsername: formData.newUsername,
          newPassword: formData.newPassword
        })
      });

      if (response.ok) {
        alert('Credentials updated successfully');
        setFormData({
          currentPassword: '',
          newUsername: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        const errorMsg = await response.text();
        alert(errorMsg || 'Failed to update credentials');
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('Server error. Please try again later.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-800">Admin Profile</h1>
        <p className="text-gray-600 mt-1">Update your admin credentials</p>
      </div>

      {/* Update Credentials Form */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center mb-6">
          <User className="w-6 h-6 text-blue-600 mr-2" />
          <h2 className="text-xl font-bold text-gray-800">Update Credentials</h2>
        </div>

        <form onSubmit={handleUpdateCredentials} className="space-y-6">
          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password *
            </label>
            <div className="relative">
              <input
                type={showPasswords.current ? 'text' : 'password'}
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                placeholder="Enter current password"
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('current')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* New Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Username
            </label>
            <input
              type="text"
              name="newUsername"
              value={formData.newUsername}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter new username (leave blank to keep current)"
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.new ? 'text' : 'password'}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                placeholder="Enter new password (leave blank to keep current)"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('new')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.confirm ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirm')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
          >
            <Save className="w-5 h-5" />
            <span>Update Credentials</span>
          </button>
        </form>
      </div>

      {/* Security Tips */}
      <div className="bg-yellow-50 rounded-2xl p-6 border border-yellow-200">
        <div className="flex items-center mb-4">
          <Lock className="w-6 h-6 text-yellow-600 mr-2" />
          <h3 className="text-lg font-semibold text-yellow-800">Security Tips</h3>
        </div>
        <ul className="text-yellow-700 space-y-2">
          <li>• Use a strong password with at least 8 characters</li>
          <li>• Include uppercase, lowercase, numbers, and special characters</li>
          <li>• Don't use easily guessable information</li>
          <li>• Change your password regularly</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminProfile;