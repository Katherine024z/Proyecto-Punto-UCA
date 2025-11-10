import React, { useState } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, CardImg, Button, CardGroup } from 'reactstrap';


const eventos = [
  {
    titulo: "Feria de Ciencia",
    fecha: "2025-11-05",
    descripcion: "Exposición de proyectos estudiantiles.",
    imagen: "img/evento1.jpg"
  },
  {
    titulo: "Concierto Universitario",
    fecha: "2025-11-15",
    descripcion: "Banda sinfónica de la UCA en vivo.",
    imagen: "img/evento2.jpg"
  },
  {
    titulo: "Hackathon UCA",
    fecha: "2025-11-20",
    descripcion: "Competencia de desarrollo tecnológico.",
    imagen: "img/evento3.jpg"
  },
  {
    titulo: "Taller de Liderazgo",
    fecha: "2025-12-01",
    descripcion: "Formación para jóvenes líderes.",
    imagen: "img/evento4.jpg"
  }
];

export default function NuevoEvento() {
  return (
    <div className="d-flex flex-wrap gap-3 justify-content-center mt-4">
      {eventos.map((evento, i) => (
        <Card key={i} style={{ width: "18rem" }}>
          <img alt={evento.titulo} src={evento.imagen} />
          <CardBody>
            <CardTitle tag="h5">{evento.titulo}</CardTitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6">
              {evento.fecha}
            </CardSubtitle>
            <CardText>{evento.descripcion}</CardText>
            <Button color="primary">Ver más</Button>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}

