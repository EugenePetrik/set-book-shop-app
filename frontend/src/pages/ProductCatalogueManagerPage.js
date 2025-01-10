import React, { useState, useEffect } from 'react';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/productApi';
import EditProductModal from '../components/EditProductModal';
import Notification from '../components/Notification';

import '../styles/pages/ProductCatalogueManagerPage.css';

const ProductCatalogueManagerPage = () => {
  const [formData, setFormData] = useState({
    productId: '',
    name: '',
    author: '',
    price: '',
    image_path: '',
  });

  const [products, setProducts] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        if (Array.isArray(productsData.data)) {
          setProducts(productsData.data);
        } else {
          setProducts([]);
        }
      } catch (error) {
        setNotification({ message: 'Failed to fetch products', type: 'error' });
      }
    };

    fetchProducts();
  }, []);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = async e => {
    e.preventDefault();
    // TODO: Implement the product search functionality
  };

  const handleCreateProduct = async () => {
    try {
      await createProduct(formData);
      setNotification({ message: 'Product created successfully', type: 'success' });
      // Refresh products list
      const productsData = await getProducts();
      setProducts(productsData.data);
    } catch (error) {
      setNotification({ message: 'Failed to create product', type: 'error' });
    }
  };

  const handleUpdateProduct = async (productId, updatedProduct) => {
    try {
      await updateProduct(productId, updatedProduct);
      setNotification({ message: 'Product updated successfully', type: 'success' });
      // Refresh products list
      const productsData = await getProducts();
      setProducts(productsData.data);
      setSelectedProduct(null); // Close modal after saving
    } catch (error) {
      setNotification({ message: 'Failed to update product', type: 'error' });
    }
  };

  const handleDeleteProduct = async productId => {
    try {
      await deleteProduct(productId);
      setNotification({ message: 'Product deleted successfully', type: 'success' });
      // Refresh products list
      const productsData = await getProducts();
      setProducts(productsData.data);
    } catch (error) {
      setNotification({ message: 'Failed to delete product', type: 'error' });
    }
  };

  const openEditProductModal = productId => {
    const product = products.find(item => item.id === productId);
    if (product) {
      setSelectedProduct(product);
    }
  };

  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="container product-catalogue-manager-page">
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: '', type: '' })}
        />
      )}
      <form className="search-form" onSubmit={handleSearch}>
        <div className="form-group">
          <label htmlFor="productId">Product ID</label>
          <input
            type="text"
            name="productId"
            value={formData.productId}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div className="search-button-container">
          <button type="submit" className="search-button">
            Search
          </button>
        </div>
      </form>
      <h3>Search Results</h3>
      <div className="product-grid">
        {currentProducts.map(product => (
          <div className="product-card" key={product.id}>
            <img src={product.image_path} alt={product.name} className="product-image" />
            <h3 className="product-title">{product.name}</h3>
            <p className="product-id">Product ID: {product.id}</p>
            <p className="product-description">Description: {product.description}</p>
            <p className="product-author">Author: {product.author}</p>
            <p className="product-price">Price: ${product.price}</p>
            <div className="button-group">
              <button
                className="edit-button"
                onClick={() => openEditProductModal(product.id)}
              >
                Edit
              </button>
              <button
                className="delete-button"
                onClick={() => handleDeleteProduct(product.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="actions-pagination-container">
        <div className="actions">
          <button onClick={handleCreateProduct} className="create-button">
            Create
          </button>
        </div>
        <div className="pagination pagination-with-buttons">
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          {[...Array(Math.ceil(products.length / productsPerPage)).keys()].map(number => (
            <button
              key={number + 1}
              onClick={() => paginate(number + 1)}
              className={number + 1 === currentPage ? 'active' : ''}
            >
              {number + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(products.length / productsPerPage)}
          >
            Next
          </button>
        </div>
      </div>
      {selectedProduct && (
        <EditProductModal
          isOpen={!!selectedProduct}
          onRequestClose={() => setSelectedProduct(null)}
          product={selectedProduct}
          onSave={handleUpdateProduct}
        />
      )}
    </div>
  );
};

export default ProductCatalogueManagerPage;
