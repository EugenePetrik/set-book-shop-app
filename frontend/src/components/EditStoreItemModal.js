import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

import '../styles/components/EditStoreItemModal.css';

Modal.setAppElement('#root');

const EditStoreItemModal = ({ isOpen, onRequestClose, storeItem, onSave }) => {
  const [formData, setFormData] = useState({
    productId: '',
    available: '',
    booked: '',
    delivered: '',
  });

  useEffect(() => {
    if (storeItem) {
      setFormData({
        productId: storeItem.product._id,
        available: storeItem.available_qty,
        booked: storeItem.booked_qty,
        delivered: storeItem.sold_qty,
      });
    }
  }, [storeItem]);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Store Item"
      className="modal edit-store-item-modal"
    >
      <h2>Edit Store Item</h2>
      <form>
        <div>
          <label htmlFor="productId">Product ID:</label>
          <input
            type="text"
            name="productId"
            value={formData.productId}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="available">Available:</label>
          <input
            type="text"
            name="available"
            value={formData.available}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="booked">Booked:</label>
          <input
            type="text"
            name="booked"
            value={formData.booked}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="delivered">Delivered:</label>
          <input
            type="text"
            name="delivered"
            value={formData.delivered}
            onChange={handleChange}
          />
        </div>
        <div className="button-group">
          <button type="button" onClick={onRequestClose}>
            Cancel
          </button>
          <button type="button" onClick={handleSave}>
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditStoreItemModal;
