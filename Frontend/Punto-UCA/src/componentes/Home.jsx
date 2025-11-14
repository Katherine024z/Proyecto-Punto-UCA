import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//importar imagenes
import logoPuntoUca from "../images/logoPuntoUca.png";
import bannerImagen from "../images/evento1.png";
//importar componentes
import TarjetaEvento from "./TarjetaEvento";
import CategoriasAside from "./CategoriasAside";
import PaginacionEventos from "./PaginacionEventos";
import TotalEventosContador from "./TotalEventosContador";
import Header from "./Header";
import ImagenesCarrusel from "./ImagenesCarrusel"

const Home = () => {
  //variable de estado y funciones flechas
  const [eventos, setEventos] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [destacados, setdestacados] = useState([]);
  const [cargando, setCarga] = useState(true);
  const [error, setError] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [conteoTotal, setConteoTotal] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const eventosPagina = 12;

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
        setTotalPaginas(Math.ceil(datos.totalEventos / eventosPagina));
        setConteoTotal(datos.totalEventos);
      } catch (err) {
        console.error("Fallo al obtener eventos: ", err);
        setError("No se pudieron cargar los eventos. " + err.message);
      } finally {
        setCarga(false);
      }
    }
    fetchEventos();
  }, [paginaActual]);

    useEffect(() => {
    async function fetchDestacados() {
      try {

        const respuesta = await fetch(`http://localhost:4000/eventos/destacados`);
        
        if (!respuesta.ok) {
          throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        const datos = await respuesta.json();
        
        setdestacados(datos); 

      } catch (err) {
        console.error("Fallo al obtener eventos destacados: ", err);
        
      }
    }
    fetchDestacados();
  }, []);

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
      <Header/>
      <main>
        <CategoriasAside
          isVisible={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <div className="content-area">
          <ImagenesCarrusel destacados={destacados} />
          <input
            type="text"
            placeholder="Buscar evento..."
            className="busqueda"
            onInput={handleSearch}
          />
          <TotalEventosContador 
              conteo={conteoTotal} 
          />
          <div className="grupo-tarjetas">
            {filtrados.map((e, index) => (
              <TarjetaEvento key={index} {...e} />
            ))}
          </div>
          <PaginacionEventos
            pagActual = {paginaActual}
            pagTotal = {totalPaginas}
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

