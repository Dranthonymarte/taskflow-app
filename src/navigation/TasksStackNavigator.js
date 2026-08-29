import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskListScreen from '../screens/TaskListScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
import { colors } from '../constants/colors';

const Stack = createNativeStackNavigator();

export default function TasksStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.surface,
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <Stack.Screen name="TaskList" component={TaskListScreen} options={{ title: 'Mis tareas' }} />
      <Stack.Screen
        name="TaskDetail"
        component={TaskDetailScreen}
        options={{ title: 'Detalle de la tarea' }}
      />
      <Stack.Screen name="AddTask" component={AddTaskScreen} options={{ title: 'Nueva tarea' }} />
    </Stack.Navigator>
  );
}
