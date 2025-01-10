import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

import '../styles/components/EditProductModal.css';

Modal.setAppElement('#root');

const EditProductModal = ({ isOpen, onRequestClose, product, onSave }) => {
  const [formData, setFormData] = useState({
    productId: product?.id || '',
    name: product?.name || '',
    author: product?.author || '',
    price: product?.price || '',
    description: product?.description || '',
    image_path: product?.image_path || '',
  });

  useEffect(() => {
    setFormData({
      productId: product?.id || '',
      name: product?.name || '',
      author: product?.author || '',
      price: product?.price || '',
      description: product?.description || '',
      image_path: product?.image_path || '',
    });
  }, [product]);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    onSave(product.id, formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Product"
      className="modal edit-product-modal"
    >
      <h2>Edit Product</h2>
      <form>
        <div>
          <label htmlFor="productId">Product ID:</label>
          <input type="text" name="productId" value={formData.productId} readOnly />
        </div>
        <div>
          <label htmlFor="name">Product Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="image_path">Image URL:</label>
          <input
            type="text"
            name="image_path"
            value={formData.image_path}
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

export default EditProductModal;
