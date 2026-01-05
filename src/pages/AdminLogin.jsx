import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Crown, Eye, EyeOff, ArrowLeft } from 'lucide-react';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:8080/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password
      })
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    const data = await response.json();

    // ✅ Save JWT token
    localStorage.setItem("token", data.token);

    // ✅ Navigate to admin dashboard
    navigate("/admin");

  } catch (error) {
    alert("Login failed: Invalid username or password");
  }
};


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl mb-4">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h2>
            <p className="text-gray-600">Access your administrative dashboard</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Enter: admin"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all pr-12"
                  placeholder="Enter: admin123"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

        

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              Login as Admin
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Need employee access?{' '}
              <Link to="/employee-login" className="text-purple-600 hover:text-purple-700 font-medium">
                Employee Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;