import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextoSesion } from '../utilidades/contexto.jsx';

import HeaderFormulario from '../componentes/HeaderFormulario.jsx';
import { Spinner } from 'react-bootstrap';

import "../styles/IconoBoton.css";

const NuevoEvento = () => {
  const { sesionInfo, loginModalAbierto, cambioLoginModal, cargandoSesion } = useContext(ContextoSesion);
  const navigate = useNavigate();
  const fechaActual = new Date().toISOString().split("T")[0];

  const [nombre, setNombre] = useState('');
  const [encargado, setEncargado] = useState('');
  const [fecha, setFecha] = useState('');
  const [duracion, setDuracion] = useState('');
  const [categoria, setCategoria] = useState('1');
  const [descripcion, setDescripcion] = useState('');
  const [urlTarjeta, setUrlTarjeta] = useState('');
  const [urlHeader, setUrlHeader] = useState('');
  const [privado, setPrivado] = useState(false);
  const [cupos, setCupos] = useState('');


  const [mensaje, setMensaje] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {

    if (cargandoSesion) return;

    if (!sesionInfo.token) {
      navigate('/');
      setTimeout(() => {
        cambioLoginModal();
      }, 100);
    }
  }, [sesionInfo.token, navigate, cargandoSesion]);

  if (cargandoSesion) {
    return (
      <Spinner color="primary">
      </Spinner>
    )
  };

  if (!sesionInfo.token) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setCargando(true);
    setMensaje(null);

    try {
      const respuesta = await fetch('http://localhost:4000/eventos/proponer', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${sesionInfo.token}`
        },
        body: JSON.stringify({
          nombre: nombre,
          fecha: fecha,
          duracion: duracion,
          descripcion: descripcion,
          id_categoria: categoria,
          encargado: encargado,
          urlImagenTarjeta: urlTarjeta,
          urlImagenHeader: urlHeader,
          cupos: cupos,
          privado: privado ? 1 : 0
        })
      });

      const data = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(data.mensaje || 'Error al crear evento')
      }

      setMensaje('Evento guardado exitosamente');

      setNombre('');
      setEncargado('');
      setFecha('');
      setDescripcion('');
      setDuracion('');
      setCategoria('1');
      setUrlTarjeta('');
      setUrlHeader('');
      setPrivado(false);
      setCupos('');


    } catch (err) {
      console.error(err);
      setError("No se pudo crear el evento, intentalo mas tarde");
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
      <HeaderFormulario />
      <main className='form-container'>
        <h2>Proponer Evento</h2>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Nombre del evento'
            required
            value={nombre}
            onChange={(e) => {
              if (e.target.value.length <= 50) {
                setNombre(e.target.value);
              }
            }}
            maxLength={50}
          />
          <input
            type='text'
            placeholder='Encargado / Organizador'
            required
            value={encargado}
            onChange={(e) => {
              if (e.target.value.length <= 75) {
                setEncargado(e.target.value);
              }
            }}
            maxLength={75}
          />
          <input
            type='date'
            required
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            min={fechaActual}
          />
          <input
            type='number'
            placeholder='Duracion (min)'
            required
            value={duracion}
            onChange={(e) => {
              const valor = e.target.value;

              if (valor === '') {
                setDuracion('');
                return;
              }

              const numero = parseInt(valor);

              if (numero > 0 && numero <= 1440) {
                setDuracion(valor);
              }
            }}
          />
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #0000007c' }}
          >
            <option value="1">Académico</option>
            <option value="2">Deportivo</option>
            <option value="3">Cultural</option>
            <option value="4">Social</option>
            <option value="5">Tecnologico</option>
            <option value="6">Salud y Bienestar</option>
            <option value="7">Emprendimiento</option>
            <option value="8">Desarrollo profesional</option>
            <option value="9">Religioso</option>
          </select>
            <div className="checkbox-privado">
              <input
                type='checkbox'
                id='privadoCheck'
                checked={privado}
                onChange={(e) => {

                  setPrivado(e.target.checked);

                  if (!e.target.checked) {
                    setCupos('');
                  }
                }}
                style={{ width: '20px', margin: 0, cursor: 'pointer' }}
              />
              <label>
                ¿El evento es privado?
              </label>
            </div>

            {privado && (
              <input
                type='number'
                placeholder='Cupos Maximos'
                required={privado}
                value={cupos}
                onChange={(e) => {
                  const valor = e.target.value;

                  if (valor === '') {
                    setCupos('');
                    return;
                  }

                  const numero = parseInt(valor);

                  if (numero > 0) {
                    setCupos(valor);
                  }
                }}
              />
            )}
          <textarea
            placeholder='Descripcion del evento'
            rows="3"
            required
            value={descripcion}
            onChange={(e) => {
              if (e.target.value.length <= 1000) {
                setDescripcion(e.target.value);
              }
            }}
            maxLength={1000}
          />
          <h6>Imagenes URLS</h6>
          <input
            type='text'
            placeholder='URL de Imagen tarjeta'
            required
            value={urlTarjeta}
            onChange={(e) => {
              if (e.target.value.length <= 600) {
                setUrlTarjeta(e.target.value);
              }
            }}
            maxLength={600}
          />
          <input
            type='text'
            placeholder='URL de Imagen Banner'
            required
            value={urlHeader}
            onChange={(e) => {
              if (e.target.value.length <= 600) {
                setUrlHeader(e.target.value);
              }
            }}
            maxLength={600}
          />
          <button
            type='submit'
            disabled={cargando}
          >
            <span>{cargando ? "Enviando..." : "Enviar evento"}</span>
          </button>
          {error && (
            <div className="alert alert-danger">{error}</div>
          )}
          {mensaje && (
            <div className="alert alert-success">{mensaje}</div>
          )}
        </form>
      </main>
      <footer>
        <p>
          &copy; 2025 Punto UCA - Universidad Centroamericana José Simeón Cañas
        </p>
      </footer>
    </>
  );
};

export default NuevoEvento;
