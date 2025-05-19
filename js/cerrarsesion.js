// Inicialización de Firebase (misma config que en tu app.js)
const firebaseConfig = {
    apiKey: "AIzaSyCWwqmFgPLSzAxhj7a-1jljOQg3FWbZvrg",
    authDomain: "tokifiesta-16478.firebaseapp.com",
    projectId: "tokifiesta-16478",
    storageBucket: "tokifiesta-16478.firebasestorage.app",
    messagingSenderId: "485879781556",
    appId: "1:485879781556:web:b9a13d1381d22ba49e5fe1"
  };
  firebase.initializeApp(firebaseConfig);
  
  // Referencia al servicio de Auth
  const auth = firebase.auth();
  
  // Comprueba si hay usuario; si no, redirige al login
  auth.onAuthStateChanged(user => {
    if (!user) {
      window.location.href = 'index.html';
    }
  });
  
  // Captura el click en “Cerrar sesión”
  document.getElementById('logout')
    .addEventListener('click', function(e) {
      e.preventDefault();
      auth.signOut()
        .then(() => {
          // al cerrar, vuelve al login
          window.location.href = 'index.html';
        })
        .catch(err => {
          console.error('Error al cerrar sesión:', err);
          alert('No se pudo cerrar sesión. Intenta de nuevo.');
        });
    });
    