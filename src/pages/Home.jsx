import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Crown, User, ArrowRight, Phone, Mail, MapPin } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Vision Care Optics</h1>
                <p className="text-sm text-gray-600">Your Vision, Our Mission</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#about" className="text-gray-600 hover:text-blue-600 transition">About</a>
              <a href="#services" className="text-gray-600 hover:text-blue-600 transition">Services</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition">Contact</a>
              <Link to="/admin-login" className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">Login</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Vision Care Optics
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional eye care and premium eyewear solutions for your perfect vision
          </p>
        </div>

        {/* Shop Template Info */}
        <div id="about" className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-12 border border-blue-200">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">👓 About Our Shop</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm mb-4">
              <div className="bg-white/70 rounded-lg p-3">
                <p className="font-semibold text-gray-800">📍 Location</p>
                <p className="text-gray-600">123 Vision Street, City Center</p>
              </div>
              <div className="bg-white/70 rounded-lg p-3">
                <p className="font-semibold text-gray-800">⏰ Hours</p>
                <p className="text-gray-600">Mon-Sat: 9AM - 8PM</p>
              </div>
              <div className="bg-white/70 rounded-lg p-3">
                <p className="font-semibold text-gray-800">📞 Contact</p>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white/70 rounded-lg p-3">
                <p className="font-semibold text-gray-800">🛍️ Services</p>
                <p className="text-gray-600">Eye Tests, Prescription Glasses, Contact Lenses, Sunglasses</p>
              </div>
              <div className="bg-white/70 rounded-lg p-3">
                <p className="font-semibold text-gray-800">💳 Payment</p>
                <p className="text-gray-600">Cash, Card, Insurance Accepted</p>
              </div>
            </div>
          </div>
        </div>

        {/* Login Options */}
        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {/* Admin Login */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl mb-6">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Admin Portal</h3>
              <p className="text-gray-600 mb-8">
                Access full store management, reports, and administrative controls
              </p>
              <Link
                to="/admin-login"
                className="inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 group"
              >
                Login as Admin
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Employee Login */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl mb-6">
                <User className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Employee Portal</h3>
              <p className="text-gray-600 mb-8">
                Handle customer service, create invoices, and manage daily operations
              </p>
              <Link
                to="/employee-login"
                className="inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-teal-700 transition-all duration-300 group"
              >
                Login as Employee
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Features */}
        <div id="services" className="mt-20 mb-20">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Services</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-4">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Eye Examinations</h4>
              <p className="text-gray-600">Professional eye testing and vision assessment</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl mb-4">
                <Crown className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Premium Frames</h4>
              <p className="text-gray-600">Designer eyewear and luxury frame collections</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mb-4">
                <User className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Expert Service</h4>
              <p className="text-gray-600">Personalized care from certified opticians</p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div id="contact" className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 mb-12">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">Get In Touch</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-xl mb-3">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-600 rounded-xl mb-3">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
              <p className="text-gray-600">info@visioncare.com</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-600 rounded-xl mb-3">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Address</h4>
              <p className="text-gray-600">123 Vision Street, City Center</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">© 2024 Vision Care Optics. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;