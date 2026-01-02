import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, X } from 'lucide-react';

const Products = () => {
  const [showFrameModal, setShowFrameModal] = useState(false);
  const [showLensModal, setShowLensModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [frameForm, setFrameForm] = useState({ name: '', price: '', stock: '', sku: '' });
  const [lensForm, setLensForm] = useState({ name: '', price: '', stock: '', sku: '' });
  const [editForm, setEditForm] = useState({ id: '', name: '', price: '', stock: '', sku: '', category: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [products, setProducts] = useState([
    { id: 1, name: 'Ray-Ban Aviator', category: 'Frame', price: 8000, stock: 25, sku: 'RB-AV-001' },
    { id: 2, name: 'Oakley Sports', category: 'Frame', price: 12000, stock: 15, sku: 'OK-SP-001' },
    { id: 3, name: 'Classic Frame', category: 'Frame', price: 5000, stock: 30, sku: 'CF-001' },
    { id: 4, name: 'Progressive Lens', category: 'Lens', price: 8500, stock: 50, sku: 'PL-001' },
    { id: 5, name: 'Single Vision', category: 'Lens', price: 3500, stock: 100, sku: 'SV-001' },
    { id: 6, name: 'Blue Light Filter', category: 'Lens', price: 4500, stock: 75, sku: 'BLF-001' },
  ]);

  const addFrame = () => {
    if (!frameForm.name || !frameForm.price || !frameForm.stock || !frameForm.sku) {
      alert('Please fill all fields');
      return;
    }
    const newFrame = {
      id: products.length + 1,
      name: frameForm.name,
      category: 'Frame',
      price: parseInt(frameForm.price),
      stock: parseInt(frameForm.stock),
      sku: frameForm.sku
    };
    setProducts(prev => [...prev, newFrame]);
    setFrameForm({ name: '', price: '', stock: '', sku: '' });
    setShowFrameModal(false);
  };

  const addLens = () => {
    if (!lensForm.name || !lensForm.price || !lensForm.stock || !lensForm.sku) {
      alert('Please fill all fields');
      return;
    }
    const newLens = {
      id: products.length + 1,
      name: lensForm.name,
      category: 'Lens',
      price: parseInt(lensForm.price),
      stock: parseInt(lensForm.stock),
      sku: lensForm.sku
    };
    setProducts(prev => [...prev, newLens]);
    setLensForm({ name: '', price: '', stock: '', sku: '' });
    setShowLensModal(false);
  };

  const deleteProduct = (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(product => product.id !== id));
    }
  };

  const editProduct = (product) => {
    setEditForm({
      id: product.id,
      name: product.name,
      price: product.price.toString(),
      stock: product.stock.toString(),
      sku: product.sku,
      category: product.category
    });
    setShowEditModal(true);
  };

  const updateProduct = () => {
    if (!editForm.name || !editForm.price || !editForm.stock || !editForm.sku) {
      alert('Please fill all fields');
      return;
    }
    setProducts(prev => prev.map(product => 
      product.id === editForm.id 
        ? { ...product, name: editForm.name, price: parseInt(editForm.price), stock: parseInt(editForm.stock), sku: editForm.sku }
        : product
    ));
    setShowEditModal(false);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === '' || product.category.toLowerCase() === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Products</h1>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowFrameModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Frame
          </button>
          <button 
            onClick={() => setShowLensModal(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Lens
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              <option value="frame">Frames</option>
              <option value="lens">Lenses</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">{product.sku}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-semibold">₹{product.price.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      product.stock > 20 ? 'bg-green-100 text-green-800' : 
                      product.stock > 10 ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {product.stock} units
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => editProduct(product)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deleteProduct(product.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Frame Modal */}
      {showFrameModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Frame</h2>
              <button onClick={() => setShowFrameModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Frame Name"
                value={frameForm.name}
                onChange={(e) => setFrameForm(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Price"
                value={frameForm.price}
                onChange={(e) => setFrameForm(prev => ({ ...prev, price: e.target.value }))}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Stock Quantity"
                value={frameForm.stock}
                onChange={(e) => setFrameForm(prev => ({ ...prev, stock: e.target.value }))}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="SKU"
                value={frameForm.sku}
                onChange={(e) => setFrameForm(prev => ({ ...prev, sku: e.target.value }))}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button 
                onClick={() => setShowFrameModal(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button onClick={addFrame} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Add Frame
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Lens Modal */}
      {showLensModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Lens</h2>
              <button onClick={() => setShowLensModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Lens Name"
                value={lensForm.name}
                onChange={(e) => setLensForm(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Price"
                value={lensForm.price}
                onChange={(e) => setLensForm(prev => ({ ...prev, price: e.target.value }))}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Stock Quantity"
                value={lensForm.stock}
                onChange={(e) => setLensForm(prev => ({ ...prev, stock: e.target.value }))}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="SKU"
                value={lensForm.sku}
                onChange={(e) => setLensForm(prev => ({ ...prev, sku: e.target.value }))}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button 
                onClick={() => setShowLensModal(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button onClick={addLens} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                Add Lens
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Edit {editForm.category}</h2>
              <button onClick={() => setShowEditModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Product Name"
                value={editForm.name}
                onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Price"
                value={editForm.price}
                onChange={(e) => setEditForm(prev => ({ ...prev, price: e.target.value }))}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Stock Quantity"
                value={editForm.stock}
                onChange={(e) => setEditForm(prev => ({ ...prev, stock: e.target.value }))}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="SKU"
                value={editForm.sku}
                onChange={(e) => setEditForm(prev => ({ ...prev, sku: e.target.value }))}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button 
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={updateProduct}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;