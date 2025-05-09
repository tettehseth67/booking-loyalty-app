// navigation/DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNavigator from './BottomTabNavigator';
import BookingHistoryScreen from '../screens/BookingHistoryScreen';
import RewardScreen from '../screens/RewardScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { Ionicons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator 
            screenOptions={{
                drawerStyle: {
                    backgroundColor: '#fff',
                    width: 350,
                },
                drawerLabelStyle: {
                    fontSize: 16,
                    fontWeight: '600',
                },
                drawerActiveTintColor: '#007bff',
                drawerInactiveTintColor: '#000',
            }}>
            <Drawer.Screen name="Main" component={BottomTabNavigator}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="home-outline" size={24} color={color} />
                    ),
                }}
            />
            <Drawer.Screen name="History" component={BookingHistoryScreen} 
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="time-outline" size={24} color={color} />
                    ),
                }}
            />
            <Drawer.Screen name="Rewards" component={RewardScreen} 
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="star-outline" size={24} color={color} />
                    ),
                }}
            />

            <Drawer.Screen name="Settings" component={SettingsScreen} 
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="settings-outline" size={24} color={color} />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
}
