import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Animated,
} from 'react-native';

export default function LoyaltyScreen() {
    const [points, setPoints] = useState(35); // Example points
    const animatedWidth = useRef(new Animated.Value((35 / 50) * 100)).current;

    const handleRedeem = () => {
        if (points >= 50) {
            Alert.alert('Redeemed!', 'You have redeemed your 50 points 🎉');
            const newPoints = points - 50;
            setPoints(newPoints);
        } else {
            Alert.alert('Not Enough Points', 'You need at least 50 points to redeem.');
        }
    };

    useEffect(() => {
        const targetPercent = Math.min(points / 50, 1) * 100;

        Animated.timing(animatedWidth, {
            toValue: targetPercent,
            duration: 500,
            useNativeDriver: false,
        }).start();
    }, [points]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Loyalty Rewards</Text>
            <Text style={styles.points}>You have {points} points</Text>

            <View style={styles.progressBar}>
                <Animated.View style={[styles.progressFill, {
                    width: animatedWidth.interpolate({
                        inputRange: [0, 100],
                        outputRange: ['0%', '100%'],
                    })
                }]} />
            </View>
            <Text style={styles.goalText}>50 points = Free Service</Text>

            <Text style={styles.earnInfo}>
                Earn 10 points for every booking you complete.
            </Text>

            <TouchableOpacity style={styles.button} onPress={handleRedeem}>
                <Text style={styles.buttonText}>Redeem Points</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
    points: { fontSize: 22, textAlign: 'center', marginBottom: 10 },
    progressBar: {
        height: 20,
        backgroundColor: '#eee',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 10,
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#007bff',
    },
    goalText: { fontSize: 16, textAlign: 'center', marginBottom: 20 },
    earnInfo: { fontSize: 16, color: '#555', marginBottom: 30, textAlign: 'center' },
    button: {
        backgroundColor: '#28a745',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: { color: '#fff', fontSize: 16 },
});
