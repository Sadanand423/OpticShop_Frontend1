import React from 'react';
import { Receipt, Users, Package, CreditCard, TrendingUp, Eye, Calendar, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmployeeDashboard = () => {
  const stats = [
    { 
      title: 'Today\'s Invoices', 
      value: '12', 
      icon: Receipt, 
      gradient: 'from-blue-500 to-purple-600',
      change: '+3 today',
      changeType: 'positive'
    },
    { 
      title: 'Customers Served', 
      value: '8', 
      icon: Users, 
      gradient: 'from-green-500 to-emerald-600',
      change: '+2 today',
      changeType: 'positive'
    },
    { 
      title: 'Products Sold', 
      value: '24', 
      icon: Package, 
      gradient: 'from-orange-500 to-red-600',
      change: '+6 today',
      changeType: 'positive'
    },
    { 
      title: 'Payments Received', 
      value: '₹18,500', 
      icon: CreditCard, 
      gradient: 'from-purple-500 to-pink-600',
      change: '+₹2,500',
      changeType: 'positive'
    },
  ];

  const recentInvoices = [
    { id: 'INV-001', customer: 'John Doe', amount: 1500, status: 'Paid', time: '2 hours ago' },
    { id: 'INV-002', customer: 'Jane Smith', amount: 2000, status: 'Pending', time: '3 hours ago' },
    { id: 'INV-003', customer: 'Mike Johnson', amount: 1750, status: 'Paid', time: '4 hours ago' },
  ];

  const quickActions = [
    { 
      title: 'Create New Invoice', 
      description: 'Generate invoice for customers',
      link: '/create-invoice', 
      gradient: 'from-blue-500 to-purple-600',
      icon: Receipt
    },
    { 
      title: 'View Customer List', 
      description: 'Browse all customers',
      link: '/customers', 
      gradient: 'from-green-500 to-emerald-600',
      icon: Users
    },
    { 
      title: 'Check Product Stock', 
      description: 'View inventory status',
      link: '/products', 
      gradient: 'from-orange-500 to-red-600',
      icon: Package
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 animate-fadeInUp">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Employee Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's your daily work summary.</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-gray-100 rounded-xl p-3">
              <Calendar className="w-6 h-6 text-gray-600" />
            </div>
            <div className="text-right">
              <p className="text-gray-800 font-semibold">{new Date().toLocaleDateString()}</p>
              <p className="text-gray-500 text-sm">{new Date().toLocaleTimeString()}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover-lift card-hover animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`bg-gradient-to-r ${stat.gradient} p-3 rounded-xl shadow-lg floating`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center space-x-1 ${
                  stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                }`}>
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-semibold">{stat.change}</span>
                </div>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Invoices */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 animate-fadeInUp">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Recent Invoices</h2>
            <Link 
              to="/invoices" 
              className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span className="text-sm">View All</span>
            </Link>
          </div>
          <div className="space-y-3">
            {recentInvoices.map((invoice, index) => (
              <div 
                key={invoice.id} 
                className="bg-gray-50 rounded-xl p-4 hover-lift transition-all duration-300 animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-800">{invoice.id}</p>
                    <p className="text-gray-600 text-sm">{invoice.customer}</p>
                    <p className="text-gray-400 text-xs">{invoice.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-800 font-bold text-lg">₹{invoice.amount.toLocaleString()}</p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                      invoice.status === 'Paid' ? 'bg-green-100 text-green-700' :
                      invoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {invoice.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 animate-fadeInUp">
          <div className="flex items-center mb-6">
            <Star className="w-6 h-6 text-yellow-500 mr-2" />
            <h2 className="text-2xl font-bold text-gray-800">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link
                  key={index}
                  to={action.link}
                  className="group bg-gray-50 rounded-xl p-4 hover-lift transition-all duration-300 animate-fadeInUp hover:bg-gray-100"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`bg-gradient-to-r ${action.gradient} p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{action.description}</p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse-custom"></div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;