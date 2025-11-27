import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//importar componentes
import TarjetaEvento from "../componentes/TarjetaEvento";
import CategoriasAside from "../componentes/CategoriasAside";
import PaginacionEventos from "../componentes/PaginacionEventos";
import TotalEventosContador from "../componentes/TotalEventosContador";
import Header from "../componentes/Header";
import Login from "./Login";
import DetalleEvento from "./DetalleEvento";

const EventosFiltrados = () => {
  //variable de estado y funciones flechas
  const [eventos, setEventos] = useState([]);
  const [cargando, setCarga] = useState(true);
  const [error, setError] = useState(null);
  const [parametrosBusqueda, setParametrosBusqueda] = useSearchParams();
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [conteoTotal, setConteoTotal] = useState(0);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  

  const { categoriaNombre } = useParams();

  const paginaActual = parseInt(parametrosBusqueda.get("pagina")) || 1;
  const terminoBusqueda = parametrosBusqueda.get("busqueda") || "";

  const eventosPagina = 12;

  const abrirModalDetalle = (evento) => {
    setEventoSeleccionado(evento);
    setModalAbierto(true);
  }

  const cerrarModalDetalle = () => {
    setModalAbierto(false);
    setEventoSeleccionado(null);
  }

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const manejarCambioPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      const nuevoParametrosBusqueda = new URLSearchParams(parametrosBusqueda);
      nuevoParametrosBusqueda.set("pagina", nuevaPagina);
      setParametrosBusqueda(nuevoParametrosBusqueda);
    }
  };

  const manejarNuevaBusqueda = (nuevoTermino) => {
    const nuevoParametrosBusqueda = new URLSearchParams(parametrosBusqueda);

    if (nuevoTermino) {
      nuevoParametrosBusqueda.set("busqueda", nuevoTermino);
    } else {
      nuevoParametrosBusqueda.delete("busqueda");
    }
    nuevoParametrosBusqueda.set("pagina", 1);
    setParametrosBusqueda(nuevoParametrosBusqueda);
  };

  useEffect(() => {
    setParametrosBusqueda({ pagina: 1 });
  }, [categoriaNombre]);

  useEffect(() => {
    const fetchEventosCategoria = async () => {
      setCarga(true);
      setError(null);

      let url = `http://localhost:4000/eventos/categoria/${categoriaNombre}?pagina=${paginaActual}`;

      if (terminoBusqueda) {
        url += `&busqueda=${terminoBusqueda}`;
      }

      try {
        const respuesta = await fetch(url);

        if (!respuesta.ok) {
          throw new Error(
            `Error en la respuesta del servidor: ${respuesta.statusText}`
          );
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
    };
    fetchEventosCategoria();
  }, [categoriaNombre, paginaActual, terminoBusqueda]);

  if (cargando) {
    return (
      <>
        <Header busqueda={manejarNuevaBusqueda} consulta={terminoBusqueda} />
        <main>
          <h2 className="text-info">
            Cargando eventos de {categoriaNombre}...
          </h2>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header busqueda={manejarNuevaBusqueda} consulta={terminoBusqueda} />
        <main>
          <h2 className="text-danger"> Error: {error}</h2>
        </main>
      </>
    );
  }

  //contenido html
  return (
    <>
      <Header busqueda={manejarNuevaBusqueda} consulta={terminoBusqueda} />
      <Login />
      <DetalleEvento
        estaAbierto={modalAbierto}
        cambiar={cerrarModalDetalle}
        evento={eventoSeleccionado}
      />
      <main className="distribucion-barra">
        <CategoriasAside
          isVisible={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <div className="contenedor-principal">
          <div className="contenedor-conteo-resultado-busqueda">
            {terminoBusqueda && (
              <h5 className="texto-resultado-busqueda">
                Resultados de búsqueda para:{" "}
                <b>
                  "<span className="termino-busqueda">{terminoBusqueda}</span>"
                </b>
              </h5>
            )}
            <TotalEventosContador conteo={conteoTotal} />
          </div>
          <div className="grupo-tarjetas">
            {eventos.map((e) => (
              <TarjetaEvento key={e.id} {...e}
                onClickVermas={() => abrirModalDetalle(e)}
              />
            ))}
          </div>
          <PaginacionEventos
            pagActual={paginaActual}
            pagTotal={totalPaginas}
            cambiarPag={manejarCambioPagina}
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

export default EventosFiltrados;
