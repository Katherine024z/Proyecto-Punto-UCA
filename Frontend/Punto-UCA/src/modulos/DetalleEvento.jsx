import React from "react";
import { Modal, ModalBody, Button} from "reactstrap";
import { Badge } from "reactstrap";

import "../styles/DetalleEvento.css"

const DetalleEvento = ({ estaAbierto, cambiar , evento}) => {
  
  if(!evento) return null;
  
  const fechaOriginal = new Date(evento.fecha);
    const fechaFormateada = fechaOriginal.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
        weekday: "long"
      });
    
  return (
    <Modal isOpen={estaAbierto} toggle={cambiar} size="lg" centered className="modal-estructura">

      <div className="modal-banner">
        <button className="btn-cerrar" onClick={cambiar}>X</button>
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
          <div className="tags">
            <Badge color="primary" pill className="categoria">
              {evento.categoria || 'General'}
            </Badge>
          </div>
        </div>
        <div className="informacion-descripcion">
          <h5>Descripcion</h5>
          <p>{evento.descripcion || "No hay una descripcion disponible"}</p>
          </div>  
        </div>

        <div className="modal-footer">
          <Button className= "btn-inscribirse" onClick={cambiar}>Inscribirse</Button>
        </div>

      </ModalBody>

    </Modal>
  )

}

export default DetalleEvento;