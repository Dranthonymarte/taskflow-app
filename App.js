import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import TaskListScreen from './src/screens/TaskListScreen';
import TaskDetailScreen from './src/screens/TaskDetailScreen';
import AddTaskScreen from './src/screens/AddTaskScreen';
import { tareasIniciales } from './src/data/tareasIniciales';

export default function App() {
  const [tareas, setTareas] = useState(tareasIniciales);
  const [pantalla, setPantalla] = useState('lista');
  const [tareaSeleccionadaId, setTareaSeleccionadaId] = useState(null);

  const tareaSeleccionada = tareas.find((tarea) => tarea.id === tareaSeleccionadaId);

  const abrirDetalle = (id) => {
    setTareaSeleccionadaId(id);
    setPantalla('detalle');
  };

  const volverALista = () => {
    setTareaSeleccionadaId(null);
    setPantalla('lista');
  };

  const agregarTarea = (tarea) => {
    setTareas((anteriores) => [tarea, ...anteriores]);
    setPantalla('lista');
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
    volverALista();
  };

  return (
    <>
      {pantalla === 'lista' ? (
        <TaskListScreen
          tareas={tareas}
          onSeleccionarTarea={abrirDetalle}
          onNuevaTarea={() => setPantalla('nueva')}
        />
      ) : null}

      {pantalla === 'detalle' ? (
        <TaskDetailScreen
          tarea={tareaSeleccionada}
          onVolver={volverALista}
          onAlternarEstado={alternarEstado}
          onEliminar={eliminarTarea}
        />
      ) : null}

      {pantalla === 'nueva' ? (
        <AddTaskScreen onGuardar={agregarTarea} onCancelar={volverALista} />
      ) : null}

      <StatusBar style="dark" />
    </>
  );
}
