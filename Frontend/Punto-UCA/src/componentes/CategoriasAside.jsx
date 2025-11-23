import React from "react";
import { Link, useParams } from "react-router-dom";

function CategoriasAside({ isVisible, toggleSidebar }) {
  const { categoriaNombre } = useParams();

  const categorias = [
    "Académico",
    "Deportivo",
    "Cultural",
    "Social",
    "Tecnológico",
    "Salud y bienestar",
    "Emprendimiento",
    "Desarrollo profesional",
    "Religioso"
  ];

  return (
    <aside
      className={`barra-lateral ${isVisible ? "barra-abierta" : "barra-cerrada"}
  `}>
      <button onClick={toggleSidebar} className="boton-lateral">
        {isVisible ? "←" : "→"}
      </button>

      <div className="contenido-lateral">
        <h3>Categorías</h3>
        <ul>
          {categorias.map((categoria, index) => (
            <li key={index}>
              <Link to ={`/eventos/categoria/${categoria}?pagina=1`}
                className={categoriaNombre === categoria ? "categoria-activa" : ""}>
                  {categoria}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default CategoriasAside;
