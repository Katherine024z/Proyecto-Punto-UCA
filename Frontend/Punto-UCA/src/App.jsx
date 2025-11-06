import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import NuevoEvento from './components/NuevoEvento';
import EventosFiltrados from './components/EventosFiltrados';
import './styles/layout.css'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/nuevo-evento" element={<NuevoEvento />} />
        <Route path="/eventos/categoria/:categoriaNombre" element={<EventosFiltrados />} />
      </Routes>
    </Router>
  );
}

export default App;