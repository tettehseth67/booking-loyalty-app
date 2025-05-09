import React, { useState } from 'react';
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Platform,
    StyleSheet,
    Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthModals } from '../context/AuthModalContext';

export default function BookingScreen() {
    const { user } = useAuthModals();
    const [date, setDate] = useState(new Date());
    const [showDate, setShowDate] = useState(false);
    const [showTime, setShowTime] = useState(false);
    const [selectedService, setSelectedService] = useState('Haircut');

    const handleDateChange = (event, selectedDate) => {
        if (selectedDate) {
            const currentDate = selectedDate;
            setShowDate(false);
            setDate(currentDate);
            setShowTime(true); // Show time picker next
        }
    };

    const handleTimeChange = (event, selectedTime) => {
        if (selectedTime) {
            const newDate = new Date(date);
            newDate.setHours(selectedTime.getHours(), selectedTime.getMinutes());
            setDate(newDate);
            setShowTime(false);
        }
    };

    const handleBooking = async () => {
        const now = new Date();
        if (date < now) {
            Alert.alert('Invalid Date', 'Please choose a future date and time.');
            return;
        }

        const booking = {
            user: user?.name || 'Guest',
            service: selectedService,
            datetime: date.toISOString(),
            status: 'Upcoming',
        };

        try {
            const existing = await AsyncStorage.getItem('bookings');
            const bookings = existing ? JSON.parse(existing) : [];
            bookings.push(booking);
            await AsyncStorage.setItem('bookings', JSON.stringify(bookings));

            Alert.alert(
                'Booking Confirmed',
                `Hi ${booking.user}, you booked a ${booking.service} on ${date.toLocaleString()} 🎉`
            );
        } catch (err) {
            Alert.alert('Error', 'Failed to save booking.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Book a Service</Text>
            <Text style={styles.greeting}>
                Hello {user?.name || 'Guest'}! Ready to schedule your next appointment?
            </Text>

            <View style={styles.section}>
                <Text style={styles.label}>Select Service:</Text>
                {['Haircut', 'Shave', 'Facial'].map((service) => (
                    <TouchableOpacity
                        key={service}
                        style={[
                            styles.option,
                            selectedService === service && styles.selected,
                        ]}
                        onPress={() => setSelectedService(service)}
                    >
                        <Text
                            style={[
                                styles.optionText,
                                selectedService === service && styles.selectedText,
                            ]}
                        >
                            {service}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Select Date & Time:</Text>
                <Button title="Choose Date" onPress={() => setShowDate(true)} />
                <Text style={styles.dateText}>{date.toLocaleString()}</Text>
            </View>

            {showDate && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="calendar"
                    onChange={handleDateChange}
                />
            )}

            {showTime && (
                <DateTimePicker
                    value={date}
                    mode="time"
                    display="spinner"
                    onChange={handleTimeChange}
                />
            )}

            <TouchableOpacity style={styles.button} onPress={handleBooking}>
                <Text style={styles.buttonText}>Confirm Booking</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
    greeting: { fontSize: 16, marginBottom: 20, textAlign: 'center', color: '#333' },
    section: { marginBottom: 30 },
    label: { fontSize: 18, marginBottom: 10 },
    option: {
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginBottom: 10,
    },
    selected: {
        backgroundColor: '#007bff',
        borderColor: '#007bff',
    },
    optionText: { fontSize: 16 },
    selectedText: { color: '#fff' },
    dateText: { marginTop: 10, fontSize: 16, color: '#333' },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    buttonText: { color: '#fff', fontSize: 16 },
});
