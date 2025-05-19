// app.js
// 1) Configura tu Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCWwqmFgPLSzAxhj7a-1jljOQg3FWbZvrg",
  authDomain: "tokifiesta-16478.firebaseapp.com",
  projectId: "tokifiesta-16478",
  storageBucket: "tokifiesta-16478.firebasestorage.app",
  messagingSenderId: "485879781556",
  appId: "1:485879781556:web:b9a13d1381d22ba49e5fe1"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// 2) Si ya hay sesión activa, redirige a home
auth.onAuthStateChanged(user => {
  if (user) window.location = 'Home.html';
});

// 3) Manejo del formulario de login
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const pass  = document.getElementById('password').value.trim();
  auth.signInWithEmailAndPassword(email, pass)
    .then(() => window.location = 'Home.html')
    .catch(err => alert(err.message));
});
