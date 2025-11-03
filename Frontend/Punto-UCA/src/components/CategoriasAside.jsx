import React from "react";

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
            <a href="#">Académicos</a>
          </li>
          <li>
            <a href="#">Deportivos</a>
          </li>
          <li>
            <a href="#">Culturales</a>
          </li>
          <li>
            <a href="#">Sociales</a>
          </li>
          <li>
            <a href="#">Tecnológicos</a>
          </li>
          <li>
            <a href="#">Salud y Bienestar </a>
          </li>
          <li>
            <a href="#">Emprendimientos</a>
          </li>
          <li>
            <a href="#">Desarrollo profesional</a>
          </li>
          <li>
            <a href="#">Religiosos</a>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default CategoriasAside;
