import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ImageGeneration from './pages/ImageGeneration';
import MusicGeneration from './pages/MusicGeneration';
import TextGeneration from './pages/TextGeneration';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/image-generation" element={<ImageGeneration />} />
        <Route path="/music-generation" element={<MusicGeneration />} />
        <Route path="/text-generation" element={<TextGeneration />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;