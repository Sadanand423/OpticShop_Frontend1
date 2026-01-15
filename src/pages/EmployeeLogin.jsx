import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Eye, EyeOff, ArrowLeft } from 'lucide-react';

const BASE_URL = "http://localhost:8080";

const EmployeeLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post(
        `${BASE_URL}/api/employee/login`,
        formData
      );

      // store logged-in employee
      localStorage.setItem("employee", JSON.stringify(res.data));

      navigate('/employee');
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">

        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        {/* Shop Info Template */}
        <div className="bg-white/80 backdrop-blur rounded-xl p-4 mb-6 border border-green-100">
          <h3 className="text-lg font-bold text-gray-800 mb-1">👓 Vision Optic Shop</h3>
          <p className="text-sm text-gray-600">Complete eyewear solutions with prescription lenses, frames & eye care services</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl border p-8">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl flex items-center justify-center mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold">Employee Login</h2>
            <p className="text-gray-600">Access your dashboard</p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl mb-4 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm mb-2">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold py-3 rounded-xl hover:scale-105 transition"
            >
              Login
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Need admin access?{' '}
              <Link to="/admin-login" className="text-green-600 font-medium">
                Admin Login
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EmployeeLogin;
