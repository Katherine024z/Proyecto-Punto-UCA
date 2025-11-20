import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import LoginBoton from "../componentes/LoginBoton.jsx";
import { ContextoSesion } from '../utilidades/contexto.jsx';

const Login = () => {
  const [carnet, setCarnet] = useState('');
  const [contra, setContra] = useState('');
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate()
  const { setSesionInfo, loginModalAbierto, cambioLoginModal } = useContext(ContextoSesion)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setCargando(true);

    try {
      const respuesta = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          carnet: carnet,
          contrasena: contra,
        }),
      });

      const data = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(data.message || 'Error al iniciar sesión');
      }

      const token = data.token;
      const usuario = data.usuario;

      setSesionInfo({ token: token, usuario: usuario });

      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));

      cambioLoginModal();

      navigate('/');

    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <Modal isOpen={loginModalAbierto} toggle={cambioLoginModal}>
      <ModalHeader toggle={cambioLoginModal}>Iniciar Sesión</ModalHeader>
      <ModalBody>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
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
              value={contra}
              onChange={(e) => setContra(e.target.value)}
              required
            />
            <LoginBoton text="Entrar" disabled={cargando} />

            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

          </form>
          <p>¿No tienes cuenta? <a href="#">Regístrate aquí</a></p>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default Login;