// screens/ProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuthModals } from '../context/AuthModalContext';

export default function ProfileScreen() {
    const { showRegister } = useAuthModals();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>User Profile</Text>

            <TouchableOpacity style={styles.registerButton} onPress={showRegister}>
                <Text style={styles.registerText}>Register</Text>
            </TouchableOpacity>

            {/* Additional profile content can go here */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: '600', marginBottom: 20 },
    registerButton: {
        backgroundColor: '#28a745',
        padding: 10,
        borderRadius: 8,
        alignSelf: 'stretch',
        marginTop: 10,
    },
    registerText: { color: '#fff', fontWeight: '600', textAlign: 'center' },
});
