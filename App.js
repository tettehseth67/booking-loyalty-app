import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator';
import { AuthModalProvider } from './context/AuthModalContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <AuthProvider>
      <AuthModalProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </AuthModalProvider>
    </AuthProvider>
    </GestureHandlerRootView>
  );
}
