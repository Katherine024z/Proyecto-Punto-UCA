import React, {useContext, useState} from "react";
import { Modal, ModalBody, Button, Badge, Spinner} from "reactstrap";

import { ContextoSesion } from "../utilidades/contexto.jsx";

import "../styles/DetalleEvento.css"

const DetalleEvento = ({ estaAbierto, cambiar , evento}) => {
  
  const [mensaje, setMensaje] = useState(null);
  const [tipoMensaje, setTipoMensaje] = useState('');
  const [cargando, setCargando] = useState(false);

  const {sesionInfo, cambioLoginModal} = useContext(ContextoSesion);

  if(!evento) return null;
  
  const fechaOriginal = new Date(evento.fecha);
    const fechaFormateada = fechaOriginal.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
        weekday: "long"
      });

  const handleInscribirse = async () => {
    if(!sesionInfo.token) {
      cambiar();
      setTimeout(() => {
        cambioLoginModal();
      }, 200);
      return;
    }

  setCargando(true);
  setMensaje(null);


  try{
    const respuesta = await fetch("http://localhost:4000/eventos/inscribirse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sesionInfo.token}`,
      },
      body: JSON.stringify({
        id_evento: evento.id,
      }),
    });

    const data = await respuesta.json();

    if (!respuesta.ok){
      throw new Error(data.mensaje || "Error al inscribirse");
    }

    setTipoMensaje("exito");
    setMensaje(data.mensaje);

  }catch(err){
    setTipoMensaje("error");
    setMensaje(err.message);
  }finally{
    setCargando(false);
  }
};

  const cerrarModal = () => {
    setMensaje(null);
    cambiar();
  };

  return (
    <Modal isOpen={estaAbierto} toggle={cerrarModal} size="lg" centered className="modal-estructura">

      <div className="modal-banner">
        <button className="btn-cerrar" onClick={cerrarModal}>X</button>
        <img
          src={evento.imagen || "https://picsum.photos/800/400"}
          alt={evento.nombre}
          className="modal-imagen"
        />

        <div className="modal-gradiente"></div>

        <h2 className="modal-titulo">{evento.nombre}</h2>
      </div>
      <ModalBody className="modal-cuerpo">
        <div className="modal-distribucion">
          <div className="informacion-extra">
            <p className="dato-destacado">
              <span className="icono">📅</span> {fechaFormateada}
            </p>
            <p>
              <span className="icono">⏱️</span> {evento.duracion ? `${evento.duracion} min` : 'N/A'}
            </p>
            <p>
              <span className="icono">👤</span> <strong>Encargado:</strong> {evento.encargado || 'Comité UCA'}
            </p>
            {evento.cupos > 0 && (
              <p>
                Cupos totales: {evento.cupos}
              </p>
            )}
          <div className="tags">
            <Badge color="primary" pill className="categoria">
              {evento.categoria || 'General'}
            </Badge>
          </div>
        </div>
        <div className="informacion-descripcion">
          <h5>Descripcion</h5>
          <p>{evento.descripcion || "No hay una descripcion disponible"}</p>
          {mensaje && (
              <div
                className={`alert ${
                  tipoMensaje === "exito" ? "alert-success" : "alert-danger"
                }`}
                style={{ marginTop: "15px", padding: "10px", borderRadius: "5px" }}
              >
                {mensaje}
              </div>
            )}
          </div>  
        </div>

        <div className="modal-footer">
          <Button className= "btn-inscribirse" onClick={handleInscribirse} disabled={cargando}>
            {cargando ? (
              <>
                <Spinner size="sm" /> Inscribiendo...
              </>
            ) : (
              "Inscribirse")}
          </Button>
        </div>

      </ModalBody>

    </Modal>
  )
};

export default DetalleEvento;