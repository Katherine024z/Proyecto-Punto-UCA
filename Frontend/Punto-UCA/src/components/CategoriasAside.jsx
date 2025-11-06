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
          <li>
            <link href="#">Académicos</link>
          </li>
          <li>
            <link href="#">Deportivos</link>
          </li>
          <li>
            <link href="#">Culturales</link>
          </li>
          <li>
            <link href="#">Sociales</link>
          </li>
          <li>
            <link href="#">Tecnológicos</link>
          </li>
          <li>
            <link href="#">Salud y Bienestar </link>
          </li>
          <li>
            <link href="#">Emprendimientos</link>
          </li>
          <li>
            <link href="#">Desarrollo profesional</link>
          </li>
          <li>
            <link href="#">Religiosos</link>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default CategoriasAside;
