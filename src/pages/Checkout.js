import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await API.post('/api/orders', { address });
      navigate(`/order-confirmation/${response.data.orderId}`); // Redirect to order confirmation page
    } catch (error) {
      console.error('Order creation failed', error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <form onSubmit={handleOrder}>
        <div>
          <label>Shipping Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
}

export default Checkout;
