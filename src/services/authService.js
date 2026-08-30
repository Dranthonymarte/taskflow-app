import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from './firebase';

const MENSAJES = {
  'auth/invalid-email': 'El correo no tiene un formato válido.',
  'auth/missing-password': 'Escribí tu contraseña.',
  'auth/weak-password': 'La contraseña necesita al menos 6 caracteres.',
  'auth/email-already-in-use': 'Ya existe una cuenta con ese correo.',
  'auth/invalid-credential': 'El correo o la contraseña no coinciden.',
  'auth/user-not-found': 'No encontramos una cuenta con ese correo.',
  'auth/wrong-password': 'El correo o la contraseña no coinciden.',
  'auth/too-many-requests': 'Demasiados intentos. Probá de nuevo en un rato.',
  'auth/network-request-failed': 'Sin conexión. Revisá tu internet.',
};

export function traducirError(error) {
  return MENSAJES[error.code] || 'No pudimos completar la operación. Intentá otra vez.';
}

export function registrar(correo, contrasena) {
  return createUserWithEmailAndPassword(auth, correo.trim(), contrasena);
}

export function iniciarSesion(correo, contrasena) {
  return signInWithEmailAndPassword(auth, correo.trim(), contrasena);
}

export function cerrarSesion() {
  return signOut(auth);
}
