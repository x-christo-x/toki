document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  toggle.addEventListener("click", () => {
    menu.classList.toggle("oculto");
  });

  const estadoBtn = document.getElementById("estado-btn");

  estadoBtn.addEventListener("click", () => {
    const estaEncendido = estadoBtn.classList.contains("on");

    if (estaEncendido) {
      estadoBtn.classList.remove("on");
      estadoBtn.classList.add("off");
      estadoBtn.textContent = "Estado: OFF";
    } else {
      estadoBtn.classList.remove("off");
      estadoBtn.classList.add("on");
      estadoBtn.textContent = "Estado: ON";
    }
  });
});