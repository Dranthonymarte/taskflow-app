import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import { TasksProvider } from './src/context/TasksContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <TasksProvider>
        <RootNavigator />
        <StatusBar style="light" />
      </TasksProvider>
    </SafeAreaProvider>
  );
}
