import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {useParams} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";
//importar componentes
import TarjetaEvento from "./TarjetaEvento";
import CategoriasAside from "./CategoriasAside";
import PaginacionEventos from "./PaginacionEventos";
import TotalEventosContador from "./TotalEventosContador";
import Header from "./Header";

const EventosFiltrados = () => {
  //variable de estado y funciones flechas
  const [eventos, setEventos] = useState([]);
  const [cargando, setCarga] = useState(true);
  const [error, setError] = useState(null);
  const { categoriaNombre } = useParams();
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [conteoTotal, setConteoTotal] = useState(0);

  const eventosPagina = 12;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const manejarCambioPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  };

  useEffect(() => {
    async function fetchEventosCategoria() {
      setCarga(true);
      setError(null);

      try {
        const respuesta = await fetch(`http://localhost:4000/eventos/categoria/${categoriaNombre}?pagina=${paginaActual}`);

        if (!respuesta.ok) {
          throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        const datos = await respuesta.json();
        setEventos(datos.eventos);
        setTotalPaginas(Math.ceil(datos.totalEventos / eventosPagina));
        setConteoTotal(datos.totalEventos);

      } catch (err) {
        console.error("Fallo al obtener eventos: ", err);
        setError("No se pudieron cargar los eventos. " + err.message);
      } finally {
        setCarga(false);
      }
    }
    fetchEventosCategoria();
  }, [categoriaNombre, paginaActual]);

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
      <Header/>
      <main>
        <CategoriasAside
          isVisible={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <div className="content-area">
          <TotalEventosContador 
              conteo={conteoTotal} 
              categoria={categoriaNombre} 
          />
          <div className="grupo-tarjetas">
            {eventos.map((e, index) => (
              <TarjetaEvento key={index} {...e} />
            ))}
            <PaginacionEventos
            pagActual = {paginaActual}
            pagTotal = {totalPaginas}
            cambiarPag = {manejarCambioPagina}
          />
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

export default EventosFiltrados;
