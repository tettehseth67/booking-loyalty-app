import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator';
import { AuthModalProvider } from './context/AuthModalContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthModalProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </AuthModalProvider>
    </GestureHandlerRootView>
  );
}
