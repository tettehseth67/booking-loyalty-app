import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BookingHistoryScreen() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadBookings();
    }, []);

    const loadBookings = async () => {
        try {
            const stored = await AsyncStorage.getItem('bookings');
            const parsed = stored ? JSON.parse(stored) : [];
            setBookings(parsed.reverse()); // newest first
        } catch (err) {
            console.error('Error loading bookings:', err);
        } finally {
            setLoading(false);
        }
    };

    const clearBookings = async () => {
        Alert.alert('Clear History', 'Are you sure you want to delete all booking history?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Clear',
                style: 'destructive',
                onPress: async () => {
                    try {
                        await AsyncStorage.removeItem('bookings');
                        setBookings([]);
                    } catch (err) {
                        console.error('Error clearing bookings:', err);
                    }
                },
            },
        ]);
    };

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#007bff" />
                <Text>Loading booking history...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Booking History</Text>

            {bookings.length > 0 && (
                <TouchableOpacity style={styles.clearButton} onPress={clearBookings}>
                    <Text style={styles.clearText}>Clear History</Text>
                </TouchableOpacity>
            )}

            {bookings.length === 0 ? (
                <View style={styles.centered}>
                    <Text style={styles.empty}>You have no past bookings.</Text>
                </View>
            ) : (
                <FlatList
                    data={bookings}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Text style={styles.service}>{item.service}</Text>
                            <Text style={styles.date}>
                                {new Date(item.date).toLocaleDateString()} by {item.user}
                            </Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
    card: {
        backgroundColor: '#f8f9fa',
        padding: 16,
        borderRadius: 10,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 3,
    },
    service: { fontSize: 18, fontWeight: '600' },
    date: { fontSize: 14, color: '#666', marginTop: 4 },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    empty: { fontSize: 16, color: '#999' },
    clearButton: {
        backgroundColor: '#ff4d4d',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 15,
    },
    clearText: {
        color: '#fff',
        fontWeight: '600',
    },
});
