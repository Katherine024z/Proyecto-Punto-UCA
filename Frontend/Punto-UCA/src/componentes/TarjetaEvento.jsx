import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  CardImg,
  Button,
} from "reactstrap";
import '../styles/TarjetaEvento.css'

const EventCard = ({ nombre, fecha, categoria, descripcion, imagen}) => {
  const fechaOriginal = fecha ? new Date(fecha) : null;
  const fechaFormateada = fechaOriginal
    ? fechaOriginal.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "Fecha no disponible";

  return (
    <Card className="tarjeta-evento">
      <CardImg alt={nombre || "Evento"} src={imagen || "URL_IMAGEN_POR_DEFECTO"} />
      <CardBody className="cuerpo-tarjeta">
         <div className="contenido">
        <CardTitle className="titulo" tag="h5">
          {nombre}
        </CardTitle>
        <CardSubtitle className="fecha" tag="h6">
          Fecha: {fechaFormateada}
        </CardSubtitle>
        <CardText className="categoria">
          Categoría: {categoria || "Sin Categoría"}
        </CardText>
        </div>
        <Button className="informacion-btn">Ver más</Button>
      </CardBody>
    </Card>
  );
};

export default EventCard;
