import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const Single = () => {
  const { id } = useParams(); // URL dagi ID ni oladi
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) return <h1>Yuklanmoqda...</h1>;

  return (
    <div style={{ padding: '20px', textAlign: 'center'}}>
      <Link border="1px solid" to="/">🔙 Orqaga qaytish</Link>
      <hr />
      <img src={product.thumbnail} alt={product.title} width="300" />
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <h2>Narxi: ${product.price}</h2>
      <p>Brend: {product.brand}</p>
    </div>
  );
};
export default Single;