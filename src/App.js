import React from 'react';
import { Routes, Route } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Cart from './pages/Cart';
import FullSushi from './pages/FullSushi';
import NotFound from './pages/NotFound';

import './scss/app.scss';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="sushi-app/" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="sushi/:id" element={<FullSushi />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
