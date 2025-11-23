import React, {useContext} from "react";
import { Link } from "react-router-dom";


import logoPuntoUca from "../images/logoPuntoUca.png";
import BarraBusqueda from "./BarraBusqueda";

import { ContextoSesion } from "../utilidades/contexto";


import "../styles/IconoBoton.css";

const Header = ({ busqueda, consulta }) => {

  const { sesionInfo,logout,cambioLoginModal} = useContext(ContextoSesion);

  return (
    <header>

      <div className="logo">
        <Link to="/">
        <img src={logoPuntoUca} alt="PuntoUca" />
        </Link>
      </div>

      <div className="contenedor-inicio-busqueda">
        <Link to="/" className="opcion-icono">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="24"
            height="24"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span className="opcion-texto">Inicio</span>
        </Link>

  
        <BarraBusqueda busqueda={busqueda} consulta={consulta} />

      </div>

      <nav className="menu">
        <Link to="/nuevo-evento" className="opcion-icono">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="24"
            height="24"
          >
            <path d="M9 18h6" />
            <path d="M10 22h4" />
            <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8a6 6 0 0 0-12 0c0 1.33.47 2.48 1.4 3.5.76.76 1.23 1.52 1.41 2.5" />
          </svg>
          <span className="opcion-texto">Proponer Evento</span>
        </Link>
        
        {sesionInfo.token ? (
          
          <>
            <Link to="/" className="opcion-icono">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                width="24"
                height="24"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span className="opcion-texto">
                {sesionInfo.usuario ? sesionInfo.usuario.nombre : 'Perfil'}
              </span>
            </Link>

            <a href="/" onClick={logout} className="opcion-icono">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M18.36 6.64a9 9 0 1 1-12.73 0"/>
                <line x1="12" y1="2" x2="12" y2="12"/>
              </svg>
              <span className="opcion-texto">Cerrar sesión</span>
            </a>
          </>
        ) : (
          <a href="/" className="opcion-icono" 
            onClick={(e) =>{
              e.preventDefault();
              cambioLoginModal();
            }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              width="24"
              height="24"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span className="opcion-texto">Iniciar sesión</span>
          </a>
        )}
      </nav>
    </header>
  );
};

export default Header;

