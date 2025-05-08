import React, { useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';

const screen = Dimensions.get('window');

export default function LoginModal({ visible, onClose, onRegisterOpen }) {
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

    return (
        <Modal visible={visible} animationType="none" transparent>
            <View style={styles.overlay}>
                <Animated.View style={[styles.modal, animatedStyle]}>
                    <Text style={styles.title}>Login</Text>

                    <TextInput style={styles.input} placeholder="Email" />
                    <TextInput style={styles.input} placeholder="Password" secureTextEntry />

                    <TouchableOpacity style={styles.button} onPress={onClose}>
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
    title: { fontSize: 22, fontWeight: '600', marginBottom: 15 },
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
    buttonText: { color: '#fff', fontWeight: '600' },
    link: { color: '#007bff', textAlign: 'center', marginTop: 8 },
    linkClose: { color: '#888', textAlign: 'center', marginTop: 12 },
});
