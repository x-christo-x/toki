// Inicialización de Firebase (misma config que en tu app.js)
const firebaseConfig = {
    apiKey: "AIzaSyCWwqmFgPLSzAxhj7a-1jljOQg3FWbZvrg",
    authDomain: "tokifiesta-16478.firebaseapp.com",
    projectId: "tokifiesta-16478",
    storageBucket: "tokifiesta-16478.firebasestorage.app",
    messagingSenderId: "485879781556",
    appId: "1:485879781556:web:b9a13d1381d22ba49e5fe1"
  };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();

// Listener: Detecta en tiempo real si el usuario NO está logueado y redirige
auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.replace('index.html');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      auth.signOut()
        .then(() => {
          // Redirige a la pantalla intermedia de "Cerrando sesión..."
          window.location.replace('cerrar.html');
        })
        .catch(err => {
          console.error('Error al cerrar sesión:', err);
          alert('No se pudo cerrar sesión. Intenta de nuevo.');
        });
    });
  }
});
