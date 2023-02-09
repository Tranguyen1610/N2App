import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import StartScreen from './src/screens/StartScreen';

export default function App() {
  const [isLoadingg, setIsLoadingg] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoadingg(false)
    }, 1500)
  }, []);
  if (isLoadingg) {
    return (
      <StartScreen />
    )
  }
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
