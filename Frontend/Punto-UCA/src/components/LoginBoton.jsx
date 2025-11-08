import React from "react";
import "../styles/LoginBoton.css";

//Al confirmar el inicio de sesion, el boton dira "Entrar"
export default function LoginBoton({ text = "Entrar" }) {
  return (
    <button type="submit" className="login-btn">
      <span>{text}</span>
    </button>
  );
}