import React, { createContext, useState, useEffect } from 'react';

const ContextoSesion = createContext(null);

const GestorSesion = ({ children }) => {
  const [sesionInfo, setSesionInfo] = useState({
    token: null,
    usuario: null,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const usuario = localStorage.getItem('usuario');

    if (token && usuario) {
      setSesionInfo({
        token: token,
        usuario: JSON.parse(usuario),
      });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setSesionInfo({ token: null, usuario: null });
  };

  const value = {
    sesionInfo,
    setSesionInfo,
    logout,
  };

  return <ContextoSesion.Provider value={value}>{children}</ContextoSesion.Provider>;
};

export  {
  ContextoSesion,
  GestorSesion
}