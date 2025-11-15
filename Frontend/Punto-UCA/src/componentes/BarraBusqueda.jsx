import React, { useState, useEffect } from "react";

const LONGITUD_MIN = 3;

const BarraBusqueda = ({ busqueda, consulta = "" }) => {
  const [terminoLocal, setTerminoLocal] = useState(consulta);
  const [errorBusqueda, setErrorBusqueda] = useState(null);

  useEffect(() => {
    setTerminoLocal(consulta);
  }, [consulta]);

  const manejarBusqueda = (termino) => {
    const terminoRecortado = termino.trim();

    if (terminoRecortado.length === 0) {
      setErrorBusqueda(null);
      busqueda(""); // Notifica al padre (Home) para limpiar la lista
    } else if (terminoRecortado.length >= LONGITUD_MIN) {
      setErrorBusqueda(null);
      busqueda(terminoRecortado); // Notifica al padre (Home) el término final
    } else {
      setErrorBusqueda(
        `Búsqueda muy corta. Mínimo ${LONGITUD_MIN} caracteres.`
      );
    }
  };

  const manejarTecla = (e) => {
    if (e.key === "Enter") {
      manejarBusqueda(terminoLocal);
    }
  }; // 🚨 Esta función es la CLAVE: Actualiza el estado local en cada pulsación.

 const manejarCambioInput = (e) => {
    // 1. Siempre actualiza el estado local para que el texto aparezca.
    setTerminoLocal(e.target.value); 
    
    // 2. Opcional: Limpia el error si el texto ya cumple el mínimo
    if (errorBusqueda && e.target.value.length >= LONGITUD_MIN) {
        setErrorBusqueda(null);
    }
  };
  
  const limpiarBusqueda = () => {
    setTerminoLocal("");
    manejarBusqueda(""); // Llama a la lógica de búsqueda para notificar a Home que limpie
    setErrorBusqueda(null);
  };


  return (
    <div className="contenedor-busqueda">
      
      <div className="icono-lupa">
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
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>

      <input
        type="text"
        placeholder="Buscar evento..."
        className="busqueda-input"
        value={terminoLocal}
        onChange={manejarCambioInput}
        onKeyUp={manejarTecla}
      />

      {terminoLocal && (
        <button onClick={limpiarBusqueda} className="icono-limpiar">
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
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
      {errorBusqueda && <p className="error-busqueda" >{errorBusqueda}</p>}
    </div>
  );
};

export default BarraBusqueda;
