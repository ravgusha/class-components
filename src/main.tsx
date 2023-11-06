import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './containers/Homepage';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/search/1" />} />
        <Route path="/search/:page" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
