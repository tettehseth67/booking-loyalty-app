import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './DrawerNavigator';
import LoginModal from '../components/LoginModal';
import RegisterModal from '../components/RegisterModal';
import { useAuthModals } from '../context/AuthModalContext';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
    const {
        loginVisible,
        registerVisible,
        hideModals,
        showRegister,
        showLogin,
    } = useAuthModals();

    return (
        <>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="MainHome" component={DrawerNavigator} />
            </Stack.Navigator>

            <LoginModal
                visible={loginVisible}
                onClose={hideModals}
                onRegisterOpen={showRegister}
            />

            <RegisterModal
                visible={registerVisible}
                onClose={hideModals}
                onLoginOpen={showLogin}
            />
        </>
    );
}
