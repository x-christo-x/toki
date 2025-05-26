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

  const form       = document.getElementById('pub-form');
  const titleInput = document.getElementById('pub-title');
  const fileInput  = document.getElementById('pub-img-file');
  const descInput  = document.getElementById('pub-desc');
  const previewImg = document.getElementById('pub-preview-img');
  const cancelBtn  = document.getElementById('pub-cancel');
  const list       = document.getElementById('pub-list');
  const MAX_PUBS   = 4;

  const nombreArchivo = document.getElementById('nombre-archivo');
  fileInput.addEventListener('change', function(){
    nombreArchivo.textContent = this.files[0] ? this.files[0].name : '';
  });

  let imagenLocal = null;

  if (form && titleInput && fileInput && descInput && previewImg && cancelBtn && list) {
    // Mostrar preview al elegir archivo local
    fileInput.addEventListener('change', () => {
      const file = fileInput.files[0];
      imagenLocal = file;
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          previewImg.src = e.target.result;
          previewImg.hidden = false;
        };
        reader.readAsDataURL(file);
      } else {
        previewImg.hidden = true;
      }
    });

    // Cancelar: limpia el formulario y oculta preview
    cancelBtn.addEventListener('click', () => {
      form.reset();
      previewImg.hidden = true;
      imagenLocal = null;
      nombreArchivo.textContent = '';
    });

    // Crear tarjeta en el listado
    form.addEventListener('submit', ev => {
      ev.preventDefault();
      const title = titleInput.value.trim();
      const desc = descInput.value.trim();
      const existing = list.querySelectorAll('.pub-card').length;

      if (!title || !imagenLocal || !desc) return;
      if (existing >= MAX_PUBS) {
        alert(`Solo puedes crear hasta ${MAX_PUBS} publicaciones.`);
        return;
      }

      // Leer la imagen como base64 para la vista previa en la tarjeta
      const reader = new FileReader();
      reader.onload = function(e) {
        const imgSrc = e.target.result;

        // Construir la tarjeta
        const card = document.createElement('div');
        card.className = 'pub-card';
        card.innerHTML = `
          <h3 class="pub-title">${title}</h3>
          <img src="${imgSrc}" alt="${title}">
          <p class="pub-desc">${desc}</p>
          <div class="pub-actions">
            <button class="edit">Editar</button>
            <button class="delete">Eliminar</button>
          </div>
        `;
        list.prepend(card);
      };
      reader.readAsDataURL(imagenLocal);

      // Resetear form
      form.reset();
      previewImg.hidden = true;
      imagenLocal = null;
      nombreArchivo.textContent = '';
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

      // Editar publicación con modal estilizado
      if (btn.classList.contains('edit')) {
        const titleElem = card.querySelector('.pub-title');
        const descElem = card.querySelector('.pub-desc');
        const imgElem = card.querySelector('img');

        // --- MODAL PRO ---
        const modal = document.createElement('div');
        modal.className = 'modal-edit-pub';

        modal.innerHTML = `
          <div class="modal-content-edit">
            <h3>Editar publicación</h3>
            <label class="form-group">Título
              <input type="text" id="edit-titulo" value="${titleElem.textContent}" class="input-edit" />
            </label>
            <label class="form-group">Descripción
              <textarea id="edit-desc" rows="2" class="input-edit">${descElem.textContent}</textarea>
            </label>
            <label class="form-group">Imagen
              <input type="file" id="edit-img" accept="image/*" class="input-edit" />
            </label>
            <div class="preview-container" style="margin-bottom:1.2rem;">
              <span style="color:#C9D1D9;font-size:0.93em;">Vista previa:</span>
              <img id="edit-preview" src="${imgElem.src}" alt="Preview" />
            </div>
            <div class="form-actions modal-actions">
              <button id="guardarEdicion" class="btn guardar">Guardar</button>
              <button id="cancelarEdicion" class="btn cancelar">Cancelar</button>
            </div>
          </div>
        `;
        document.body.appendChild(modal);

        // Soporte preview para la nueva imagen
        const editImgInput = modal.querySelector('#edit-img');
        const editPreview  = modal.querySelector('#edit-preview');
        let nuevaImagen = null;
        editImgInput.addEventListener('change', () => {
          const file = editImgInput.files[0];
          if (file) {
            nuevaImagen = file;
            const reader = new FileReader();
            reader.onload = e => editPreview.src = e.target.result;
            reader.readAsDataURL(file);
          } else {
            editPreview.src = imgElem.src;
            nuevaImagen = null;
          }
        });

        // Guardar edición
        modal.querySelector('#guardarEdicion').onclick = () => {
          const nuevoTitulo = modal.querySelector('#edit-titulo').value.trim();
          const nuevaDesc = modal.querySelector('#edit-desc').value.trim();

          if (!nuevoTitulo || !nuevaDesc) {
            alert('Completa todos los campos');
            return;
          }

          titleElem.textContent = nuevoTitulo;
          descElem.textContent = nuevaDesc;

          if (nuevaImagen) {
            const reader = new FileReader();
            reader.onload = e => {
              imgElem.src = e.target.result;
              imgElem.alt = nuevoTitulo;
              document.body.removeChild(modal);
            };
            reader.readAsDataURL(nuevaImagen);
          } else {
            imgElem.alt = nuevoTitulo;
            document.body.removeChild(modal);
          }
        };

        // Cancelar edición
        modal.querySelector('#cancelarEdicion').onclick = () => {
          document.body.removeChild(modal);
        };

        // Cerrar modal al hacer clic fuera del contenido
        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            document.body.removeChild(modal);
          }
        });
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