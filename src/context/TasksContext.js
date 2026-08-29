import { createContext, useContext, useState } from 'react';
import { tareasIniciales } from '../data/tareasIniciales';

const TasksContext = createContext(null);

export function TasksProvider({ children }) {
  const [tareas, setTareas] = useState(tareasIniciales);

  const agregarTarea = (tarea) => {
    setTareas((anteriores) => [tarea, ...anteriores]);
  };

  const alternarEstado = (id) => {
    setTareas((anteriores) =>
      anteriores.map((tarea) =>
        tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
      )
    );
  };

  const eliminarTarea = (id) => {
    setTareas((anteriores) => anteriores.filter((tarea) => tarea.id !== id));
  };

  const valor = { tareas, agregarTarea, alternarEstado, eliminarTarea };

  return <TasksContext.Provider value={valor}>{children}</TasksContext.Provider>;
}

export function useTasks() {
  const contexto = useContext(TasksContext);

  if (!contexto) {
    throw new Error('useTasks debe usarse dentro de TasksProvider');
  }

  return contexto;
}
