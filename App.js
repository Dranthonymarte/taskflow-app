import { StatusBar } from 'expo-status-bar';
import WelcomeScreen from './src/components/WelcomeScreen';

export default function App() {
  return (
    <>
      <WelcomeScreen />
      <StatusBar style="light" />
    </>
  );
}
