import React from "react";
import "../styles/IconoBoton.css";

export default function LoginBoton({ text = "Entrar", disabled = false }) {
  return (
    <button type="submit" className="login-btn" disabled={disabled}>
      <span>{disabled ? "Verificando..." : text}</span>
    </button>
  );
}