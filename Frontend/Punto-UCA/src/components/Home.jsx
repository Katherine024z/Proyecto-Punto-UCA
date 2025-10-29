import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, CardImg, Button, CardGroup } from 'reactstrap';
import logoUCA from "../images/logo-web.jpeg";
import EventCard from "./EventCard";

const Home = () => {
  const [eventos] = useState([
    {
      titulo: "Feria de Ciencia",
      fecha: "2025-11-05",
      descripcion: "Exposición de proyectos estudiantiles.",
      imagen: "/img/evento1.jpg" // Ajusta ruta a public/img
    },
    {
      titulo: "Concierto Universitario",
      fecha: "2025-11-15",
      descripcion: "Banda sinfónica de la UCA en vivo.",
      imagen: "/img/evento2.jpg"
    },
    {
      titulo: "Hackathon UCA",
      fecha: "2025-11-20",
      descripcion: "Competencia de desarrollo tecnológico.",
      imagen: "/img/evento3.jpg"
    },
    {
      titulo: "Taller de Liderazgo",
      fecha: "2025-12-01",
      descripcion: "Formación para jóvenes líderes.",
      imagen: "/img/evento4.jpg"
    }
  ]);
  const [filtrados, setFiltrados] = useState(eventos);

  useEffect(() => {
    setFiltrados(eventos);
  }, [eventos]);

  const handleSearch = (e) => {
    const texto = e.target.value.toLowerCase();
    const filtrados = eventos.filter(ev => ev.titulo.toLowerCase().includes(texto));
    setFiltrados(filtrados);
  };

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