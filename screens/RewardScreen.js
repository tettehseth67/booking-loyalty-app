import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthModals } from '../context/AuthModalContext';

export default function RewardScreen() {
    const { user } = useAuthModals();
    const [points, setPoints] = useState(0);
    const [rewards, setRewards] = useState([]);

    const POINTS_REQUIRED = 50;

    useEffect(() => {
        const loadPointsAndRewards = async () => {
            try {
                const bookingsData = await AsyncStorage.getItem('bookings');
                const allBookings = bookingsData ? JSON.parse(bookingsData) : [];
                const userBookings = allBookings.filter(
                    (b) => b.user === (user?.name || 'Guest')
                );

                setPoints(userBookings.length * 10);

                const rewardsData = await AsyncStorage.getItem('rewards');
                const allRewards = rewardsData ? JSON.parse(rewardsData) : [];

                const userRewards = allRewards.filter(
                    (r) => r.user === (user?.name || 'Guest')
                );

                setRewards(userRewards);
            } catch (err) {
                console.error('Error loading reward data:', err);
            }
        };

        loadPointsAndRewards();
    }, [user]);

    const handleRedeem = async () => {
        if (points < POINTS_REQUIRED) {
            Alert.alert("Not enough points", `You need at least ${POINTS_REQUIRED} points to redeem.`);
            return;
        }

        const newReward = {
            user: user?.name || 'Guest',
            date: new Date().toISOString(),
            reward: 'Free Haircut',
        };

        const updatedRewards = [...rewards, newReward];
        await AsyncStorage.setItem('rewards', JSON.stringify(updatedRewards));

        Alert.alert("Reward Claimed!", "You've claimed a Free Haircut 🎉");
        setRewards(updatedRewards);
        setPoints(points - POINTS_REQUIRED); // Optional: deduct points
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Redeem Your Reward</Text>
            <Text style={styles.points}>
                {points} points
            </Text>
            <Text style={styles.description}>
                Earn 10 points for every visit. Redeem a Free Haircut at 50 points!
            </Text>

            <TouchableOpacity
                style={[
                    styles.button,
                    points < POINTS_REQUIRED && styles.disabledButton,
                ]}
                onPress={handleRedeem}
                disabled={points < POINTS_REQUIRED}
            >
                <Text style={styles.buttonText}>Claim Reward</Text>
            </TouchableOpacity>

            <Text style={styles.redeemedTitle}>Past Rewards:</Text>
            {rewards.length === 0 ? (
                <Text>No rewards claimed yet.</Text>
            ) : (
                rewards.map((r, idx) => (
                    <Text key={idx} style={styles.rewardItem}>
                        {r.reward} - {new Date(r.date).toLocaleDateString()}
                    </Text>
                ))
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 26, fontWeight: 'bold', marginBottom: 10 },
    points: { fontSize: 30, fontWeight: 'bold', color: '#007bff', marginBottom: 5 },
    description: { fontSize: 14, marginBottom: 20 },
    button: {
        backgroundColor: '#28a745',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
    redeemedTitle: { fontSize: 18, marginTop: 20, marginBottom: 5 },
    rewardItem: { fontSize: 14, color: '#555' },
});
