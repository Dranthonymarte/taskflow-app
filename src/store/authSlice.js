import { createSlice } from '@reduxjs/toolkit';

// El perfil arranca vacío. Es una función y no una constante suelta para que
// cada reinicio devuelva un objeto nuevo y nadie comparta la misma referencia.
const perfilVacio = () => ({ nombre: null, fotoURL: null });

const estadoInicial = {
  usuario: null,
  comprobandoSesion: true,
  perfil: perfilVacio(),
  guardandoPerfil: false,
  errorPerfil: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: estadoInicial,
  reducers: {
    setUsuario: (state, action) => {
      state.usuario = action.payload;
      state.comprobandoSesion = false;

      if (!action.payload) {
        // Al cerrar sesión hay que vaciar el perfil. Si no, la próxima persona
        // que entre en este mismo teléfono vería la foto de la anterior.
        state.perfil = perfilVacio();
        state.errorPerfil = null;
        return;
      }

      // onAuthStateChanged se vuelve a disparar cada vez que Firebase renueva el
      // token. Sin estos dos guards, esa repetición pisaría la foto o el nombre
      // que la persona acaba de elegir.
      if (state.perfil.fotoURL === null) {
        state.perfil.fotoURL = action.payload.fotoURL ?? null;
      }

      if (state.perfil.nombre === null) {
        state.perfil.nombre = action.payload.nombre ?? null;
      }
    },

    // Reemplaza el perfil completo con lo que llega desde Firestore.
    setPerfil: (state, action) => {
      state.perfil = { ...perfilVacio(), ...action.payload };
    },

    setFotoPerfil: (state, action) => {
      state.perfil.fotoURL = action.payload;
    },

    setNombrePerfil: (state, action) => {
      state.perfil.nombre = action.payload;
    },

    setGuardandoPerfil: (state, action) => {
      state.guardandoPerfil = action.payload;
    },

    setErrorPerfil: (state, action) => {
      state.errorPerfil = action.payload;
    },
  },
});

export const {
  setUsuario,
  setPerfil,
  setFotoPerfil,
  setNombrePerfil,
  setGuardandoPerfil,
  setErrorPerfil,
} = authSlice.actions;

export const selectUsuario = (state) => state.auth.usuario;

export const selectComprobandoSesion = (state) => state.auth.comprobandoSesion;

export const selectPerfil = (state) => state.auth.perfil;

export const selectFotoPerfil = (state) => state.auth.perfil.fotoURL;

export const selectNombrePerfil = (state) => state.auth.perfil.nombre;

export const selectGuardandoPerfil = (state) => state.auth.guardandoPerfil;

export const selectErrorPerfil = (state) => state.auth.errorPerfil;

export default authSlice.reducer;
