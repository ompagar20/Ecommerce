import React from 'react';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose, filters, setFilters }) => {
  const handleCategoryChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      category: e.target.value,
    }));
  };

  const handlePriceChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      price: e.target.value,
    }));
  };

  const handleClearFilters = () => {
    setFilters({ category: '', price: '' });
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-button" onClick={onClose}>Close</button>
      <h3>Filter by Category</h3>
      <select onChange={handleCategoryChange} value={filters.category}>
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="jewelery">Jewelry</option>
        <option value="men's clothing">Men's Clothing</option>
        <option value="women's clothing">Women's Clothing</option>
      </select>
      <h3>Filter by Price</h3>
      <select onChange={handlePriceChange} value={filters.price}>
        <option value="">Select Price</option>
        <option value="asc">Low to High</option>
        <option value="desc">High to Low</option>
      </select>
      <button onClick={handleClearFilters}>Clear Filters</button>
    </div>
  );
};

export default Sidebar;
