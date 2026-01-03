import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import EmployeeLayout from './components/EmployeeLayout';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import EmployeeLogin from './pages/EmployeeLogin';
import Dashboard from './pages/Dashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import Customers from './pages/Customers';
import Products from './pages/Products';
import CreateOpticalInvoice from './pages/CreateOpticalInvoice';
import InvoiceList from './pages/InvoiceList';
import Payments from './pages/Payments';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import EmployeeManagement from './pages/EmployeeManagement';
import AdminProfile from './pages/AdminProfile';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />
        
        {/* Login Pages */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/employee-login" element={<EmployeeLogin />} />
        
        {/* Employee Routes */}
        <Route path="/employee" element={<EmployeeLayout><EmployeeDashboard /></EmployeeLayout>} />
        <Route path="/employee/customers" element={<EmployeeLayout><Customers /></EmployeeLayout>} />
        <Route path="/employee/products" element={<EmployeeLayout><Products /></EmployeeLayout>} />
        <Route path="/employee/create-invoice" element={<EmployeeLayout><CreateOpticalInvoice /></EmployeeLayout>} />
        <Route path="/employee/invoices" element={<EmployeeLayout><InvoiceList /></EmployeeLayout>} />
        <Route path="/employee/payments" element={<EmployeeLayout><Payments /></EmployeeLayout>} />
        <Route path="/employee/settings" element={<EmployeeLayout><Settings /></EmployeeLayout>} />
        
        {/* Admin/Owner Routes */}
        <Route path="/admin" element={<Layout><Dashboard /></Layout>} />
        <Route path="/admin/customers" element={<Layout><Customers /></Layout>} />
        <Route path="/admin/products" element={<Layout><Products /></Layout>} />
        <Route path="/admin/create-invoice" element={<Layout><CreateOpticalInvoice /></Layout>} />
        <Route path="/admin/invoices" element={<Layout><InvoiceList /></Layout>} />
        <Route path="/admin/payments" element={<Layout><Payments /></Layout>} />
        <Route path="/admin/reports" element={<Layout><Reports /></Layout>} />
        <Route path="/admin/employees" element={<Layout><EmployeeManagement /></Layout>} />
        <Route path="/admin/profile" element={<Layout><AdminProfile /></Layout>} />
        <Route path="/admin/settings" element={<Layout><Settings /></Layout>} />
      </Routes>
    </Router>
  );
};

export default App;