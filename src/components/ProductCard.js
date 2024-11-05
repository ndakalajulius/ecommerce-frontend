import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <div>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <Link to={`/product/${product._id}`}>View Details</Link>
    </div>
  );
}

export default ProductCard;
