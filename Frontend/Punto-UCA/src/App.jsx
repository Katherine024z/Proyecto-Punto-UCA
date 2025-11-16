import React from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';

import Home from './modulos/Home';
import NuevoEvento from './modulos/NuevoEvento';
import EventosFiltrados from './modulos/EventosFiltrados';

import {GestorSesion} from './utilidades/contexto';

import './styles/layout.css'; 

function App() {
  return (
    <GestorSesion>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nuevo-evento" element={<NuevoEvento />} />
        <Route path="/eventos/categoria/:categoriaNombre" element={<EventosFiltrados />} />
        <Route path="/eventos/categoria" element={<Navigate to="/" replace />} />
        <Route path="/eventos" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
    </GestorSesion>
  );
}

export default App;