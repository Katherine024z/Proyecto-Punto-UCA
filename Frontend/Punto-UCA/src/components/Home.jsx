import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, CardImg, Button, CardGroup } from 'reactstrap';
import logoUCA from "../images/logo-web.jpeg";
import EventCard from "./EventCard";

const Home = () => {
  const [eventos, setEventos] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [cargando, setCarga] = useState(true);
  const [error, setError] = useState(null);

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

      <section className="banner">
        <img src="/img/evento1.png" alt="Evento destacado" />
      </section>

      <main>
        <aside>
          <nav className="lateral">
            <h3>Categorías</h3>
            <ul>
              <li><a href="#">Académicos</a></li>
              <li><a href="#">Deportivos</a></li>
              <li><a href="#">Culturales</a></li>
              <li><a href="#">Sociales</a></li>
            </ul>
          </nav>
        </aside>

        <input
          type="text"
          placeholder="Buscar evento..."
          className="busqueda"
          onInput={handleSearch}
        />

        <CardGroup>
  {filtrados.map((e, index) => (
    <Card key={index}>
      <CardImg 
        alt={e.titulo} 
        src={e.imagen} 
        top 
        width="100%" 
      />
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

      </main>

      <footer>
        <p>&copy; 2025 Punto UCA - Universidad Centroamericana José Simeón Cañas</p>
      </footer>
    </>
  );
};

export default Home;