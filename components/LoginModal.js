import React, { useEffect, useState } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Image,
} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // adjust path as needed

const screen = Dimensions.get('window');

export default function LoginModal({ visible, onClose, onRegisterOpen }) {
    const scale = useSharedValue(0);
    const opacity = useSharedValue(0);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { login } = useAuth();

    useEffect(() => {
        if (visible) {
            scale.value = withSpring(1);
            opacity.value = withTiming(1);
        } else {
            scale.value = withTiming(0);
            opacity.value = withTiming(0);
            setEmail('');
            setPassword('');
            setError('');
        }
    }, [visible]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
    }));

    const handleLogin = async () => {
        try {
            const response = await fetch('http://10.0.0.245/login.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    password
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Login successful!');
                console.log('User:', data.user);
                onClose(); // Close the modal
            } else {
                alert(data.message || 'Login failed');
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
                    <Image source={require('../assets/briefcase.png')} style={styles.icon} />
                    <Text style={styles.title}>Login</Text>

                    {error ? <Text style={styles.error}>{error}</Text> : null}

                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onRegisterOpen}>
                        <Text style={styles.link}>Don't have an account? Register</Text>
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
    title: {
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 15,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 12,
    },
    button: {
        backgroundColor: '#007bff',
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
    },
    link: {
        color: '#007bff',
        textAlign: 'center',
        marginTop: 8,
    },
    linkClose: {
        color: '#888',
        textAlign: 'center',
        marginTop: 12,
    },
    icon: {
        width: 80,
        height: 80,
        marginBottom: 10,
        alignSelf: 'center',
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    },
});
