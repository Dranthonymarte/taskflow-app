import { createSlice } from '@reduxjs/toolkit';

const estadoInicial = {
  lista: [],
  filtro: 'todas',
  cargando: true,
  error: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: estadoInicial,
  reducers: {
    // Reemplaza la lista completa con lo que llega desde Firestore.
    setTasks: (state, action) => {
      state.lista = action.payload;
      state.cargando = false;
      state.error = null;
    },

    // Sin el cargando en false, un fallo de lectura dejaba la lista girando
    // para siempre porque nadie más volvía a tocar esa bandera.
    setTasksError: (state, action) => {
      state.error = action.payload;
      state.cargando = false;
    },

    // Las tres acciones siguientes actualizan la pantalla al instante, sin
    // esperar la respuesta de la nube. Firestore confirma después con setTasks.
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
    limpiarTareas: (state) => {
      state.lista = [];
      state.cargando = true;
      state.error = null;
    },
  },
});

export const {
  setTasks,
  setTasksError,
  addTask,
  toggleTaskStatus,
  deleteTask,
  setFilter,
  limpiarTareas,
} = tasksSlice.actions;

export const selectLista = (state) => state.tasks.lista;

export const selectFiltro = (state) => state.tasks.filtro;

export const selectCargando = (state) => state.tasks.cargando;

export const selectErrorTareas = (state) => state.tasks.error;

export const selectPendientes = (state) =>
  state.tasks.lista.filter((tarea) => !tarea.completada).length;

export const selectTareaPorId = (id) => (state) =>
  state.tasks.lista.find((tarea) => tarea.id === id);

export default tasksSlice.reducer;
