// screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useAuthModals } from '../context/AuthModalContext';

export default function HomeScreen({ navigation }) {
    const { showLogin } = useAuthModals();

    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>Welcome to the Barbershop</Text>

            <Text style={styles.sectionTitle}>Our Services</Text>

            <ScrollView style={styles.cardContainer}>
                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Booking')}>
                    <Text style={styles.cardTitle}>Haircut</Text>
                    <Text style={styles.cardSubtitle}>30 mins</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Booking')}>
                    <Text style={styles.cardTitle}>Shave</Text>
                    <Text style={styles.cardSubtitle}>20 mins</Text>
                </TouchableOpacity>
            </ScrollView>

            <View style={styles.loyaltyBox}>
                <Text style={styles.sectionTitle}>Loyalty Program</Text>
                <View style={styles.stamps}>
                    {Array(4)
                        .fill()
                        .map((_, index) => (
                            <View key={index} style={styles.stampFilled} />
                        ))}
                    <View style={styles.stampEmpty} />
                </View>
                <Text style={styles.remaining}>1 more to go</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Loyalty')}>
                    <Text style={styles.viewProgram}>View Loyalty Program</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={showLogin}>
                <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    welcome: { fontSize: 24, fontWeight: '600', marginBottom: 20 },
    loginButton: {
        backgroundColor: '#007bff',
        padding: 12,
        borderRadius: 8,
        marginBottom: 20,
        marginTop: 20,
        alignSelf: 'stretch',
    },
    loginText: { color: '#fff', fontWeight: '600', textAlign: 'center' },
    sectionTitle: { fontSize: 18, fontWeight: '500', marginBottom: 10 },
    card: {
        backgroundColor: '#f2f2f2',
        padding: 15,
        borderRadius: 12,
        marginBottom: 10,
    },
    cardTitle: { fontSize: 16, fontWeight: '500' },
    cardSubtitle: { color: '#666' },
    loyaltyBox: {
        backgroundColor: '#e6f0ff',
        padding: 15,
        borderRadius: 12,
        marginTop: 10,
    },
    stamps: {
        flexDirection: 'row',
        gap: 8,
        marginVertical: 10,
    },
    stampFilled: {
        width: 20,
        height: 20,
        backgroundColor: '#007bff',
        borderRadius: 10,
    },
    stampEmpty: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#007bff',
    },
    remaining: { fontSize: 14, color: '#333' },
    viewProgram: { marginTop: 8, color: '#007bff', fontWeight: '500' },
});
