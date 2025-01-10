import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/productApi';
import CreateBookingModal from '../components/CreateBookingModal';
import { createBooking } from '../services/bookingApi';
import Notification from '../components/Notification';

import '../styles/pages/ProductCatalogueCustomerPage.css';

const ProductCatalogueCustomerPage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const productsPerPage = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData.data);
      } catch (error) {
        setNotification({ message: 'Failed to fetch products', type: 'error' });
      }
    };

    fetchProducts();
  }, []);

  const handleBookClick = product => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleSaveBooking = async bookingData => {
    try {
      await createBooking(bookingData);
      setIsModalOpen(false);
      setNotification({ message: 'Booking created successfully', type: 'success' });
    } catch (error) {
      setNotification({ message: 'Failed to create booking', type: 'error' });
    }
  };

  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="container product-catalogue-customer-page">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <div className="product-grid">
        {currentProducts.map(product => (
          <div className="product-card" key={product._id}>
            <img src={product.image_path} alt={product.name} className="product-image" />
            <h3 className="product-title">{product.name}</h3>
            <p className="product-description">Description: {product.description}</p>
            <p className="product-author">Author: {product.author}</p>
            <p className="product-price">Price: ${product.price.toFixed(2)}</p>
            <button className="book-button" onClick={() => handleBookClick(product)}>
              Book
            </button>
          </div>
        ))}
      </div>
      <div className="pagination pagination-without-buttons">
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
      {selectedProduct && (
        <CreateBookingModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          product={selectedProduct}
          onSave={handleSaveBooking}
        />
      )}
    </div>
  );
};

export default ProductCatalogueCustomerPage;
