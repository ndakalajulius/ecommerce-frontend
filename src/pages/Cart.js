import React, { useEffect, useState } from 'react';
import API from '../api';  // Axios instance configured to point to your backend
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      const response = await API.get('/api/cart'); // Adjust API endpoint as needed
      setCartItems(response.data);
      setLoading(false);
    };
    fetchCartItems();
  }, []);

  const updateQuantity = async (itemId, quantity) => {
    const response = await API.put(`/api/cart/${itemId}`, { quantity });
    setCartItems(response.data); // Update cart items after modifying quantity
  };

  const removeItem = async (itemId) => {
    await API.delete(`/api/cart/${itemId}`);
    setCartItems(cartItems.filter(item => item.id !== itemId)); // Remove item from local state
  };

  const handleCheckout = () => {
    navigate('/checkout'); // Redirect to Checkout page
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>
              <h4>{item.name}</h4>
              <p>Price: ${item.price}</p>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, e.target.value)}
              />
              <button onClick={() => removeItem(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      {cartItems.length > 0 && (
        <button onClick={handleCheckout}>Proceed to Checkout</button>
      )}
    </div>
  );
}

export default Cart;
