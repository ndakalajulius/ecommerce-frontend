import React, { useEffect, useState } from 'react';
import API from '../api'; // Axios instance configured to point to your backend
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    address: '',
    city: '',
    zip: '',
    country: '',
  });
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Load cart items from localStorage
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);

    // Calculate total amount
    const amount = storedCart.reduce((total, item) => total + item.price * item.quantity, 0);
    setTotalAmount(amount);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        items: cartItems,
        shippingAddress,
        totalAmount,
      };
      const response = await API.post('/api/orders', orderData);
      if (response.status === 201) {
        // Clear the cart
        localStorage.removeItem('cart');
        // Redirect to order confirmation page
        navigate(`/order-confirmation/${response.data._id}`);
      }
    } catch (error) {
      console.error('Order creation failed:', error);
      alert('Failed to create order. Please try again.');
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <h3>Shipping Information</h3>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={shippingAddress.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={shippingAddress.address}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={shippingAddress.city}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="zip"
          placeholder="ZIP Code"
          value={shippingAddress.zip}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={shippingAddress.country}
          onChange={handleInputChange}
          required
        />
        <h3>Order Summary</h3>
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>
              {item.name} - ${item.price} x {item.quantity}
            </li>
          ))}
        </ul>
        <p>Total Amount: ${totalAmount.toFixed(2)}</p>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}

export default Checkout;
