import React, { useEffect, useState } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator,
} from 'react-native';
import { useAuthModals } from '../context/AuthModalContext';

export default function HomeScreen({ navigation }) {
    const { showLogin } = useAuthModals();
    const [username, setUsername] = useState('Guest');
    const [services, setServices] = useState([]);
    const [recentBookings, setRecentBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate async fetch for user and data
        const fetchData = async () => {
            try {
                // Replace with real API calls
                const user = await fakeFetchUser();
                const serviceList = await fakeFetchServices();
                const bookings = await fakeFetchBookings();

                setUsername(user.name);
                setServices(serviceList);
                setRecentBookings(bookings);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const fakeFetchUser = () => Promise.resolve({ name: 'Alex' });
    const fakeFetchServices = () =>
        Promise.resolve([
            { id: '1', name: 'Haircut', duration: '30 mins' },
            { id: '2', name: 'Shave', duration: '20 mins' },
        ]);
    const fakeFetchBookings = () =>
        Promise.resolve([
            { id: '101', service: 'Haircut', date: '2025-05-01' },
            { id: '102', service: 'Shave', date: '2025-04-20' },
        ]);

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#007bff" />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.welcome}>Welcome, {username}!</Text>

            {/* Promotion Banner */}
            <View style={styles.banner}>
                <Text style={styles.bannerText}>🔥 20% off this week on Beard Trims!</Text>
            </View>

            {/* Services Section */}
            <Text style={styles.sectionTitle}>Our Services</Text>
            {services.map(service => (
                <TouchableOpacity
                    key={service.id}
                    style={styles.card}
                    onPress={() => navigation.navigate('Booking')}
                >
                    <Text style={styles.cardTitle}>{service.name}</Text>
                    <Text style={styles.cardSubtitle}>{service.duration}</Text>
                </TouchableOpacity>
            ))}

            {/* Loyalty Section */}
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

            {/* Recent Bookings */}
            <Text style={styles.sectionTitle}>Recent Bookings</Text>
            {recentBookings.map(b => (
                <View key={b.id} style={styles.bookingCard}>
                    <Text style={styles.cardTitle}>{b.service}</Text>
                    <Text style={styles.cardSubtitle}>{b.date}</Text>
                </View>
            ))}

            <TouchableOpacity style={styles.loginButton} onPress={showLogin}>
                <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff', marginBottom: 20 },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    welcome: { fontSize: 24, fontWeight: '600', marginBottom: 20 },
    banner: {
        backgroundColor: '#ffe6e6',
        padding: 12,
        borderRadius: 10,
        marginBottom: 15,
    },
    bannerText: { color: '#cc0000', fontWeight: '500', fontSize: 15, textAlign: 'center' },
    sectionTitle: { fontSize: 18, fontWeight: '500', marginVertical: 10 },
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
        marginBottom: 20,
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
    bookingCard: {
        backgroundColor: '#f9f9f9',
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
    },
    loginButton: {
        backgroundColor: '#007bff',
        padding: 12,
        borderRadius: 8,
        marginTop: 30,
        marginBottom: 20,
        alignSelf: 'stretch',
    },
    loginText: { color: '#fff', fontWeight: '600', textAlign: 'center' },
});
