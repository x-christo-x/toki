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
  
  // === Cuando el DOM esté listo ===
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
  });
  