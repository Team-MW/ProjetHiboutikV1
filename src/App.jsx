import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ProductsPage from './pages/ProductsPage';
import POSPage from './pages/POSPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-stone-950 text-white font-sans selection:bg-yellow-500/30">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/pos" element={<POSPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
