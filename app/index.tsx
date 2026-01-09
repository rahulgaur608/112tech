import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function Onboarding() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" />
            <View style={styles.container}>
                <View style={styles.iconContainer}>
                    <MaterialIcons name="spa" size={48} color="#13ecb6" />
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.title}>Welcome to Ancient Awareness</Text>
                    <Text style={styles.subtitle}>Discover timeless meditation techniques from the Vigyan Bhairava Tantra.</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={() => router.push('/goal-selection')}
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
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#10221d',
    },
    container: {
        flex: 1,
        backgroundColor: '#10221d',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 60,
        paddingBottom: 40,
        paddingHorizontal: 24,
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(19, 236, 182, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(19, 236, 182, 0.3)',
    },
    textContainer: {
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        color: '#ffffff',
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
    },
    subtitle: {
        color: '#9ca3af',
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
    },
    buttonContainer: {
        width: '100%',
    },
    primaryButton: {
        backgroundColor: '#13ecb6',
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 16,
    },
    primaryButtonText: {
        color: '#10221d',
        fontSize: 18,
        fontWeight: 'bold',
    },
    secondaryButton: {
        paddingVertical: 12,
        alignItems: 'center',
    },
    secondaryButtonText: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 14,
    },
});
