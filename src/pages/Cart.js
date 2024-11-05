import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { cartItems, updateQuantity, removeFromCart } = useContext(CartContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      setError('Your cart is empty.');
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id}>
              <p>{item.name}</p>
              <p>Price: ${item.price}</p>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, e.target.value)}
                min="1"
              />
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
          <h3>Total: ${cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}</h3>
          <button onClick={handleCheckout}>Proceed to Checkout</button>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Cart;
