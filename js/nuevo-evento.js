const formEvento = document.getElementById("formEvento");

if (formEvento) {
  formEvento.addEventListener("submit", (e) => {
    e.preventDefault();
    const titulo = document.getElementById("titulo").value;
    const fecha = document.getElementById("fecha").value;
    const descripcion = document.getElementById("descripcion").value;

    alert(`Evento "${titulo}" enviado correctamente (simulado).`);
    formEvento.reset();
  });
}
