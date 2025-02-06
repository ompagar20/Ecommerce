import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, newProduct, handleInputChange, handleAddProduct }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>X</button>
        <h2>Add New Product</h2>
        <form onSubmit={handleAddProduct}>
          <div className="input-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={newProduct.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Description</label>
            <textarea
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Image URL</label>
            <input
              type="text"
              name="image"
              value={newProduct.image}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
