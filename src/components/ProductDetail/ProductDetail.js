import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../Layout/Layout'; 
import './ProductDetailStyle.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(response => response.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  return (
    <Layout>
      <div className="product-detail">
        {loading ? (
          <p>Loading...</p>
        ) : (
          product && (
            <div className="product-detail-content">
              <img src={product.image} alt={product.title} className="product-image" />
              <div className="product-info">
                <h2>{product.title}</h2>
                <p className="price">${product.price}</p>
                <p className="description">{product.description}</p>
                <p className="category">Category: {product.category}</p>
              </div>
            </div>
          )
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;
