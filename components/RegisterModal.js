import React, { useState, useEffect } from 'react';
import {
    Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions
} from 'react-native';
import Animated, {
    useSharedValue, useAnimatedStyle, withSpring, withTiming
} from 'react-native-reanimated';

const screen = Dimensions.get('window');

export default function RegisterModal({ visible, onClose, onLoginOpen }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const scale = useSharedValue(0);
    const opacity = useSharedValue(0);

    useEffect(() => {
        if (visible) {
            scale.value = withSpring(1);
            opacity.value = withTiming(1);
        } else {
            scale.value = withTiming(0);
            opacity.value = withTiming(0);
        }
    }, [visible]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
    }));

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('http://10.0.0.245/register.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Registration successful!');
                onClose(); // Close the modal or switch to login
            } else {
                alert(data.message || 'Registration failed');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred. Please try again.');
        }
    };


    return (
        <Modal visible={visible} animationType="none" transparent>
            <View style={styles.overlay}>
                <Animated.View style={[styles.modal, animatedStyle]}>
                    <Text style={styles.title}>Register</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={name}
                        onChangeText={setName}
                        accessibilityLabel="Name input"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        accessibilityLabel="Email input"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        accessibilityLabel="Password input"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        accessibilityLabel="Confirm Password input"
                    />

                    {error ? <Text style={styles.error}>{error}</Text> : null}

                    <TouchableOpacity style={styles.button} onPress={handleRegister}>
                        <Text style={styles.buttonText}>Create Account</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onLoginOpen}>
                        <Text style={styles.link}>Already have an account? Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onClose}>
                        <Text style={styles.linkClose}>Close</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#00000099',
    },
    modal: {
        backgroundColor: '#fff',
        marginHorizontal: 30,
        borderRadius: 12,
        padding: 20,
        elevation: 8,
    },
    title: { fontSize: 22, fontWeight: '600', marginBottom: 15 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 12,
    },
    button: {
        backgroundColor: '#28a745',
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: { color: '#fff', fontWeight: '600' },
    link: { color: '#007bff', textAlign: 'center', marginTop: 8 },
    linkClose: { color: '#888', textAlign: 'center', marginTop: 12 },
    error: { color: 'red', textAlign: 'center', marginBottom: 10 },
});
