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
          <li><Link to="/eventos/categoria/Académicos">Académicos</Link></li>
          <li><Link to="/eventos/categoria/Deportivos">Deportivos</Link></li>
          <li><Link to="/eventos/categoria/Culturales">Culturales</Link></li>
          <li><Link to="/eventos/categoria/Sociales">Sociales</Link></li>
          <li><Link to="/eventos/categoria/Tecnológicos">Tecnológicos</Link></li>
          <li><Link to="/eventos/categoria/Salud y Bienestar">Salud y Bienestar</Link></li>
          <li><Link to="/eventos/categoria/Emprendimientos">Emprendimientos</Link></li>
          <li><Link to="/eventos/categoria/Desarrollo profesional">Desarrollo profesional</Link></li>
          <li><Link to="/eventos/categoria/Religiosos">Religiosos</Link></li>
        </ul>
      </div>
    </aside>
  );
}

export default CategoriasAside;
