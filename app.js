document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  toggle.addEventListener("click", () => {
    menu.classList.toggle("oculto");
  });

  const estadoBtn = document.getElementById("estado-btn");

  estadoBtn.addEventListener("click", () => {
    const estaEncendido = estadoBtn.classList.contains("abierto");

    if (estaEncendido) {
      estadoBtn.classList.remove("abierto");
      estadoBtn.classList.add("cerrado");
      estadoBtn.textContent = "Estado: cerrado";
    } else {
      estadoBtn.classList.remove("cerrado");
      estadoBtn.classList.add("abierto");
      estadoBtn.textContent = "Estado: abierto";
    }
  });
});