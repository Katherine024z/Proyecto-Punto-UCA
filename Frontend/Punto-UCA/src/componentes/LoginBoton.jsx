import React from "react";

function LoginBoton({ text = "Entrar", disabled = false }) {
  return (
    <button type="submit" disabled={disabled}>
      <span>{disabled ? "Verificando..." : text}</span>
    </button>
  );
}

export default LoginBoton;