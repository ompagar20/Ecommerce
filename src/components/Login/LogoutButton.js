import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLogout } from 'react-icons/ai'; 

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/');
  };

  return (
    <button onClick={handleLogout} className="logout-btn">
      <AiOutlineLogout size={20} style={{ marginRight: '8px' }} /> Logout
    </button>
  );
};

export default LogoutButton;
