import React from "react";
import { Link } from 'react-router-dom';

function CategoriasAside({ isVisible, toggleSidebar }) {
  return (
    <aside
      className={`barra-lateral ${isVisible ? "barra-abierta" : "barra-cerrada"
        }`}
    >
      <button onClick={toggleSidebar} className="boton-lateral">
        {isVisible ? "←" : "→"}
      </button>

      <div className="contenido-lateral">
        <h3>Categorías</h3>
        <ul>
          <li><Link to="/eventos/categoria/Académico">Académicos</Link></li>
          <li><Link to="/eventos/categoria/Deportivo">Deportivos</Link></li>
          <li><Link to="/eventos/categoria/Cultural">Culturales</Link></li>
          <li><Link to="/eventos/categoria/Social">Sociales</Link></li>
          <li><Link to="/eventos/categoria/Tecnológico">Tecnológicos</Link></li>
          <li><Link to="/eventos/categoria/Salud y Bienestar">Salud y Bienestar</Link></li>
          <li><Link to="/eventos/categoria/Emprendimiento">Emprendimientos</Link></li>
          <li><Link to="/eventos/categoria/Desarrollo profesional">Desarrollo profesional</Link></li>
          <li><Link to="/eventos/categoria/Religioso">Religiosos</Link></li>
        </ul>
      </div>
    </aside>
  );
}

export default CategoriasAside;
