import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import NuevoEvento from './components/NuevoEvento';
import './styles/layout.css'; // Importa el CSS global

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/nuevo-evento" element={<NuevoEvento />} />
      </Routes>
    </Router>
  );
}


export default App;