import React, { useState } from 'react';
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Platform,
    StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function BookingScreen() {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [selectedService, setSelectedService] = useState('Haircut');

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const handleBooking = () => {
        alert(
            `You booked a ${selectedService} on ${date.toDateString()} 🎉`
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Book a Service</Text>

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
                <Text style={styles.label}>Select Date:</Text>
                <Button title="Choose Date" onPress={() => setShow(true)} />
                <Text style={styles.dateText}>{date.toDateString()}</Text>
                {show && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="calendar"
                        onChange={onChange}
                    />
                )}
            </View>

            <TouchableOpacity style={styles.button} onPress={handleBooking}>
                <Text style={styles.buttonText}>Confirm Booking</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
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
    },
    buttonText: { color: '#fff', fontSize: 16 },
});
