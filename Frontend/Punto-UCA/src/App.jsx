import React from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import Home from './modulos/Home';
import Login from './modulos/Login';
import NuevoEvento from './modulos/NuevoEvento';
import EventosFiltrados from './modulos/EventosFiltrados';
import './styles/layout.css'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/nuevo-evento" element={<NuevoEvento />} />
        <Route path="/eventos/categoria/:categoriaNombre" element={<EventosFiltrados />} />
        <Route path="/eventos/categoria" element={<Navigate to="/" replace />} />
        <Route path="/eventos" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;