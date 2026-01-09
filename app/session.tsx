import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useState, useEffect, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

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
                    toValue: 1.3,
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
                    toValue: 0.8,
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
                duration: 20000,
                useNativeDriver: true,
            })
        ).start();

        Animated.loop(
            Animated.timing(ring2Anim, {
                toValue: 1,
                duration: 30000,
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
        <View style={styles.container}>
            <LinearGradient
                colors={['#0a0f1a', '#1a1035', '#0d1f2d']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFill}
            />

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
                            { transform: [{ rotate: spin1 }, { scale: breathAnim }], opacity: pulseAnim }
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
                            <LinearGradient
                                colors={['rgba(196, 77, 255, 0.15)', 'rgba(77, 171, 255, 0.1)']}
                                style={styles.timeBox}
                            >
                                <Text style={styles.timeText}>{m}</Text>
                            </LinearGradient>
                            <Text style={styles.timeLabel}>MIN</Text>
                        </View>
                        <Text style={styles.colon}>:</Text>
                        <View style={styles.timeUnit}>
                            <LinearGradient
                                colors={['rgba(255, 107, 157, 0.15)', 'rgba(196, 77, 255, 0.1)']}
                                style={styles.timeBox}
                            >
                                <Text style={styles.timeText}>{s}</Text>
                            </LinearGradient>
                            <Text style={styles.timeLabel}>SEC</Text>
                        </View>
                    </View>
                </View>

                {/* Instruction */}
                <View style={styles.instruction}>
                    <Text style={styles.instructionTitle}>{title}</Text>
                    <LinearGradient
                        colors={['#c44dff', '#ff6b9d']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.instructionBadge}
                    >
                        <Text style={styles.instructionSubtitle}>VIGYAN BHAIRAVA TANTRA</Text>
                    </LinearGradient>
                </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <TouchableOpacity
                    onPress={() => router.replace('/complete')}
                    style={styles.endButton}
                >
                    <LinearGradient
                        colors={['rgba(248, 113, 113, 0.2)', 'rgba(248, 113, 113, 0.1)']}
                        style={styles.endButtonGradient}
                    >
                        <MaterialIcons name="close" size={28} color="#f87171" />
                    </LinearGradient>
                    <Text style={styles.endButtonText}>END SESSION</Text>
                </TouchableOpacity>
            </View>
        </View>
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
        opacity: 0.5,
    },
    headerText: {
        color: 'white',
        fontSize: 13,
        letterSpacing: 5,
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
        borderColor: 'rgba(196, 77, 255, 0.25)',
    },
    ring2: {
        width: 260,
        height: 260,
        borderColor: 'rgba(255, 107, 157, 0.2)',
    },
    ring3: {
        width: 200,
        height: 200,
        borderColor: 'rgba(77, 171, 255, 0.25)',
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
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    timeText: {
        color: 'white',
        fontSize: 48,
        fontWeight: '300',
    },
    timeLabel: {
        color: '#c44dff',
        fontSize: 11,
        marginTop: 12,
        letterSpacing: 3,
        fontWeight: 'bold',
    },
    colon: {
        fontSize: 40,
        color: 'rgba(255, 107, 157, 0.5)',
        paddingBottom: 40,
        marginHorizontal: 16,
        fontWeight: '200',
    },
    instruction: {
        alignItems: 'center',
        paddingHorizontal: 24,
        marginTop: 50,
    },
    instructionTitle: {
        color: 'white',
        fontSize: 22,
        fontWeight: '400',
        letterSpacing: 0.5,
        marginBottom: 16,
        textAlign: 'center',
        lineHeight: 30,
    },
    instructionBadge: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    instructionSubtitle: {
        color: 'white',
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
    endButtonGradient: {
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 35,
        borderWidth: 1,
        borderColor: 'rgba(248, 113, 113, 0.3)',
        marginBottom: 12,
    },
    endButtonText: {
        fontSize: 11,
        fontWeight: 'bold',
        color: 'rgba(248, 113, 113, 0.7)',
        letterSpacing: 2,
    },
});
