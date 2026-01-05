import React, { useState } from 'react';
import { User, Bell, Shield, Palette, Save, Eye, EyeOff, Lock } from 'lucide-react';

const Settings = () => {
  const [settings, setSettings] = useState({
    name: 'John Doe',
    email: 'john@visioncare.com',
    notifications: true,
    darkMode: false,
    language: 'en'
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [usernameForm, setUsernameForm] = useState({
    currentPassword: '',
    newUsername: ''
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handlePasswordChange = (e) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value
    });
  };

  const handleUsernameChange = (e) => {
    setUsernameForm({
      ...usernameForm,
      [e.target.name]: e.target.value
    });
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };
const handleUpdatePassword = async (e) => {
  e.preventDefault();

  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  const token = localStorage.getItem('token');

  if (!token) {
    alert('Please login again');
    return;
  }

  try {
    const response = await fetch('http://localhost:8080/api/admin/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      })
    });

    if (!response.ok) {
      throw new Error('Update failed');
    }

    alert('Password updated successfully');

    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });

  } catch (error) {
    alert('Password update failed');
  }
};

  const handleUpdateUsername = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem('token');

  if (!token) {
    alert('Please login again');
    return;
  }

  try {
    const response = await fetch('http://localhost:8080/api/admin/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        currentPassword: usernameForm.currentPassword,
        newUsername: usernameForm.newUsername
      })
    });

    if (!response.ok) {
      throw new Error('Update failed');
    }

    alert('Username updated successfully');

    setUsernameForm({
      currentPassword: '',
      newUsername: ''
    });

  } catch (error) {
    alert('Username update failed');
  }
};

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account and application preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Settings */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center mb-6">
            <User className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">Profile</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={settings.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center mb-6">
            <Bell className="w-6 h-6 text-green-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Email Notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={(e) => handleChange('notifications', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center mb-6">
            <Palette className="w-6 h-6 text-purple-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">Appearance</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Dark Mode</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.darkMode}
                  onChange={(e) => handleChange('darkMode', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
              <select
                value={settings.language}
                onChange={(e) => handleChange('language', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="mr">Marathi</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security Settings - Username Update */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 lg:col-span-2">
          <div className="flex items-center mb-6">
            <User className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">Change Username</h2>
          </div>
          <form onSubmit={handleUpdateUsername} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Password *
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="currentPassword"
                  value={usernameForm.currentPassword}
                  onChange={handleUsernameChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter current password"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Username *
              </label>
              <input
                type="text"
                name="newUsername"
                value={usernameForm.newUsername}
                onChange={handleUsernameChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter new username"
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              >
                Update Username
              </button>
            </div>
          </form>
        </div>

        {/* Security Settings - Password Update */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 lg:col-span-2">
          <div className="flex items-center mb-6">
            <Shield className="w-6 h-6 text-red-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">Change Password</h2>
          </div>
          <form onSubmit={handleUpdatePassword} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Password *
              </label>
              <div className="relative">
                <input
                  type={showPasswords.current ? 'text' : 'password'}
                  name="currentPassword"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
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
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password *
              </label>
              <div className="relative">
                <input
                  type={showPasswords.new ? 'text' : 'password'}
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                  placeholder="Enter new password"
                  required
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
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password *
              </label>
              <div className="relative">
                <input
                  type={showPasswords.confirm ? 'text' : 'password'}
                  name="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                  placeholder="Confirm new password"
                  required
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
            
            <div className="md:col-span-3">
              <button
                type="submit"
                className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
              >
                <Lock className="w-5 h-5" />
                <span>Update Password</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
        >
          <Save className="w-5 h-5 mr-2" />
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;