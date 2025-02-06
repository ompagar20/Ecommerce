import React, { useContext } from 'react';
import AppContext from '../Context/context';
import './CartPage.css';

const CartPage = () => {
    const { cartItems, setCartItems } = useContext(AppContext);

    
    const handleQuantityChange = (productId, delta) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === productId ? { ...item, quantity: item.quantity + delta } : item
            ).filter(item => item.quantity > 0)
        );
    };

   
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    return (
        <div className="cart-page">
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p className="empty-cart">Your cart is empty.</p>
            ) : (
                <div className="cart-container">
                    <div className="cart-items-section">
                        <ul className="cart-items">
                            {cartItems.map((item) => (
                                <li key={item.id} className="cart-item">
                                    <img src={item.image} alt={item.title} />
                                    <div>
                                        <h3>{item.title}</h3>
                                        <p>${item.price}</p>
                                        <div className="quantity-controls">
                                            <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {}
                    <div className="cart-summary-section">
                        <div className="cart-summary">
                            <h3>Cart Summary</h3>
                            <ul>
                                {cartItems.map((item) => (
                                    <li key={item.id} className="summary-item">
                                        <span>{item.title}</span>
                                        <span>${item.price} x {item.quantity}</span>
                                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="total">
                                <span>Total Amount:</span>
                                <span>${calculateTotal().toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
