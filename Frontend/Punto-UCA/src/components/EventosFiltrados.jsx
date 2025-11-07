import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {useParams} from "react-router-dom"
import { CardGroup } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
//importar imagenes
import logoPuntoUca from "../images/logoPuntoUca.png";
//importar componentes
import TarjetaEvento from "./TarjetaEvento";
import CategoriasAside from "./CategoriasAside";

const EventosFiltrados = () => {
  //variable de estado y funciones flechas
  const [eventos, setEventos] = useState([]);
  const [cargando, setCarga] = useState(true);
  const [error, setError] = useState(null);
  const { categoriaNombre } = useParams();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    async function fetchEventosCategoria() {
      setCarga(true);
      setError(null);

      try {
        const respuesta = await fetch(`http://localhost:4000/eventos/categoria/${categoriaNombre}`);

        if (!respuesta.ok) {
          throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        const datos = await respuesta.json();
        setEventos(datos);

      } catch (err) {
        console.error("Fallo al obtener eventos: ", err);
        setError("No se pudieron cargar los eventos. " + err.message);
      } finally {
        setCarga(false);
      }
    }
    fetchEventosCategoria();
  }, [categoriaNombre]);

  if (cargando) {
    return (
      <>
        <main>
          <h2 className="text-info">Cargando eventos de {categoriaNombre}...</h2>
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
          <img src={logoPuntoUca} alt="PuntoUCA" />
        </div>
        <nav className="menu">
          <Link to="/">Inicio</Link>
          <Link to="/nuevo-evento">Proponer Evento</Link>
          <Link to="/login">Iniciar Sesión</Link>
        </nav>
      </header>

      <main>
        <CategoriasAside
          isVisible={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <div className="content-area">

          <CardGroup className="grupo-tarjetas">
            {eventos.map((e, index) => (
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

export default EventosFiltrados;
