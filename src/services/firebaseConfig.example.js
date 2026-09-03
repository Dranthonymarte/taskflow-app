// Plantilla de la configuración de Firebase.
//
// El proyecto real trae sus claves en src/services/firebase.js a propósito: no
// son secretas, identifican al proyecto y viajan dentro de cualquier app
// publicada. Lo que protege los datos son las reglas de firestore.rules. Por eso
// la app funciona apenas se clona el repositorio, sin pasos extra.
//
// Si querés apuntar TaskFlow a un proyecto tuyo, copiá estos valores desde
// consola de Firebase -> Configuración del proyecto -> Tus apps -> Configuración
// del SDK, y reemplazá con ellos el objeto firebaseConfig de firebase.js.

export const firebaseConfig = {
  apiKey: 'TU_API_KEY',
  authDomain: 'TU_PROYECTO.firebaseapp.com',
  projectId: 'TU_PROYECTO',
  storageBucket: 'TU_PROYECTO.firebasestorage.app',
  messagingSenderId: 'TU_MESSAGING_SENDER_ID',
  appId: 'TU_APP_ID',
};
