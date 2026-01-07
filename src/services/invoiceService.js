const API_BASE_URL = 'http://localhost:8080/api/invoices';

export const invoiceService = {

  // ✅ Create invoice (WITH TOKEN)
  createInvoice: async (invoiceData) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("JWT token not found. Please login again.");
      }

      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // 🔥 THIS FIXES 403
        },
        body: JSON.stringify(invoiceData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();

    } catch (error) {
      console.error('Error creating invoice:', error);
      throw error;
    }
  },

  // ✅ Get all invoices
  getAllInvoices: async () => {
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        throw new Error("Authentication required. Please login again.");
      }

      const response = await fetch(API_BASE_URL, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 401) {
        localStorage.removeItem('token');
        throw new Error("Session expired. Please login again.");
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json();
      console.log('Raw API response:', data);
      return data;

    } catch (error) {
      console.error('Error fetching invoices:', error);
      throw error;
    }
  },

  // ✅ Get invoice by ID
  getInvoiceById: async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_BASE_URL}/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}` // 🔥 REQUIRED
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();

    } catch (error) {
      console.error('Error fetching invoice:', error);
      throw error;
    }
  },

  // ✅ Delete invoice
  deleteInvoice: async (id) => {
    try {
      const token = localStorage.getItem("token");
      
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return true;
    } catch (error) {
      console.error('Error deleting invoice:', error);
      throw error;
    }
  },

  // ✅ Update invoice
  updateInvoice: async (id, invoiceData) => {
    try {
      const token = localStorage.getItem("token");
      
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(invoiceData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating invoice:', error);
      throw error;
    }
  },
};
