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
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [modoRegistro, setModoRegistro] = useState(false);
  const navigate = useNavigate();
  const { setSesionInfo, loginModalAbierto, cambioLoginModal } = useContext(ContextoSesion);


  const cambiarModo = (e) => {
    e.preventDefault();
    setModoRegistro(!modoRegistro);
    setError(null);
    setMensaje(null);
    setCarnet('');
    setContrasena('');
    setConfirmarContrasena('');
    setNombre('');
    setApellido('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMensaje(null);

    if (modoRegistro && contrasena !== confirmarContrasena) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setCargando(true);

    const ruta = modoRegistro
      ? 'http://localhost:4000/registro'
      : 'http://localhost:4000/login';

    const datos = modoRegistro
      ? { carnet, contrasena, nombre, apellido }
      : { carnet, contrasena };

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
        setMensaje("Cuenta creada con exito, puedes iniciar sesion");
        setCargando(false);
        setModoRegistro(false);
        setContrasena('');
        setConfirmarContrasena('');
      } else {

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
    ? "Crear cuenta"
    : "Iniciar Sesión";

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
                  onChange={(e) => {
                    if (e.target.value.length <= 50) {
                      setNombre(e.target.value);
                    }
                  }}
                  required
                  maxLength={50}
                />
                <input
                  type="text"
                  placeholder="Apellido"
                  value={apellido}
                  onChange={(e) => {
                    if (e.target.value.length <= 50) {
                      setApellido(e.target.value);
                    }
                  }}
                  required
                  maxLength={50}
                />
              </>
            )}
            <input
              type="text"
              placeholder="Carnet"
              value={carnet}
              onChange={(e) => {
                if (e.target.value.length <= 8) {
                  setCarnet(e.target.value);
                }
              }}
              required
              maxLength={8}
            />
            <div className="contenedor-contraseña">
              <input
                type={mostrarContrasena ? "text" : "password"}
                placeholder="Contraseña"
                value={contrasena}
                onChange={(e) => {
                  if (e.target.value.length <= 50) {
                    setContrasena(e.target.value);
                  }
                }}
                required
                maxLength={50}
              />

              <button
                type="button"
                className="boton-visualizador"
                onClick={() => setMostrarContrasena(!mostrarContrasena)}
                tabIndex="-1"
              >
                {mostrarContrasena ? (
                  <svg xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round" 
                    strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                )}
              </button>
            </div>

            {modoRegistro && (
              <input
                type="password"
                placeholder="Confirmar contraseña"
                value={confirmarContrasena}
                onChange={(e) => {
                  if (e.target.value.length <= 50) {
                    setConfirmarContrasena(e.target.value);
                  }
                }}
                required
                maxLength={50}
              />
            )}
            <LoginBoton text="Entrar" disabled={cargando} />

            <p>{error}</p>
          </form>
          <p>{modoRegistro ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}
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
