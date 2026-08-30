import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuración pública del proyecto de Firebase. Estas claves identifican al
// proyecto, no son un secreto: viajan dentro de cualquier app publicada. Quien
// protege los datos son las reglas de seguridad de Firestore, no este archivo.
const firebaseConfig = {
  apiKey: 'AIzaSyAFgffm8_upmaXX-73ljDB0038C2gNQR9Y',
  authDomain: 'taskflow-app-41f21.firebaseapp.com',
  projectId: 'taskflow-app-41f21',
  storageBucket: 'taskflow-app-41f21.firebasestorage.app',
  messagingSenderId: '1020588155400',
  appId: '1:1020588155400:web:7a2f827ccf432ba669e7bd',
};

const app = initializeApp(firebaseConfig);

// initializeAuth con AsyncStorage es lo que hace que la sesión sobreviva al
// cerrar la app. Con getAuth() a secas la sesión se perdería en cada arranque.
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
