const formLogin = document.getElementById("formLogin");

if (formLogin) {
  formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    const usuario = document.getElementById("usuario").value;
    alert(`Bienvenido ${usuario}! (Inicio de sesión simulado)`);
  });
}
