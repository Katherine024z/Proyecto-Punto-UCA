import Carousel from 'react-bootstrap/Carousel';

function ImagenesCarrusel({ destacados }) {

  if (!destacados || destacados.length === 0) {
    return (
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100 carrusel-imagenes"
            src="https://placehold.co/1200x400/6c757d/ffffff?text=Cargando+Eventos..."
            alt="Cargando eventos destacados"
          />
          <Carousel.Caption>
            <h3>Cargando...</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }

  return (
    <Carousel>
      {destacados.map((evento) => (
        <Carousel.Item key={evento.id}>
          <img
            className="d-block w-100 carrusel-imagenes"
            src={evento.imagen} 
            alt={evento.nombre} 
            onError={(e) => { 
              e.target.onerror = null; 
              e.target.src = 'https://placehold.co/1200x400/dc3545/ffffff?text=Error+al+cargar+imagen'; 
            }}
          />
          <Carousel.Caption>
            <h3>{evento.nombre}</h3>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ImagenesCarrusel;