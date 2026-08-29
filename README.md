# TaskFlow

Aplicación móvil de productividad para gestionar tareas, hábitos y metas personales,
construida con React Native y Expo.

## Estado actual

**Checkpoint 3: Estado local, eventos y formularios.** Se agregó `AddTaskScreen`, un
formulario controlado con `useState`. Los dos campos viven en un único objeto de estado que
se actualiza con el operador spread, sin mutar el estado anterior. La validación exige un
título de al menos 3 caracteres y una descripción no vacía, y los mensajes de error solo
aparecen cuando el campo ya fue tocado (`onBlur`), para no regañar al usuario mientras
escribe. Al enviar, la tarea se imprime por consola con `console.log` y el formulario se
limpia.

## Estructura del proyecto

```
taskflow-app/
├── App.js                        # Punto de entrada, renderiza AddTaskScreen
├── src/
│   ├── components/
│   │   ├── WelcomeScreen.js       # Pantalla del Checkpoint 1
│   │   └── ProfileCard.js         # Tarjeta reutilizable (props: name, role, image)
│   ├── screens/
│   │   ├── AddTaskScreen.js       # Formulario controlado con validación
│   │   ├── HomeScreen.js          # Placeholder de la futura lista de tareas
│   │   └── ProfileScreen.js       # Muestra ProfileCard con datos de prueba
│   ├── constants/
│   │   └── colors.js              # Paleta de colores de TaskFlow
│   ├── assets/                    # Imágenes y fuentes locales
│   └── theme/                     # Reservado para próximos módulos
└── assets/                        # Assets generados por Expo (ícono, splash)
```

## Cómo ejecutar el proyecto localmente

1. Instalar las dependencias:
   ```
   npm install
   ```
2. Iniciar el servidor de desarrollo:
   ```
   npx expo start
   ```
3. Escanear el código QR que aparece en la terminal con la app **Expo Go**
   (disponible en App Store / Google Play) para ver la aplicación en tu teléfono.

## Próximos pasos

- Módulo 4: listas dinámicas y pantalla de detalle.
- Módulo 5: navegación entre pantallas.
- Módulo 6: estado global con Redux Toolkit.
- Módulo 7: persistencia con Firebase.
