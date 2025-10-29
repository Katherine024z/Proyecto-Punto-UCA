import React, { useState } from 'react';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Bienvenido ${usuario}! (Inicio de sesión simulado)`);
  };

  return (
    <main className="form-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>
      <p>¿No tienes cuenta? <a href="#">Regístrate aquí</a></p>
    </main>
  );
};

export default Login;