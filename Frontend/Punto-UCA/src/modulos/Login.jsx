import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import LoginBoton from "../componentes/LoginBoton.jsx";
import { ContextoSesion } from '../utilidades/contexto.jsx';

const Login = () => {
  const [carnet, setCarnet] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [modoRegistro, setModoRegistro] = useState(false);
  const navigate = useNavigate();
  const { setSesionInfo, loginModalAbierto, cambioLoginModal } = useContext(ContextoSesion);


  const cambiarModo = (e) =>{
    e.preventDefault();
    setModoRegistro(!modoRegistro);
    setError(null);
    setMensaje(null);
    setCarnet('');
    setContrasena('');
    setNombre('');
    setApellido('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setCargando(true);
    setMensaje(null);

    const ruta = modoRegistro
      ? 'http://localhost:4000/registro'
      : 'http://localhost:4000/login';

    const datos = modoRegistro
    ? {carnet, contrasena, nombre, apellido}
    : {carnet, contrasena};

    try {
      const respuesta = await fetch(ruta, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos)
      });

      const data = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(data.mensaje || 'Error al ingresar');
      }

      if (modoRegistro) {
        setMensaje("Cuenta creada con exito, puedes iniciar sesion")
        setModoRegistro(false);
        setContrasena('');
      }else{

      const token = data.token;
      const usuario = data.usuario;

      setSesionInfo({ token: token, usuario: usuario });

      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));

      cambioLoginModal();

      navigate('/');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  const titulo = modoRegistro
  ?"Crear cuenta"
  :"Iniciar Sesión";

  return (
    <Modal isOpen={loginModalAbierto} toggle={cambioLoginModal}>
      <ModalHeader toggle={cambioLoginModal}>{titulo}</ModalHeader>
      <ModalBody>
        <div className="form-container">
          <p>{mensaje}</p>
          <form onSubmit={handleSubmit}>
            {modoRegistro && (
              <>
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
            />
              </>
            )}
            <input
              type="text"
              placeholder="Carnet"
              value={carnet}
              onChange={(e) => setCarnet(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
            />
            <LoginBoton text="Entrar" disabled={cargando} />
            
            <p>{error}</p>
          </form>
          <p>{ modoRegistro ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?" } 
            <a href="#" onClick={cambiarModo}>
              {modoRegistro ? "Inicia sesion" : "Registrate aqui"}
              </a>
              </p>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default Login;