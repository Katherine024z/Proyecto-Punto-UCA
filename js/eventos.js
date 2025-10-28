// Lista de eventos simulados
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

const contenedor = document.querySelector(".eventos");

// Mostrar eventos al cargar
mostrarEventos(eventos);

// Función para mostrar eventos
function mostrarEventos(lista) {
  contenedor.innerHTML = "";
  lista.forEach(e => {
    const card = document.createElement("article");
    card.innerHTML = `
      <img src="${e.imagen}" alt="${e.titulo}">
      <h4>${e.titulo}</h4>
      <p><b>Fecha:</b> ${e.fecha}</p>
      <p>${e.descripcion}</p>
    `;
    contenedor.appendChild(card);
  });
}

// Crear barra de búsqueda
const barraBusqueda = document.createElement("input");
barraBusqueda.type = "text";
barraBusqueda.placeholder = "Buscar evento...";
barraBusqueda.classList.add("busqueda");

// Insertar antes del contenedor de eventos
document.querySelector("main").insertBefore(barraBusqueda, contenedor.parentElement);

// Filtrar eventos
barraBusqueda.addEventListener("input", (e) => {
  const texto = e.target.value.toLowerCase();
  const filtrados = eventos.filter(ev => ev.titulo.toLowerCase().includes(texto));
  mostrarEventos(filtrados);
});
