import React, { useState, useEffect } from 'react';
import {
  getStoreItems,
  createStoreItem,
  updateStoreItem,
  deleteStoreItem,
} from '../services/storeItems';
import EditStoreItemModal from '../components/EditStoreItemModal';
import Notification from '../components/Notification';

import '../styles/pages/StorePage.css';

const StorePage = () => {
  const [formData, setFormData] = useState({
    productName: '',
    author: '',
    productId: '',
    availableQuantity: '',
    bookedQuantity: '',
    deliveredQuantity: '',
  });

  const [storeItems, setStoreItems] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStoreItem, setSelectedStoreItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchStoreItems = async () => {
      try {
        const storeItemsData = await getStoreItems();
        if (Array.isArray(storeItemsData.data)) {
          setStoreItems(storeItemsData.data);
        } else {
          setStoreItems([]);
        }
      } catch (error) {
        setNotification({ message: 'Failed to fetch store items', type: 'error' });
      }
    };

    fetchStoreItems();
  }, []);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = async e => {
    e.preventDefault();
    // TODO: Implement the store search functionality
  };

  const handleCreateStoreItem = async () => {
    try {
      await createStoreItem(formData);
      setNotification({ message: 'Store item created successfully', type: 'success' });
      // Refresh store items list
      const storeItemsData = await getStoreItems();
      setStoreItems(storeItemsData.data);
    } catch (error) {
      setNotification({ message: 'Failed to create store item', type: 'error' });
    } finally {
    }
  };

  const handleOpenEditModal = () => {
    setIsModalOpen(true);
  };

  const handleSaveStoreItem = async (storeId, updatedStoreItem) => {
    try {
      await updateStoreItem(storeId, updatedStoreItem);
      setNotification({ message: 'Store item updated successfully', type: 'success' });
      // Refresh store items list
      const storeItemsData = await getStoreItems();
      setStoreItems(storeItemsData.data);
      setIsModalOpen(false);
    } catch (error) {
      setNotification({ message: 'Failed to update store item', type: 'error' });
    }
  };

  const handleFindAndSaveStoreItem = async formData => {
    try {
      const storeItemsData = await getStoreItems();
      const storeItemsList = storeItemsData.data;
      const storeItem = storeItemsList.find(
        item => item.product._id === formData.productId,
      );
      if (storeItem) {
        await handleSaveStoreItem(storeItem._id, {
          product: formData.productId,
          available_qty: formData.available,
          booked_qty: formData.booked,
          sold_qty: formData.delivered,
        });
      } else {
        setNotification({ message: 'Store item not found', type: 'error' });
      }
    } catch (error) {
      setNotification({ message: 'Failed to find and update store item', type: 'error' });
    }
  };

  const handleDeleteStoreItem = async itemId => {
    try {
      await deleteStoreItem(itemId);
      setNotification({ message: 'Store item deleted successfully', type: 'success' });
      // Refresh store items list
      const storeItemsData = await getStoreItems();
      setStoreItems(storeItemsData.data);
    } catch (error) {
      setNotification({ message: 'Failed to delete store item', type: 'error' });
    }
  };

  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Get current store items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStoreItems = storeItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container store-page">
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: '', type: '' })}
        />
      )}
      <form className="search-form" onSubmit={handleSearch}>
        <div className="form-group">
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
          />
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
          <label htmlFor="productId">Product ID</label>
          <input
            type="text"
            name="productId"
            value={formData.productId}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="availableQuantity">Available Quantity</label>
          <input
            type="text"
            name="availableQuantity"
            value={formData.availableQuantity}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="bookedQuantity">Booked Quantity</label>
          <input
            type="text"
            name="bookedQuantity"
            value={formData.bookedQuantity}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="deliveredQuantity">Delivered Quantity</label>
          <input
            type="text"
            name="deliveredQuantity"
            value={formData.deliveredQuantity}
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
      <table className="table store-table">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Author</th>
            <th>Available</th>
            <th>Booked</th>
            <th>Delivered</th>
          </tr>
        </thead>
        <tbody>
          {currentStoreItems.map(item => (
            <tr key={item._id}>
              <td>{item.product._id}</td>
              <td>{item.product.name}</td>
              <td>{item.product.author}</td>
              <td>{item.available_qty}</td>
              <td>{item.booked_qty}</td>
              <td>{item.sold_qty}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="actions-pagination-container">
        <div className="actions">
          <button onClick={handleCreateStoreItem} className="create-button">
            Create
          </button>
          <button onClick={handleDeleteStoreItem} className="delete-button">
            Delete
          </button>
          <button onClick={handleOpenEditModal} className="edit-button">
            Edit
          </button>
        </div>
        <div className="pagination pagination-with-buttons">
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          {[...Array(Math.ceil(storeItems.length / itemsPerPage)).keys()].map(number => (
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
            disabled={currentPage === Math.ceil(storeItems.length / itemsPerPage)}
          >
            Next
          </button>
        </div>
      </div>
      <EditStoreItemModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        storeItem={selectedStoreItem}
        onSave={handleFindAndSaveStoreItem}
      />
    </div>
  );
};

export default StorePage;
