// === Configuración de Firebase (usa solo UNA VEZ este bloque) === 
const firebaseConfig = {
  apiKey: "AIzaSyCWwqmFgPLSzAxhj7a-1jljOQg3FWbZvrg",
  authDomain: "tokifiesta-16478.firebaseapp.com",
  projectId: "tokifiesta-16478",
  storageBucket: "tokifiesta-16478.appspot.com",
  messagingSenderId: "485879781556",
  appId: "1:485879781556:web:b9a13d1381d22ba49e5fe1"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const auth = firebase.auth();

document.addEventListener('DOMContentLoaded', () => {
  // === Firestore EN VIVO: clicks y calificacion ===
  const clicksElem = document.getElementById('clicks');
  const valoracionElem = document.getElementById('calificacion');

  db.collection('discoteca').doc('id1').onSnapshot(doc => {
    if (doc.exists) {
      const data = doc.data();
      if (clicksElem) clicksElem.textContent = data.clicks ?? '--';
      if (valoracionElem) valoracionElem.textContent = (data.calificacion ?? '--') + ' ★';
    } else {
      if (clicksElem) clicksElem.textContent = '--';
      if (valoracionElem) valoracionElem.textContent = '--';
    }
  }, err => {
    if (clicksElem) clicksElem.textContent = '--';
    if (valoracionElem) valoracionElem.textContent = '--';
    console.error('Error al leer datos de Firestore:', err);
  });

  // === Firebase Auth: Verifica usuario autenticado ===
  auth.onAuthStateChanged(user => {
    if (!user) {
      window.location.href = 'index.html';
    }
  });

  // === Cerrar sesión ===
  const logoutBtn = document.getElementById('logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      auth.signOut()
        .then(() => {
          window.location.href = 'index.html';
        })
        .catch(err => {
          console.error('Error al cerrar sesión:', err);
          alert('No se pudo cerrar sesión. Intenta de nuevo.');
        });
    });
  }

  //=== Contar Total de Reservas ===
  const reservasElem = document.getElementById('cantReservas');
  db.collection('discoteca').doc('id1').collection('reservas')
    .onSnapshot(snapshot => {
      const cantidad = snapshot.size;
      reservasElem.textContent = cantidad;
    }, err => {
      reservasElem.textContent = '--';
      console.error('Error al obtener reservas:', err);
    });

  // === Contar reservas HOY (DD/MM/YYYY) ===
  const reservasHoyElem = document.getElementById('reservasHoy');

  const hoy = new Date();
  const yyyy = hoy.getFullYear();
  const mm = String(hoy.getMonth() + 1).padStart(2, '0');
  const dd = String(hoy.getDate()).padStart(2, '0');
  const fechaHoy = `${dd}/${mm}/${yyyy}`; // Formato DD/MM/YYYY

  db.collection('discoteca').doc('id1').collection('reservas')
    .where('fecha', '==', fechaHoy)
    .onSnapshot(snapshot => {
      reservasHoyElem.textContent = snapshot.size;
    }, err => {
      reservasHoyElem.textContent = '--';
      console.error('Error al obtener reservas de hoy:', err);
    });

  // === Total generado del mes (con fecha DD/MM/YYYY y suma de precioMesa) ===
  const totalMesElem = document.getElementById('totalMes');
  db.collection('discoteca').doc('id1').collection('reservas')
    .onSnapshot(snapshot => {
      let total = 0;
      snapshot.forEach(doc => {
        const data = doc.data();
        const fecha = data.Fecha || data.fecha; // usa el nombre real del campo
        const precio = Number(data.precioMesa) || 0;

        if (fecha) {
          // fecha es tipo DD/MM/YYYY
          const [dia, mes, anio] = fecha.split('/');
          if (anio == yyyy && mes == mm) {
            total += precio;
          }
        }
      });
      totalMesElem.textContent = '$' + total.toLocaleString();
      // También puedes imprimir el total en consola:
      console.log('Total generado en el mes:', total);
    }, err => {
      totalMesElem.textContent = '--';
      console.error('Error al calcular total del mes:', err);
    });
});