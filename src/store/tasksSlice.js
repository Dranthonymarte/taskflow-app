import { createSlice } from '@reduxjs/toolkit';
import { tareasIniciales } from '../data/tareasIniciales';

const estadoInicial = {
  lista: tareasIniciales,
  filtro: 'todas',
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: estadoInicial,
  reducers: {
    addTask: (state, action) => {
      state.lista.unshift(action.payload);
    },
    toggleTaskStatus: (state, action) => {
      const tarea = state.lista.find((elemento) => elemento.id === action.payload);

      if (tarea) {
        tarea.completada = !tarea.completada;
      }
    },
    deleteTask: (state, action) => {
      state.lista = state.lista.filter((tarea) => tarea.id !== action.payload);
    },
    setFilter: (state, action) => {
      state.filtro = action.payload;
    },
  },
});

export const { addTask, toggleTaskStatus, deleteTask, setFilter } = tasksSlice.actions;

export const selectLista = (state) => state.tasks.lista;

export const selectFiltro = (state) => state.tasks.filtro;

export const selectPendientes = (state) =>
  state.tasks.lista.filter((tarea) => !tarea.completada).length;

export const selectTareaPorId = (id) => (state) =>
  state.tasks.lista.find((tarea) => tarea.id === id);

export default tasksSlice.reducer;
