import { StatusBar } from 'expo-status-bar';
import AddTaskScreen from './src/screens/AddTaskScreen';

export default function App() {
  return (
    <>
      <AddTaskScreen />
      <StatusBar style="dark" />
    </>
  );
}
