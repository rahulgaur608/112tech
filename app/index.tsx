import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import ScreenBackground from '../components/ScreenBackground';

export default function Onboarding() {
    const router = useRouter();

    return (
        <ScreenBackground style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <StatusBar style="dark" />
                <View style={styles.content}>
                    <View style={styles.iconContainer}>
                        <MaterialIcons name="spa" size={56} color="#A3B18A" />
                    </View>

                    <View style={styles.textContainer}>
                        <Text style={styles.title}>Welcome to Ancient Awareness</Text>
                        <Text style={styles.subtitle}>Discover timeless meditation techniques from the Vigyan Bhairava Tantra.</Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.primaryButton}
                            onPress={() => router.push('/name-selection')}
                        >
                            <Text style={styles.primaryButtonText}>Get Started</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.secondaryButton}
                            onPress={() => router.push('/(tabs)/home')}
                        >
                            <Text style={styles.secondaryButtonText}>Already have an account? Log in</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </ScreenBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 80,
        paddingBottom: 50,
        paddingHorizontal: 24,
    },
    iconContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#FFF9F0',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#A3B18A',
        shadowColor: '#A3B18A',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
    textContainer: {
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        color: '#2C3632',
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
        fontFamily: 'serif',
    },
    subtitle: {
        color: '#5C6B5E',
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
    },
    buttonContainer: {
        width: '100%',
        gap: 16,
    },
    primaryButton: {
        backgroundColor: '#A3B18A',
        paddingVertical: 18,
        borderRadius: 30,
        alignItems: 'center',
        shadowColor: '#A3B18A',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    primaryButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    secondaryButton: {
        paddingVertical: 12,
        alignItems: 'center',
    },
    secondaryButtonText: {
        color: '#5C6B5E',
        fontSize: 15,
        fontWeight: '600',
    },
});
