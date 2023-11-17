import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Landing from './Pages/Landing';
import CoverNote from './Pages/CoverNote';
import CoverLetter from './Pages/CoverLetter'

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/CoverNote" element={<CoverNote />} />
        <Route path="/CoverLetter" element={<CoverLetter />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
