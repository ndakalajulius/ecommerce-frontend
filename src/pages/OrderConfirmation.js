import React from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';

function OrderConfirmation() {
  const { orderId } = useParams();
  const [order, setOrder] = React.useState(null);

  React.useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await API.get(`/api/orders/${orderId}`);
        setOrder(response.data);
      } catch (error) {
        console.error('Failed to fetch order:', error);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (!order) return <p>Loading...</p>;

  return (
    <div>
      <h2>Order Confirmation</h2>
      <p>Thank you for your order!</p>
      <p>Order ID: {order._id}</p>
      <h3>Shipping Address</h3>
      <p>{order.shippingAddress.name}</p>
      <p>{order.shippingAddress.address}</p>
      <p>{order.shippingAddress.city}, {order.shippingAddress.zip}, {order.shippingAddress.country}</p>
      <h3>Order Summary</h3>
      <ul>
        {order.items.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price} x {item.quantity}
          </li>
        ))}
      </ul>
      <p>Total Amount: ${order.totalAmount.toFixed(2)}</p>
    </div>
  );
}

export default OrderConfirmation;
