import React from 'react';
import { useParams } from 'react-router-dom';

function OrderConfirmation() {
  const { orderId } = useParams(); // Get order ID from URL

  return (
    <div>
      <h2>Order Confirmation</h2>
      <p>Thank you for your order!</p>
      <p>Your order ID is: {orderId}</p>
    </div>
  );
}

export default OrderConfirmation;
