import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthModals } from '../context/AuthModalContext';

export default function LoyaltyScreen() {
    const { user } = useAuthModals();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [points, setPoints] = useState(0);
    const [lastVisit, setLastVisit] = useState(null);

    useEffect(() => {
        const loadBookings = async () => {
            try {
                const stored = await AsyncStorage.getItem('bookings');
                const all = stored ? JSON.parse(stored) : [];

                const userBookings = all.filter(
                    (b) => b.user === (user?.name || 'Guest')
                );

                setBookings(userBookings);
                setPoints(userBookings.length * 10); // 10 pts per visit

                if (userBookings.length > 0) {
                    const last = new Date(
                        userBookings[userBookings.length - 1].datetime
                    );
                    setLastVisit(last.toLocaleString());
                }
            } catch (err) {
                console.error('Error loading loyalty data:', err);
            } finally {
                setLoading(false);
            }
        };

        loadBookings();
    }, [user]);

    if (loading) return <ActivityIndicator size="large" color="#007bff" />;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Loyalty Program</Text>
            <Text style={styles.subtitle}>
                Welcome back, {user?.name || 'Guest'}!
            </Text>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Points Earned</Text>
                <Text style={styles.points}>{points} pts</Text>
                <Text style={styles.info}>
                    Visits: {bookings.length}{"\n"}
                    Last Visit: {lastVisit || 'N/A'}
                </Text>
            </View>

            <Text style={styles.historyTitle}>Booking History</Text>
            <FlatList
                data={bookings}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.bookingItem}>
                        <Text>{item.service} - {new Date(item.datetime).toLocaleString()}</Text>
                    </View>
                )}
                ListEmptyComponent={<Text>No bookings yet.</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 26, fontWeight: 'bold', marginBottom: 5 },
    subtitle: { fontSize: 16, marginBottom: 20 },
    card: {
        backgroundColor: '#e6f0ff',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
    },
    cardTitle: { fontSize: 18, fontWeight: '600' },
    points: { fontSize: 32, fontWeight: 'bold', color: '#007bff' },
    info: { fontSize: 14, marginTop: 5 },
    historyTitle: { fontSize: 20, fontWeight: '600', marginBottom: 10 },
    bookingItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
});
