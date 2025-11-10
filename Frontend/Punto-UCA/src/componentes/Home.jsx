import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//importar imagenes
import logoPuntoUca from "../images/logoPuntoUca.png";
import bannerImagen from "../images/evento1.png";
//importar componentes
import TarjetaEvento from "./TarjetaEvento";
import CategoriasAside from "./CategoriasAside";
import PaginacionEventos from "./PaginacionEventos"

const Home = () => {
  //variable de estado y funciones flechas
  const [eventos, setEventos] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [cargando, setCarga] = useState(true);
  const [error, setError] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const eventosPagina = 15;

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    async function fetchEventos() {
      try {
        const respuesta = await fetch(`http://localhost:4000/eventos?pagina=${paginaActual}`);

        if (!respuesta.ok) {
          throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        const datos = await respuesta.json();

        setEventos(datos.eventos);
        setFiltrados(datos.eventos);
        setTotalPaginas(Math.ceil(datos.totalEventos / eventosPagina))
      } catch (err) {
        console.error("Fallo al obtener eventos: ", err);
        setError("No se pudieron cargar los eventos. " + err.message);
      } finally {
        setCarga(false);
      }
    }
    fetchEventos();
  }, [paginaActual]);

  const manejarCambioPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  };

  const handleSearch = (e) => {
    const texto = e.target.value.toLowerCase();
    const filtrados = eventos.filter((ev) =>
      ev.nombre.toLowerCase().includes(texto)
    );
    setFiltrados(filtrados);
  };

  if (cargando) {
    return (
      <>
        <main>
          <h2 className="text-info">Cargando eventos...</h2>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <main>
          <h2 className="text-danger"> Error: {error}</h2>
        </main>
      </>
    );
  }

  //contenido html
  return (
    <>
      <header>
        <div className="logo">
          <img src={logoPuntoUca} alt="PuntoUca" />
        </div>
        <nav className="menu">
          <Link to="/" className="login-icon-link">
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
            <span className="login-text">Inicio</span>
          </Link>

            <Link to="/nuevo-evento" className="login-icon-link">
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
            <span className="login-text">Proponer Evento</span>
          </Link>

          <Link to="/login" className="login-icon-link">
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
            <span className="login-text">Iniciar sesión</span>
          </Link>
        </nav>
      </header>

      <main>
        <CategoriasAside
          isVisible={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <div className="content-area">
          <section className="banner">
            <img src={bannerImagen} alt="Evento destacado" />
          </section>

          <input
            type="text"
            placeholder="Buscar evento..."
            className="busqueda"
            onInput={handleSearch}
          />

          <div className="grupo-tarjetas">
            {filtrados.map((e, index) => (
              <TarjetaEvento key={index} {...e} />
            ))}
          </div>
          <PaginacionEventos
            pagActual = {paginaActual}
            totalPag = {totalPaginas}
            cambiarPag = {manejarCambioPagina}
          />
        </div>
      </main>

      <footer>
        <p>
          &copy; 2025 Punto UCA - Universidad Centroamericana José Simeón Cañas
        </p>
      </footer>
    </>
  );
};

export default Home;

