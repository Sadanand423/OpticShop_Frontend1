import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  Receipt, 
  List, 
  CreditCard, 
  BarChart3,
  Settings,
  LogOut,
  Crown,
  Home,
  UserCog
} from 'lucide-react';

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const menuItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', gradient: 'gradient-primary' },
    { path: '/admin/create-invoice', icon: Receipt, label: 'Create Invoice', gradient: 'gradient-success' },
    { path: '/admin/customers', icon: Users, label: 'Customers', gradient: 'gradient-secondary' },
    { path: '/admin/products', icon: Package, label: 'Products', gradient: 'gradient-warning' },
    { path: '/admin/invoices', icon: List, label: 'Invoice List', gradient: 'gradient-info' },
    { path: '/admin/payments', icon: CreditCard, label: 'Payments', gradient: 'gradient-danger' },
    { path: '/admin/employees', icon: UserCog, label: 'Employees', gradient: 'gradient-secondary' },
    { path: '/admin/reports', icon: BarChart3, label: 'Reports', gradient: 'gradient-primary' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-72 bg-white shadow-2xl border-r border-gray-200 animate-slideInLeft flex flex-col h-full">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-purple-600 to-blue-600 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-xl shadow-lg floating">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Owner Portal</h1>
              <p className="text-sm text-white/80">Store Management</p>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto mt-6 px-4 space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`group flex items-center px-4 py-3 rounded-xl transition-all duration-300 hover-lift animate-fadeInUp ${
                  isActive 
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg transform scale-105' 
                    : 'text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`p-2 rounded-lg mr-3 transition-all duration-300 ${
                  isActive ? 'bg-white/20' : 'bg-gray-100 group-hover:bg-white/20'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse-custom"></div>
                )}
              </Link>
            );
          })}
        </nav>
        
        {/* Footer */}
        <div className="flex-shrink-0 p-4 bg-white border-t border-gray-100">
          <div className="space-y-2">
            <Link
              to="/admin/settings"
              className="flex items-center px-4 py-3 text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 rounded-xl transition-all duration-300 w-full"
            >
              <Settings className="w-5 h-5 mr-3" />
              Settings
            </Link>
            <button 
              onClick={handleLogout}
              className="flex items-center px-4 py-3 text-gray-700 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300 w-full"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-gray-50">
        <main className="p-8">
          <div className="animate-fadeInUp">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;