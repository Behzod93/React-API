import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'; // 1. Link va Router import qilindi
import './App.css';
import Single from './Single'; // 2. Single komponentini to'g'ri import qiling

// Bu asosiy sahifa komponenti (Mahsulotlar ro'yxati)
const Home = () => {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(true);

  const getdata = () => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setState(data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Xatolik:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getdata();
  }, []);

  if (loading) {
    return <h1 style={{ textAlign: 'center' }}>Loading...</h1>;
  }

  return (
    <div className="product-container">
      {state.map((item) => (
        <div key={item.id} className="product-card">
          {/* 3. Link endi to'g'ri ishlaydi */}
          <Link to={`/product/${item.id}`}>
            <img 
              src={item.thumbnail} 
              alt={item.title} 
              style={{ cursor: 'pointer', width: '100%' }} 
            />
          </Link>
          <h1>{item.title}</h1>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

// 4. Asosiy App komponentida Router-ni sozlaymiz
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Single />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;