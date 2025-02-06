import React from 'react';
import './Layout.css';
import LogoutButton from '../Login/LogoutButton'; 
import { PiShoppingCartSimpleBold } from 'react-icons/pi'; 
import { AiOutlineSearch } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Layout = ({ children, searchTerm, setSearchTerm, onAddItem }) => {
  const navigate = useNavigate();

  return (
    <div className="layout">
      <nav className="navbar">
        <h1>Om-Ecommerce</h1>

        <div className="search-box">
          <AiOutlineSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="nav-actions">
          <button 
            className="cart-btn"
            onClick={() => navigate('/cart')}  
          >
            <PiShoppingCartSimpleBold size={24} color="white" />
          </button>
          <button className="add-item-btn" onClick={onAddItem}>
            + Add Item
          </button>
          <LogoutButton />
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
