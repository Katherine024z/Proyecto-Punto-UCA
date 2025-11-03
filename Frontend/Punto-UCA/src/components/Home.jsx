import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  CardImg,
  Button,
  CardGroup,
} from "reactstrap";
//importar imagenes
import logoUCA from "../images/logo-web.jpeg";
import bannerImagen from "../images/evento1.png";
//importar componentes
import EventCard from "./EventCard";
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
    try{
      const respuesta = await fetch('http://localhost:4000/eventos');

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
    const filtrados = eventos.filter(ev => ev.nombre.toLowerCase().includes(texto));
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
          <Link to="/login">Iniciar Sesión</Link>
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

        <div className="eventos">
            {filtrados.map((e, index) => (
              <Card key={index}>
                <CardImg alt={e.titulo} src={e.imagen} top width="100%" />
                <CardBody>
                  <CardTitle tag="h5">{e.titulo}</CardTitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    Fecha: {e.fecha}
                  </CardSubtitle>
                  <CardText>{e.descripcion}</CardText>
                  <Button color="primary">Ver más</Button>
                </CardBody>
              </Card>
            ))}
          </div>
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
