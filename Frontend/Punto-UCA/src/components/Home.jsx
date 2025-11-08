import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CardGroup } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
//importar imagenes
import logoUCA from "../images/logo-web.jpeg";
import bannerImagen from "../images/evento1.png";
//importar componentes
import TarjetaEvento from "./TarjetaEvento";
import CategoriasAside from "./CategoriasAside";

const Home = () => {
  //variable de estado y funciones flechas
  const [eventos, setEventos] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [cargando, setCarga] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    async function fetchEventos() {
      try {
        const respuesta = await fetch("http://localhost:4000/eventos");

        if (!respuesta.ok) {
          throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        const datos = await respuesta.json();

        setEventos(datos);
        setFiltrados(datos);
      } catch (err) {
        console.error("Fallo al obtener eventos: ", err);
        setError("No se pudieron cargar los eventos. " + err.message);
      } finally {
        setCarga(false);
      }
    }
    fetchEventos();
  }, []);

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
          <img src={logoUCA} alt="Logo UCA" />
        </div>
        <nav className="menu">
          <Link to="/">Inicio</Link>
          <Link to="/nuevo-evento">Proponer Evento</Link>
          {/* Uso de formato SVG para crear iconos*/}
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

          <CardGroup className="grupo-tarjetas">
            {filtrados.map((e, index) => (
              <TarjetaEvento key={index} {...e} />
            ))}
          </CardGroup>
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
