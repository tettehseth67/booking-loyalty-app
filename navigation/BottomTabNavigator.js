// App.js or BottomTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BookingScreen from '../screens/BookingScreen';
import HomeScreen from '../screens/HomeScreen';
import LoyaltyScreen from '../screens/LoyaltyScreen'; // Ensure correct import name
import ProfileScreen from '../screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: '#007bff',
                tabBarInactiveTintColor: '#888',
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'Booking') {
                        iconName = 'calendar';
                    } else if (route.name === 'Loyalty') {
                        iconName = 'gift';
                    } else if (route.name === 'Profile') {
                        iconName = 'person';
                    } else if (route.name === 'Home') {
                        iconName = 'home';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Booking" component={BookingScreen} />
            <Tab.Screen name="Loyalty" component={LoyaltyScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}
