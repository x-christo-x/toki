// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCWwqmFgPLSzAxhj7a-1jljOQg3FWbZvrg",
    authDomain: "tokifiesta-16478.firebaseapp.com",
    projectId: "tokifiesta-16478",
    storageBucket: "tokifiesta-16478.firebasestorage.app",
    messagingSenderId: "485879781556",
    appId: "1:485879781556:web:b9a13d1381d22ba49e5fe1"
  };
// 2) Inicializa Firebase y Firestore
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 3) Referencias al DOM
const form      = document.getElementById("loginForm");
const inputUser = document.getElementById("usuario");
const inputPass = document.getElementById("password");
const errorMsg  = document.getElementById("errorMsg");

// 4) Maneja el submit del formulario
form.addEventListener("submit", async e => {
  e.preventDefault();
  errorMsg.style.display = "none";

  const nombreIngresado = inputUser.value.trim();
  const passIngresada   = inputPass.value;

  try {
    // 5) Leemos el documento id1 dentro de la colección "discoteca"
    const docRef  = db.collection("discoteca").doc("id1");
    const snap    = await docRef.get();

    if (!snap.exists) {
      throw new Error("No se encontró la configuración de inicio");
    }

    const { nombre, contraseña } = snap.data();

    // 6) Comparamos los campos con lo ingresado
    if (nombreIngresado === nombre && passIngresada === contraseña) {
      // Opcional: guarda el nombre para la siguiente página
      sessionStorage.setItem("usuario", nombre);
      // Redirige al dashboard
      window.location.href = "page1.html";
    } else {
      throw new Error("Usuario o contraseña incorrectos");
    }

  } catch (err) {
    errorMsg.textContent = err.message;
    errorMsg.style.display = "block";
  }
});