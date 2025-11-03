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
<<<<<<< HEAD
  const [eventos, setEventos] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [cargando, setCarga] = useState(true);
  const [error, setError] = useState(null);
=======
  //data
  const [eventos] = useState([
    {
      titulo: "Feria de Ciencia",
      fecha: "2025-11-05",
      descripcion: "Exposición de proyectos estudiantiles.",
      imagen: "/img/evento1.jpg",
    },
    {
      titulo: "Concierto Universitario",
      fecha: "2025-11-15",
      descripcion: "Banda sinfónica de la UCA en vivo.",
      imagen: "/img/evento2.jpg",
    },
    {
      titulo: "Hackathon UCA",
      fecha: "2025-11-20",
      descripcion: "Competencia de desarrollo tecnológico.",
      imagen: "/img/evento3.jpg",
    },

    {
      titulo: "Taller de Liderazgo",
      fecha: "2025-12-01",
      descripcion: "Formación para jóvenes líderes.",
      imagen: "/img/evento4.jpg",
    },
  ]);

  //variable de estado y funciones flechas
  const [filtrados, setFiltrados] = useState(eventos);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
>>>>>>> 09722d50e379f5b337d7f6e5d986b090e122a378

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
<<<<<<< HEAD
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

=======
    const filtrados = eventos.filter((ev) =>
      ev.titulo.toLowerCase().includes(texto)
    );
    setFiltrados(filtrados);
  };
  //contenido html
>>>>>>> 09722d50e379f5b337d7f6e5d986b090e122a378
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

          <CardGroup>
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
