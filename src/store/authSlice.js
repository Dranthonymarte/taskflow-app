import { createSlice } from '@reduxjs/toolkit';

const estadoInicial = {
  usuario: null,
  comprobandoSesion: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: estadoInicial,
  reducers: {
    setUsuario: (state, action) => {
      state.usuario = action.payload;
      state.comprobandoSesion = false;
    },
  },
});

export const { setUsuario } = authSlice.actions;

export const selectUsuario = (state) => state.auth.usuario;
export const selectComprobandoSesion = (state) => state.auth.comprobandoSesion;

export default authSlice.reducer;
