# TaskFlow

Aplicación móvil de productividad para gestionar tareas, hábitos y metas personales,
construida con React Native y Expo.

## Estado actual

**Checkpoint 2: Componentes, estilos y estructura.** Sobre la base del Checkpoint 1 se
agregó una tarjeta de perfil reutilizable (`ProfileCard`) que recibe sus datos por props,
las pantallas iniciales (`HomeScreen` y `ProfileScreen`) y una paleta de colores centralizada
en `src/constants/colors.js`. `App.js` ahora renderiza `ProfileScreen`, donde se ven dos
`ProfileCard` con datos distintos para comprobar que el componente es realmente reutilizable.

## Estructura del proyecto

```
taskflow-app/
├── App.js                        # Punto de entrada, renderiza ProfileScreen
├── src/
│   ├── components/
│   │   ├── WelcomeScreen.js       # Pantalla del Checkpoint 1
│   │   └── ProfileCard.js         # Tarjeta reutilizable (props: name, role, image)
│   ├── screens/
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

- Módulo 3-4: formularios y listas dinámicas.
- Módulo 5: navegación entre pantallas.
- Módulo 6: estado global con Redux Toolkit.
- Módulo 7: persistencia con Firebase.
