import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/Login/LoginPage';
import ProductPage from './components/Products/ProductPage';
import ProductDetail from './components/ProductDetail/ProductDetail';
import CartPage from './components/CartPage/CartPage';  
import PrivateRoute from './components/PrivateRoute';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleAddSuccess = () => {
    toast.success('Item added successfully!');
  };

  return (
    <Router>
      <ToastContainer position="top-center" />
      <Routes>
        {}
        <Route path="/" element={<LoginPage onLogin={handleLogin} />} />

        {}
        <Route 
          path="/products" 
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <ProductPage 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm} 
                onAddItem={handleAddSuccess} 
              />
            </PrivateRoute>
          } 
        />

        {}
        <Route 
          path="/products/:id" 
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <ProductDetail />
            </PrivateRoute>
          }
        />

        {}
        <Route 
          path="/cart" 
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <CartPage />  {}
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
