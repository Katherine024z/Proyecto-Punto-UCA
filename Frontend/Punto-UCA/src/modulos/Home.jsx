import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//importar componentes
import TarjetaEvento from "../componentes/TarjetaEvento";
import CategoriasAside from "../componentes/CategoriasAside";
import PaginacionEventos from "../componentes/PaginacionEventos";
import TotalEventosContador from "../componentes/TotalEventosContador";
import Header from "../componentes/Header";
import ImagenesCarrusel from "../componentes/ImagenesCarrusel"
import Login from "./Login";

const Home = () => {
  //variable de estado y funciones flechas
  const [eventos, setEventos] = useState([]);
  const [destacados, setdestacados] = useState([]);
  const [cargando, setCarga] = useState(true);
  const [error, setError] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [conteoTotal, setConteoTotal] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [terminoBusqueda, setTerminoBusqueda] = useState("");

  const EVENTOS_PAGINA = 12;

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  
  const manejarCambioPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  };

  const manejarNuevaBusqueda = (nuevoTermino) => {
    setPaginaActual(1);
    setTerminoBusqueda(nuevoTermino);
  };

  useEffect(() => {
    async function fetchEventos() {
    setCarga(true);
    let url;
    const base = "http://localhost:4000";

    if (terminoBusqueda) {
      url = `${base}/eventos/buscar?termino=${terminoBusqueda}&pagina=${paginaActual}`;
    }
    else{
      url = `${base}/eventos?pagina=${paginaActual}`;
    }
      try {
        const respuesta = await fetch(url);

        if (!respuesta.ok) {
          throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        const datos = await respuesta.json();

        setEventos(datos.eventos);
        setTotalPaginas(Math.ceil(datos.totalEventos / EVENTOS_PAGINA));
        setConteoTotal(datos.totalEventos);
      } catch (err) {
        console.error("Fallo al obtener eventos: ", err);
        setError("No se pudieron cargar los eventos. " + err.message);
      } finally {
        setCarga(false);
      }
    }
    fetchEventos();
  }, [paginaActual, terminoBusqueda]);

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
      <Header
      busqueda = {manejarNuevaBusqueda}
      consulta = {terminoBusqueda}
      />
      <Login />
      <main className="distribucion-barra">
        <CategoriasAside
          isVisible={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <div className="contenedor-principal">
          <ImagenesCarrusel destacados={destacados} />
          <TotalEventosContador 
              conteo={conteoTotal} 
          />
          <div className="grupo-tarjetas">
            {eventos.map((e, index) => (
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

