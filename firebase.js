// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCWwqmFgPLSzAxhj7a-1jljOQg3FWbZvrg",
    authDomain: "tokifiesta-16478.firebaseapp.com",
    projectId: "tokifiesta-16478",
    storageBucket: "tokifiesta-16478.firebasestorage.app",
    messagingSenderId: "485879781556",
    appId: "1:485879781556:web:b9a13d1381d22ba49e5fe1"
  };
  
  // Inicialización de Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  // Referencia al botón
  const estadoBtn = document.getElementById('estado-btn');
  let estadoActual = "cerrado";
  
  // ✅ Función para actualizar el estilo visual del botón
  function actualizarEstiloBoton(estado) {
    estadoBtn.textContent = `Estado: ${estado}`;
    if (estado === "abierto") {
      estadoBtn.classList.add('on');
      estadoBtn.classList.remove('off');
    } else {
      estadoBtn.classList.add('off');
      estadoBtn.classList.remove('on');
    }
  }
  
  // 📤 Escribir (actualizar) estado en Firestore
  estadoBtn.addEventListener('click', () => {
    estadoActual = (estadoActual === "cerrado") ? "abierto" : "cerrado";
  
    db.collection('discoteca').doc('id1').update({
      estado: estadoActual,
      actualizado: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      console.log("Estado actualizado en Firestore:", estadoActual);
      actualizarEstiloBoton(estadoActual);
    })
    .catch((error) => {
      // Si el documento no existe, lo creamos con set()
      if (error.code === 'not-found' || error.message.includes("No document to update")) {
        db.collection('discoteca').doc('id1').set({
          estado: estadoActual,
          actualizado: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true }) // merge para no eliminar otros campos
        .then(() => {
          console.log("Documento creado y estado asignado:", estadoActual);
          actualizarEstiloBoton(estadoActual);
        })
        .catch((err) => console.error("Error al crear documento:", err));
      } else {
        console.error("Error al escribir datos en Firestore:", error);
      }
    });
  });
  
  // 📥 Leer datos desde Firestore al cargar la página
  function cargarEstadoFirestore() {
    db.collection('discoteca').doc('id1').get()
      .then((doc) => {
        if (doc.exists) {
          estadoActual = doc.data().estado;
        } else {
          // Si no existe, lo creamos con estado cerrado (sin eliminar otros campos en el futuro)
          estadoActual = "cerrado";
          db.collection('discoteca').doc('id1').set({
            estado: estadoActual,
            actualizado: firebase.firestore.FieldValue.serverTimestamp()
          }, { merge: true });
        }
        actualizarEstiloBoton(estadoActual);
        console.log("Estado inicial cargado desde Firestore:", estadoActual);
      })
      .catch((error) => {
        console.error("Error al leer datos de Firestore:", error);
      });
  }
  document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");
  
    toggle.addEventListener("click", () => {
      menu.classList.toggle("oculto");
    });
  },)
  // 🔁 Ejecutar al cargar la página
  window.onload = cargarEstadoFirestore;  