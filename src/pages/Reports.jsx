import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Package, 
  Calendar,
  Filter,
  Download,
  Eye,
  Star
} from 'lucide-react';

const Reports = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeFilter, setTimeFilter] = useState('monthly');

  const salesData = [
    { month: 'Jan', sales: 45000 },
    { month: 'Feb', sales: 52000 },
    { month: 'Mar', sales: 48000 },
    { month: 'Apr', sales: 61000 },
    { month: 'May', sales: 55000 },
    { month: 'Jun', sales: 67000 },
  ];

  const dailySales = [
    { day: 'Monday', sales: 18500 },
    { day: 'Tuesday', sales: 22000 },
    { day: 'Wednesday', sales: 19500 },
    { day: 'Thursday', sales: 25000 },
    { day: 'Friday', sales: 21000 },
    { day: 'Saturday', sales: 28000 },
    { day: 'Sunday', sales: 15000 },
  ];

  const weeklySales = [
    { week: 'Week 1', sales: 105000 },
    { week: 'Week 2', sales: 118000 },
    { week: 'Week 3', sales: 95000 },
    { week: 'Week 4', sales: 112000 },
  ];

  const topProducts = [
    { name: 'Premium Sunglasses', sales: 145, revenue: 87000 },
    { name: 'Reading Glasses', sales: 230, revenue: 69000 },
    { name: 'Contact Lenses', sales: 180, revenue: 54000 },
    { name: 'Blue Light Glasses', sales: 95, revenue: 38000 },
    { name: 'Safety Glasses', sales: 75, revenue: 22500 },
  ];

  const getCurrentSalesData = () => {
    switch (timeFilter) {
      case 'daily':
        return { title: 'Daily Sales (This Week)', data: dailySales, maxValue: 30000 };
      case 'weekly':
        return { title: 'Weekly Sales (This Month)', data: weeklySales, maxValue: 120000 };
      case 'monthly':
      default:
        return { title: 'Monthly Sales (This Year)', data: salesData, maxValue: 70000 };
    }
  };

  const currentSalesData = getCurrentSalesData();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3, gradient: 'gradient-primary' },
    { id: 'sales', label: 'Sales', icon: TrendingUp, gradient: 'gradient-success' },
  ];

  const timeFilters = [
    { id: 'daily', label: 'Daily' },
    { id: 'weekly', label: 'Weekly' },
    { id: 'monthly', label: 'Monthly' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 animate-fadeInUp">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl shadow-lg floating">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-800">Reports & Analytics</h1>
              <p className="text-gray-600">Comprehensive business insights and performance metrics</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-gray-100 rounded-xl p-3 text-gray-600 hover:bg-gray-200 hover:scale-105 transition-all duration-300">
              <Download className="w-5 h-5" />
            </button>
            <button className="bg-gray-100 rounded-xl p-3 text-gray-600 hover:bg-gray-200 hover:scale-105 transition-all duration-300">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 animate-fadeInUp ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Filter */}
      <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 animate-fadeInUp">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            <span className="text-gray-700 font-medium">Time Period:</span>
          </div>
          <div className="flex space-x-2">
            {timeFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setTimeFilter(filter.id)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  timeFilter === filter.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover-lift card-hover animate-fadeInUp">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-xl shadow-lg floating">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center space-x-1 text-green-500">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-semibold">+8.2%</span>
                </div>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-800">₹3,28,000</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover-lift card-hover animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl shadow-lg floating">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center space-x-1 text-red-500">
                  <TrendingDown className="w-4 h-4" />
                  <span className="text-sm font-semibold">-3.1%</span>
                </div>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">New Customers</p>
                <p className="text-3xl font-bold text-gray-800">156</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover-lift card-hover animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-r from-orange-500 to-red-600 p-3 rounded-xl shadow-lg floating">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center space-x-1 text-green-500">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-semibold">+5.7%</span>
                </div>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Avg Order Value</p>
                <p className="text-3xl font-bold text-gray-800">₹1,907</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover-lift card-hover animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-3 rounded-xl shadow-lg floating">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center space-x-1 text-green-500">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-semibold">+12.3%</span>
                </div>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Customer Satisfaction</p>
                <p className="text-3xl font-bold text-gray-800">4.8/5</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Sales Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 animate-fadeInUp">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">{currentSalesData.title}</h2>
                <button className="bg-gray-100 rounded-lg p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4">
                {currentSalesData.data.map((data, index) => (
                  <div key={index} className="animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600 font-medium">{data.month || data.day || data.week}</span>
                      <span className="text-gray-800 font-bold">₹{data.sales.toLocaleString()}</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full progress-bar transition-all duration-1000 ease-out" 
                        style={{ 
                          width: `${(data.sales / currentSalesData.maxValue) * 100}%`,
                          animationDelay: `${index * 0.2}s`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 animate-fadeInUp">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Top Products</h2>
                <div className="bg-gradient-to-r from-orange-500 to-red-600 p-2 rounded-lg">
                  <Package className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div 
                    key={index} 
                    className="bg-gray-50 rounded-xl p-4 hover-lift transition-all duration-300 animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full animate-pulse-custom"></div>
                        <div>
                          <p className="font-semibold text-gray-800">{product.name}</p>
                          <p className="text-gray-600 text-sm">{product.sales} units sold</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600 text-lg">₹{product.revenue.toLocaleString()}</p>
                        <p className="text-gray-400 text-xs">#{index + 1}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 animate-fadeInUp">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Methods Distribution</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center animate-fadeInUp">
                <div className="relative mx-auto mb-4">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl floating">
                    <span className="text-2xl font-bold text-white">45%</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">↑</span>
                  </div>
                </div>
                <p className="font-bold text-gray-800 text-lg">Card Payments</p>
                <p className="text-gray-600">₹1,47,600</p>
              </div>
              <div className="text-center animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                <div className="relative mx-auto mb-4">
                  <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl floating">
                    <span className="text-2xl font-bold text-white">35%</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">→</span>
                  </div>
                </div>
                <p className="font-bold text-gray-800 text-lg">UPI Payments</p>
                <p className="text-gray-600">₹1,14,800</p>
              </div>
              <div className="text-center animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                <div className="relative mx-auto mb-4">
                  <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-2xl floating">
                    <span className="text-2xl font-bold text-white">20%</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">↓</span>
                  </div>
                </div>
                <p className="font-bold text-gray-800 text-lg">Cash Payments</p>
                <p className="text-gray-600">₹65,600</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'sales' && (
        <div className="space-y-8">
          {/* Sales Performance */}
          <div className="glass rounded-2xl p-6 shadow-xl animate-fadeInUp">
            <h2 className="text-2xl font-bold text-white mb-6">Sales Performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center glass-dark rounded-xl p-4 hover-lift">
                <div className="gradient-success p-3 rounded-xl w-fit mx-auto mb-3 floating">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <p className="text-3xl font-bold text-green-400">₹18,500</p>
                <p className="text-white/70">Today's Sales</p>
              </div>
              <div className="text-center glass-dark rounded-xl p-4 hover-lift">
                <div className="gradient-primary p-3 rounded-xl w-fit mx-auto mb-3 floating">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <p className="text-3xl font-bold text-blue-400">₹1,05,000</p>
                <p className="text-white/70">This Week</p>
              </div>
              <div className="text-center glass-dark rounded-xl p-4 hover-lift">
                <div className="gradient-secondary p-3 rounded-xl w-fit mx-auto mb-3 floating">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <p className="text-3xl font-bold text-purple-400">₹3,28,000</p>
                <p className="text-white/70">This Month</p>
              </div>
              <div className="text-center glass-dark rounded-xl p-4 hover-lift">
                <div className="gradient-warning p-3 rounded-xl w-fit mx-auto mb-3 floating">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <p className="text-3xl font-bold text-orange-400">₹42,00,000</p>
                <p className="text-white/70">This Year</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Daily Sales */}
            <div className="glass rounded-2xl p-6 shadow-xl animate-fadeInUp">
              <h2 className="text-2xl font-bold text-white mb-6">Daily Sales (This Week)</h2>
              <div className="space-y-4">
                {dailySales.map((data, index) => (
                  <div key={index} className="animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white/70 font-medium">{data.day}</span>
                      <span className="text-white font-bold">₹{data.sales.toLocaleString()}</span>
                    </div>
                    <div className="glass-dark rounded-full h-3 overflow-hidden">
                      <div 
                        className="gradient-success h-full rounded-full progress-bar transition-all duration-1000 ease-out" 
                        style={{ 
                          width: `${(data.sales / 30000) * 100}%`,
                          animationDelay: `${index * 0.2}s`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Sales */}
            <div className="glass rounded-2xl p-6 shadow-xl animate-fadeInUp">
              <h2 className="text-2xl font-bold text-white mb-6">Weekly Sales (This Month)</h2>
              <div className="space-y-4">
                {weeklySales.map((data, index) => (
                  <div key={index} className="animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white/70 font-medium">{data.week}</span>
                      <span className="text-white font-bold">₹{data.sales.toLocaleString()}</span>
                    </div>
                    <div className="glass-dark rounded-full h-3 overflow-hidden">
                      <div 
                        className="gradient-primary h-full rounded-full progress-bar transition-all duration-1000 ease-out" 
                        style={{ 
                          width: `${(data.sales / 120000) * 100}%`,
                          animationDelay: `${index * 0.2}s`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Monthly Sales */}
            <div className="glass rounded-2xl p-6 shadow-xl animate-fadeInUp">
              <h2 className="text-2xl font-bold text-white mb-6">Monthly Sales</h2>
              <div className="space-y-4">
                {salesData.map((data, index) => (
                  <div key={index} className="animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white/70 font-medium">{data.month}</span>
                      <span className="text-white font-bold">₹{data.sales.toLocaleString()}</span>
                    </div>
                    <div className="glass-dark rounded-full h-3 overflow-hidden">
                      <div 
                        className="gradient-secondary h-full rounded-full progress-bar transition-all duration-1000 ease-out" 
                        style={{ 
                          width: `${(data.sales / 70000) * 100}%`,
                          animationDelay: `${index * 0.2}s`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Insights */}
            <div className="glass rounded-2xl p-6 shadow-xl animate-fadeInUp">
              <h2 className="text-2xl font-bold text-white mb-6">Performance Insights</h2>
              <div className="space-y-4">
                <div className="glass-dark rounded-xl p-4 hover-lift">
                  <div className="flex items-center space-x-3">
                    <div className="gradient-success p-2 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">Best Performing Day</p>
                      <p className="text-white/70 text-sm">Saturday - ₹28,000</p>
                    </div>
                  </div>
                </div>
                <div className="glass-dark rounded-xl p-4 hover-lift">
                  <div className="flex items-center space-x-3">
                    <div className="gradient-warning p-2 rounded-lg">
                      <Package className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">Top Category</p>
                      <p className="text-white/70 text-sm">Premium Sunglasses</p>
                    </div>
                  </div>
                </div>
                <div className="glass-dark rounded-xl p-4 hover-lift">
                  <div className="flex items-center space-x-3">
                    <div className="gradient-primary p-2 rounded-lg">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">Customer Growth</p>
                      <p className="text-white/70 text-sm">+12% this month</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;