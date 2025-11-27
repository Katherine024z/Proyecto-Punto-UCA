import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextoSesion } from '../utilidades/contexto.jsx';

import HeaderFormulario from '../componentes/HeaderFormulario.jsx';
import { Spinner } from 'react-bootstrap';

import "../styles/IconoBoton.css";

const NuevoEvento = () => {
  const  { sesionInfo, loginModalAbiero, cambioLoginModal, cargandoSesion} = useContext(ContextoSesion);
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [encargado, setEncargado] = useState('');
  const [fecha,setFecha] = useState('');
  const [duracion, setDuracion] = useState('');
  const [categoria, setCategoria] = useState('1');
  const [descripcion, setDescripcion] = useState('');
  const [urlTarjeta, setUrlTarjeta] = useState('');
  const [urlHeader, setUrlHeader] = useState('');
  const [mensaje, setMensaje] = useState(null);
  const [cargando, setCargando] = useState(false);

  useEffect (() => {
    
    if(cargandoSesion) return;

    if (!sesionInfo.token) {
      navigate('/');
      setTimeout(() => {
        cambioLoginModal();
      }, 100);
    }
  }, [sesionInfo.token, navigate,cargandoSesion]);

  if(cargandoSesion) {return(
    <Spinner color="primary">
    </Spinner>
  )};

  if(!sesionInfo.token) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setMensaje(null);

    try {
      const respuesta = await fetch('http://localhost:4000/eventos/proponer',{
        method: 'POST',
        headers: {
          'Content-type' : 'application/json',
          'Authorization' : `Bearer ${sesionInfo.token}`
        },
        body: JSON.stringify({
          nombre: nombre,
          fecha: fecha,
          duracion: duracion,
          descripcion: descripcion,
          id_categoria: categoria,
          encargado: encargado,
          urlImagenTarjeta: urlTarjeta,
          urlImagenHeader: urlHeader
        })
      });

      const data = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(data.mensaje  || 'Error al crear evento')
      }

      setMensaje('Evento guardado exitosamente');

      setNombre('');
      setEncargado('');
      setFecha('');
      setDescripcion('');
      setDuracion('');
      setCategoria('1');
      setUrlHeader('');
      setUrlHeader('');


    }catch {
      setMensaje("Error: " + err.mensaje);
    }finally {
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
          onChange={(e) => setNombre(e.target.value)}
          maxLength={75}
        />
        <input 
          type='text'
          placeholder='Encargado / Organizador'
          required
          value={encargado}
          onChange={(e) => setEncargado(e.target.value)}
          maxLength={100}
        />
        <input 
          type='date'
          required
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />
        <input 
          type='number'
          placeholder='Duracion (min)'
          required
          value={duracion}
          onChange={(e) => setDuracion(e.target.value)}
        />
        <select
          value={categoria} 
          onChange= {(e) => setCategoria(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #0000007c' }}
        >
          <option value="1">Académico</option>
          <option value="2">Deportivo</option>
          <option value="3">Cultural</option>
          <option value="4">Social</option>
          <option value="5">Tecnologico</option>
          <option value="6">Salud y Bienestar</option>
          <option value="7">Emprendimiento</option>
          <option value="8">Desarrollo profesiona</option>
          <option value="9">Religioso</option>
        </select>
        <textarea
          placeholder='Descripcion del evento'
          rows="3"
          required
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <h6>Imagenes URLS</h6>
        <input
          type='text'
          placeholder='URL de Imagen tarjeta'
          required
          value={urlTarjeta}
          onChange={(e) => setUrlTarjeta(e.target.value)}
        />
        <input
          type='text'
          placeholder='URL de Imagen Banner'
          required
          value={urlHeader}
          onChange={(e) => setUrlHeader(e.target.value)}
        />
        <button
          type='submit'
          disabled={cargando}
        >
          <span>{cargando ? "Enviando..." : "Enviar evento"}</span>
        </button>
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
