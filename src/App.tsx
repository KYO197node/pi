import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Article from './pages/Article';
import Subscribe from './pages/Subscribe';
import { PiAuthProvider } from './contexts/PiAuthContext';

function App() {
  return (
    <PiAuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/article/:id" element={<Article />} />
              <Route path="/subscribe" element={<Subscribe />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </PiAuthProvider>
  );
}

export default App;