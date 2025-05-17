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
// Gráfico Lineal
var ctxLineal = document.getElementById('graficaLineal').getContext('2d');
var graficaLineal = new Chart(ctxLineal, {
  type: 'line',
  data: {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    datasets: [{
      label: 'Ventas',
      data: [12, 19, 3, 5, 2],
      borderColor: '#FF009D',
      fill: false
    }]
  }
});

// Gráfico de Tortas
var ctxTorta = document.getElementById('graficaTorta').getContext('2d');
var graficaTorta = new Chart(ctxTorta, {
  type: 'pie',
  data: {
    labels: ['Comida', 'Bebidas', 'Postres'],
    datasets: [{
      label: 'Porcentaje de Ventas',
      data: [60, 30, 10],
      backgroundColor: ['#FF009D', '#8000FF', '#AA48C9B0']
    }]
  }
});
// Gráfico Escalonado (tipo 'line' con steppedLine)
var ctxEscalon = document.getElementById('graficaEscalon').getContext('2d');
var graficaEscalon = new Chart(ctxEscalon, {
  type: 'line',
  data: {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    datasets: [{
      label: 'Clientes',
      data: [3, 4, 2, 5, 1],
      borderColor: '#48C9B0',
      fill: false,
      stepped: true
    }]
  },
  options: {
    scales: {
      y: { beginAtZero: true }
    }
  }
});