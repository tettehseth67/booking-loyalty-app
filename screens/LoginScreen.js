// screens/LoginScreen.js
import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function LoginScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/briefcase.png')} style={styles.icon} />
            <Text style={styles.title}>Login</Text>
            <TextInput placeholder="Email" style={styles.input} />
            <TextInput placeholder="Password" secureTextEntry style={styles.input} />
            <Button title="Log in" onPress={() => navigation.navigate('Home')} />
            <TouchableOpacity onPress={() => { }}>
                <Text style={styles.signup}>Sign up</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    title: { fontSize: 32, marginVertical: 10 },
    input: { width: '100%', borderBottomWidth: 1, padding: 10, marginVertical: 10 },
    signup: { color: 'blue', marginTop: 10 },
    icon: { width: 80, height: 80, marginBottom: 20 },
});
