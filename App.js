import { StatusBar } from 'expo-status-bar';
import ProfileScreen from './src/screens/ProfileScreen';

export default function App() {
  return (
    <>
      <ProfileScreen />
      <StatusBar style="dark" />
    </>
  );
}
