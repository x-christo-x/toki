document.addEventListener('DOMContentLoaded', () => {
  // --- Sidebar izquierdo (☰) ---
  const menuBtn = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');

  // --- Sidebar derecho (➕) ---
  const menuBtn2 = document.getElementById('menu-toggle2');
  const sidebar2 = document.getElementById('sidebar2');

  if (menuBtn && sidebar) {
    menuBtn.addEventListener('click', e => {
      e.stopPropagation();
      sidebar.classList.toggle('active');
      if (sidebar2) sidebar2.classList.remove('active');
    });
    document.addEventListener('click', ev => {
      if (!sidebar.contains(ev.target) && !menuBtn.contains(ev.target)) {
        sidebar.classList.remove('active');
      }
    });
  }

  if (menuBtn2 && sidebar2) {
    menuBtn2.addEventListener('click', e => {
      e.stopPropagation();
      sidebar2.classList.toggle('active');
      if (sidebar) sidebar.classList.remove('active');
    });
    document.addEventListener('click', ev => {
      if (!sidebar2.contains(ev.target) && !menuBtn2.contains(ev.target)) {
        sidebar2.classList.remove('active');
      }
    });
  }

  // --- Lógica de Publicaciones (preview, creación, edición y eliminación) ---
  const form       = document.getElementById('pub-form');
  const titleInput = document.getElementById('pub-title');
  const urlInput   = document.getElementById('pub-img-url');
  const descInput  = document.getElementById('pub-desc');
  const previewImg = document.getElementById('pub-preview-img');
  const cancelBtn  = document.getElementById('pub-cancel');
  const list       = document.getElementById('pub-list');
  const MAX_PUBS   = 4;

  if (form && titleInput && urlInput && descInput && previewImg && cancelBtn && list) {
    // Preview al escribir URL
    urlInput.addEventListener('input', () => {
      const url = urlInput.value.trim();
      previewImg.src = url || '';
      previewImg.hidden = !url;
    });

    // Cancelar: limpia el formulario y oculta preview
    cancelBtn.addEventListener('click', () => {
      form.reset();
      previewImg.hidden = true;
    });

    // Crear tarjeta en el listado
    form.addEventListener('submit', ev => {
      ev.preventDefault();
      const title = titleInput.value.trim();
      const url = urlInput.value.trim();
      const desc = descInput.value.trim();
      const existing = list.querySelectorAll('.pub-card').length;

      if (!title || !url || !desc) return;
      if (existing >= MAX_PUBS) {
        alert(`Solo puedes crear hasta ${MAX_PUBS} publicaciones.`);
        return;
      }

      // Construir la tarjeta
      const card = document.createElement('div');
      card.className = 'pub-card';
      card.innerHTML = `
        <h3 class="pub-title">${title}</h3>
        <img src="${url}" alt="${title}">
        <p class="pub-desc">${desc}</p>
        <div class="pub-actions">
          <button class="edit">Editar</button>
          <button class="delete">Eliminar</button>
        </div>
      `;
      list.prepend(card);

      // Resetear form
      form.reset();
      previewImg.hidden = true;
    });

    // Editar y Eliminar
    list.addEventListener('click', ev => {
      const btn  = ev.target;
      const card = btn.closest('.pub-card');
      if (!card) return;

      // Eliminar publicación
      if (btn.classList.contains('delete')) {
        card.remove();
      }

      // Editar publicación
      if (btn.classList.contains('edit')) {
        const img = card.querySelector('img');
        const titleElem = card.querySelector('.pub-title');
        const descElem = card.querySelector('.pub-desc');
        const nuevaUrl = prompt('Nueva URL de la imagen:', img.src);
        const nuevoTitulo = prompt('Nuevo Título:', titleElem.textContent);
        const nuevaDesc = prompt('Nueva Descripción:', descElem.textContent);

        if (nuevaUrl && nuevoTitulo && nuevaDesc) {
          img.src = nuevaUrl;
          img.alt = nuevoTitulo;
          titleElem.textContent = nuevoTitulo;
          descElem.textContent = nuevaDesc;
        }
      }
    });
  }
// --- Gráficos con Chart.js ---
  const reservasBar = document.getElementById('reservasBar');
  if (reservasBar) {
    new Chart(reservasBar.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['Ene','Feb','Mar','Abr','May','Jun'],
        datasets: [{
          label: 'Reservas',
          data: [120,150,180,140,200,170],
          borderWidth: 1,
          backgroundColor: 'rgba(33,150,243,0.7)'
        }]
      },
      options: {
        scales: {
          y: { beginAtZero: true, ticks: { color: '#C9D1D9' } },
          x: { ticks: { color: '#C9D1D9' } }
        },
        plugins: {
          legend: { labels: { color: '#C9D1D9' } }
        }
      }
    });
  }

  const gananciasLn = document.getElementById('gananciasLine');
  if (gananciasLn) {
    new Chart(gananciasLn.getContext('2d'), {
      type: 'line',
      data: {
        labels: ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'],
        datasets: [{
          label: 'Ganancias ($)',
          data: [500,700,600,800,1200,900,1100],
          borderWidth: 2,
          tension: 0.3,
          borderColor: '#F9A825',
          backgroundColor: 'rgba(249,168,37,0.5)',
          fill: false
        }]
      },
      options: {
        scales: {
          y: { beginAtZero: true, ticks: { color: '#C9D1D9' } },
          x: { ticks: { color: '#C9D1D9' } }
        },
        plugins: {
          legend: { labels: { color: '#C9D1D9' } }
        }
      }
    });
  }
});