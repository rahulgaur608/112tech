import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useState, useEffect, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import ScreenBackground from '../components/ScreenBackground';

const { width, height } = Dimensions.get('window');

export default function Session() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const title = params.title as string || 'Observe the pause between breaths';

    const [timeLeft, setTimeLeft] = useState(600); // 10 mins
    const breathAnim = useRef(new Animated.Value(1)).current;
    const pulseAnim = useRef(new Animated.Value(0.3)).current;
    const ring1Anim = useRef(new Animated.Value(0)).current;
    const ring2Anim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        // Breathing animation
        Animated.loop(
            Animated.sequence([
                Animated.timing(breathAnim, {
                    toValue: 1.2,
                    duration: 4000,
                    useNativeDriver: true,
                }),
                Animated.timing(breathAnim, {
                    toValue: 1,
                    duration: 4000,
                    useNativeDriver: true,
                }),
            ])
        ).start();

        // Pulse glow animation
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 0.6,
                    duration: 4000,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 0.3,
                    duration: 4000,
                    useNativeDriver: true,
                }),
            ])
        ).start();

        // Ring rotations
        Animated.loop(
            Animated.timing(ring1Anim, {
                toValue: 1,
                duration: 30000,
                useNativeDriver: true,
            })
        ).start();

        Animated.loop(
            Animated.timing(ring2Anim, {
                toValue: 1,
                duration: 40000,
                useNativeDriver: true,
            })
        ).start();

        return () => clearInterval(timer);
    }, []);

    const spin1 = ring1Anim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const spin2 = ring2Anim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '-360deg'],
    });

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return [m.toString().padStart(2, '0'), s.toString().padStart(2, '0')];
    };

    const [m, s] = formatTime(timeLeft);

    return (
        <ScreenBackground style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>DEEP AWARENESS</Text>
            </View>

            {/* Timer Section */}
            <View style={styles.timerSection}>
                <View style={styles.timerWrapper}>
                    {/* Animated Rings */}
                    <Animated.View
                        style={[
                            styles.ring,
                            styles.ring1,
                            { transform: [{ rotate: spin1 }, { scale: breathAnim }], opacity: 0.8 }
                        ]}
                    />
                    <Animated.View
                        style={[
                            styles.ring,
                            styles.ring2,
                            { transform: [{ rotate: spin2 }] }
                        ]}
                    />
                    <Animated.View
                        style={[
                            styles.ring,
                            styles.ring3,
                            { transform: [{ scale: breathAnim }], opacity: pulseAnim }
                        ]}
                    />

                    {/* Timer Display */}
                    <View style={styles.timerRow}>
                        <View style={styles.timeUnit}>
                            <View style={styles.timeBox}>
                                <Text style={styles.timeText}>{m}</Text>
                            </View>
                            <Text style={styles.timeLabel}>MIN</Text>
                        </View>
                        <Text style={styles.colon}>:</Text>
                        <View style={styles.timeUnit}>
                            <View style={styles.timeBox}>
                                <Text style={styles.timeText}>{s}</Text>
                            </View>
                            <Text style={styles.timeLabel}>SEC</Text>
                        </View>
                    </View>
                </View>

                {/* Instruction */}
                <View style={styles.instruction}>
                    <Text style={styles.instructionTitle}>{title}</Text>
                    <View style={styles.instructionBadge}>
                        <Text style={styles.instructionSubtitle}>VIGYAN BHAIRAVA TANTRA</Text>
                    </View>
                </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <TouchableOpacity
                    onPress={() => router.replace('/complete')}
                    style={styles.endButton}
                >
                    <View style={styles.endButtonCircle}>
                        <MaterialIcons name="close" size={28} color="#E76F51" />
                    </View>
                    <Text style={styles.endButtonText}>END SESSION</Text>
                </TouchableOpacity>
            </View>
        </ScreenBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 60,
        paddingBottom: 50,
    },
    header: {
        opacity: 0.8,
    },
    headerText: {
        color: '#A3B18A',
        fontSize: 13,
        letterSpacing: 4,
        fontWeight: '600',
    },
    timerSection: {
        alignItems: 'center',
    },
    timerWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 320,
        height: 320,
    },
    ring: {
        position: 'absolute',
        borderRadius: 999,
        borderWidth: 1,
    },
    ring1: {
        width: 320,
        height: 320,
        borderColor: 'rgba(163, 177, 138, 0.2)', // Sage
        borderWidth: 2,
    },
    ring2: {
        width: 260,
        height: 260,
        borderColor: 'rgba(244, 162, 97, 0.15)', // Peach
    },
    ring3: {
        width: 200,
        height: 200,
        borderColor: 'rgba(163, 177, 138, 0.3)',
        backgroundColor: 'rgba(163, 177, 138, 0.05)',
    },
    timerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 10,
    },
    timeUnit: {
        alignItems: 'center',
    },
    timeBox: {
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    timeText: {
        color: '#2C3632',
        fontSize: 56,
        fontWeight: '300',
        fontFamily: 'serif',
    },
    timeLabel: {
        color: '#A3B18A',
        fontSize: 11,
        marginTop: 0,
        letterSpacing: 2,
        fontWeight: 'bold',
    },
    colon: {
        fontSize: 40,
        color: '#A3B18A',
        paddingBottom: 20,
        marginHorizontal: 16,
        fontWeight: '200',
    },
    instruction: {
        alignItems: 'center',
        paddingHorizontal: 24,
        marginTop: 50,
    },
    instructionTitle: {
        color: '#2C3632',
        fontSize: 22,
        fontWeight: '400',
        letterSpacing: 0.5,
        marginBottom: 16,
        textAlign: 'center',
        lineHeight: 32,
        fontFamily: 'serif',
    },
    instructionBadge: {
        backgroundColor: '#FFF9F0',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E9C46A',
    },
    instructionSubtitle: {
        color: '#F4A261',
        fontSize: 11,
        letterSpacing: 3,
        fontWeight: 'bold',
    },
    footer: {
        alignItems: 'center',
    },
    endButton: {
        alignItems: 'center',
    },
    endButtonCircle: {
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 35,
        backgroundColor: '#FFF9F0',
        borderWidth: 1,
        borderColor: '#E76F51',
        marginBottom: 12,
        shadowColor: '#E76F51',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
    },
    endButtonText: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#E76F51',
        letterSpacing: 2,
    },
});
