import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Animated, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useRef, useMemo } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { techniques, Technique } from '../../data/techniques';

const { width } = Dimensions.get('window');

export default function Home() {
    const router = useRouter();
    const breathAnim = useRef(new Animated.Value(1)).current;
    const pulseAnim = useRef(new Animated.Value(0.3)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;

    // Get a consistent "daily" technique based on date
    const dailyTechnique = useMemo(() => {
        const today = new Date();
        const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
        return techniques[dayOfYear % techniques.length];
    }, []);

    useEffect(() => {
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

        // Pulse animation for glow
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 0.8,
                    duration: 2000,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 0.3,
                    duration: 2000,
                    useNativeDriver: true,
                }),
            ])
        ).start();

        // Slow rotation
        Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 30000,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    const spin = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const handleTechniquePress = (technique: Technique) => {
        router.push({
            pathname: '/technique-detail',
            params: {
                id: technique.id,
                title: technique.title,
                description: technique.description,
                duration: technique.duration,
                category: technique.category,
                instructions: JSON.stringify(technique.instructions),
                benefit: technique.benefit,
                verse: technique.verse,
            }
        });
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 17) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#0a0f1a', '#1a1035', '#0d1f2d']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFill}
            />

            <SafeAreaView style={styles.safeArea} edges={['top']}>
                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    {/* Header */}
                    <View style={styles.header}>
                        <View>
                            <Text style={styles.greeting}>{getGreeting()}</Text>
                            <Text style={styles.welcomeText}>Ancient Awareness</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.profileButton}
                            onPress={() => router.push('/(tabs)/profile')}
                        >
                            <LinearGradient
                                colors={['#ff6b9d', '#c44dff']}
                                style={styles.profileGradient}
                            >
                                <MaterialIcons name="person" size={22} color="white" />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                    {/* Hero Meditation Card */}
                    <View style={styles.heroCard}>
                        <LinearGradient
                            colors={['rgba(196, 77, 255, 0.15)', 'rgba(255, 107, 157, 0.1)', 'rgba(77, 171, 255, 0.1)']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.heroGradient}
                        >
                            {/* Animated background rings */}
                            <Animated.View style={[styles.ring, styles.ring1, { transform: [{ rotate: spin }, { scale: breathAnim }], opacity: pulseAnim }]} />
                            <Animated.View style={[styles.ring, styles.ring2, { transform: [{ rotate: spin }] }]} />
                            <Animated.View style={[styles.ring, styles.ring3, { transform: [{ scale: breathAnim }] }]} />

                            <View style={styles.heroContent}>
                                <Text style={styles.heroTitle}>Begin Your Journey</Text>
                                <Text style={styles.heroSubtitle}>112 Meditation Techniques</Text>
                                <Text style={styles.heroSource}>Vigyan Bhairava Tantra</Text>

                                <TouchableOpacity
                                    style={styles.startButton}
                                    onPress={() => handleTechniquePress(dailyTechnique)}
                                >
                                    <LinearGradient
                                        colors={['#c44dff', '#ff6b9d', '#ff9d6b']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        style={styles.startButtonGradient}
                                    >
                                        <MaterialIcons name="play-arrow" size={28} color="white" />
                                        <Text style={styles.startButtonText}>Start Practice</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </LinearGradient>
                    </View>

                    {/* Today's Focus */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Today's Focus</Text>
                            <View style={styles.sparkle}>
                                <MaterialIcons name="auto-awesome" size={18} color="#ffd700" />
                            </View>
                        </View>
                        <TouchableOpacity
                            style={styles.focusCard}
                            onPress={() => handleTechniquePress(dailyTechnique)}
                        >
                            <LinearGradient
                                colors={['rgba(77, 171, 255, 0.15)', 'rgba(77, 255, 174, 0.1)']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.focusGradient}
                            >
                                <View style={styles.focusHeader}>
                                    <View style={styles.verseTag}>
                                        <Text style={styles.verseText}>✦ Verse {dailyTechnique.verse}</Text>
                                    </View>
                                    <Text style={styles.durationText}>{dailyTechnique.duration}</Text>
                                </View>
                                <Text style={styles.focusTitle}>{dailyTechnique.title}</Text>
                                <Text style={styles.focusDescription} numberOfLines={2}>
                                    {dailyTechnique.description}
                                </Text>
                                <View style={styles.focusFooter}>
                                    <View style={styles.categoryTag}>
                                        <MaterialIcons
                                            name={
                                                dailyTechnique.category === 'Breath' ? 'air' :
                                                    dailyTechnique.category === 'Sound' ? 'music-note' :
                                                        dailyTechnique.category === 'Visualization' ? 'visibility' :
                                                            'psychology'
                                            }
                                            size={14}
                                            color="#4dabff"
                                        />
                                        <Text style={styles.categoryTagText}>{dailyTechnique.category}</Text>
                                    </View>
                                    <View style={styles.arrowCircle}>
                                        <MaterialIcons name="arrow-forward" size={16} color="white" />
                                    </View>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                    {/* Stats */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Your Progress</Text>
                        <View style={styles.statsRow}>
                            <View style={styles.statCard}>
                                <LinearGradient
                                    colors={['rgba(255, 107, 157, 0.2)', 'rgba(255, 107, 157, 0.05)']}
                                    style={styles.statGradient}
                                >
                                    <Text style={styles.statValue}>🔥 3</Text>
                                    <Text style={styles.statLabel}>Day Streak</Text>
                                </LinearGradient>
                            </View>
                            <View style={styles.statCard}>
                                <LinearGradient
                                    colors={['rgba(77, 171, 255, 0.2)', 'rgba(77, 171, 255, 0.05)']}
                                    style={styles.statGradient}
                                >
                                    <Text style={styles.statValue}>⏱ 45</Text>
                                    <Text style={styles.statLabel}>Minutes</Text>
                                </LinearGradient>
                            </View>
                            <View style={styles.statCard}>
                                <LinearGradient
                                    colors={['rgba(196, 77, 255, 0.2)', 'rgba(196, 77, 255, 0.05)']}
                                    style={styles.statGradient}
                                >
                                    <Text style={styles.statValue}>✨ 7</Text>
                                    <Text style={styles.statLabel}>Practiced</Text>
                                </LinearGradient>
                            </View>
                        </View>
                    </View>

                    {/* Explore */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Explore Techniques</Text>
                            <TouchableOpacity onPress={() => router.push('/(tabs)/library')}>
                                <Text style={styles.seeAllText}>See All →</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.horizontalScroll}
                        >
                            {techniques.slice(0, 6).map((technique, index) => (
                                <TouchableOpacity
                                    key={technique.id}
                                    style={styles.miniCard}
                                    onPress={() => handleTechniquePress(technique)}
                                >
                                    <LinearGradient
                                        colors={[
                                            index % 3 === 0 ? 'rgba(255, 107, 157, 0.2)' :
                                                index % 3 === 1 ? 'rgba(77, 171, 255, 0.2)' :
                                                    'rgba(196, 77, 255, 0.2)',
                                            'rgba(0, 0, 0, 0.1)'
                                        ]}
                                        style={styles.miniGradient}
                                    >
                                        <View style={[styles.miniIcon, {
                                            backgroundColor: index % 3 === 0 ? 'rgba(255, 107, 157, 0.3)' :
                                                index % 3 === 1 ? 'rgba(77, 171, 255, 0.3)' :
                                                    'rgba(196, 77, 255, 0.3)'
                                        }]}>
                                            <MaterialIcons
                                                name={
                                                    technique.category === 'Breath' ? 'air' :
                                                        technique.category === 'Sound' ? 'music-note' :
                                                            technique.category === 'Visualization' ? 'visibility' :
                                                                technique.category === 'Body' ? 'self-improvement' :
                                                                    technique.category === 'Love' ? 'favorite' :
                                                                        'psychology'
                                                }
                                                size={20}
                                                color="white"
                                            />
                                        </View>
                                        <Text style={styles.miniTitle} numberOfLines={2}>{technique.title}</Text>
                                        <Text style={styles.miniDuration}>{technique.duration}</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    {/* Bottom Padding */}
                    <View style={{ height: 120 }} />
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 24,
    },
    greeting: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 14,
        marginBottom: 2,
    },
    welcomeText: {
        color: 'white',
        fontSize: 26,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    profileButton: {
        borderRadius: 22,
        overflow: 'hidden',
    },
    profileGradient: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroCard: {
        marginHorizontal: 24,
        borderRadius: 24,
        overflow: 'hidden',
        marginBottom: 28,
    },
    heroGradient: {
        padding: 28,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 24,
        position: 'relative',
        overflow: 'hidden',
    },
    ring: {
        position: 'absolute',
        borderRadius: 999,
        borderWidth: 1,
    },
    ring1: {
        width: 300,
        height: 300,
        borderColor: 'rgba(196, 77, 255, 0.2)',
    },
    ring2: {
        width: 220,
        height: 220,
        borderColor: 'rgba(255, 107, 157, 0.15)',
    },
    ring3: {
        width: 150,
        height: 150,
        borderColor: 'rgba(77, 171, 255, 0.2)',
    },
    heroContent: {
        alignItems: 'center',
        zIndex: 10,
    },
    heroTitle: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        letterSpacing: 0.5,
    },
    heroSubtitle: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 16,
        marginBottom: 4,
    },
    heroSource: {
        color: '#c44dff',
        fontSize: 12,
        fontWeight: '600',
        letterSpacing: 2,
        textTransform: 'uppercase',
        marginBottom: 24,
    },
    startButton: {
        borderRadius: 30,
        overflow: 'hidden',
        shadowColor: '#c44dff',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
        elevation: 8,
    },
    startButtonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 28,
        gap: 8,
    },
    startButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    section: {
        marginBottom: 28,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        marginBottom: 16,
    },
    sectionTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        paddingHorizontal: 24,
        marginBottom: 16,
    },
    sparkle: {
        marginLeft: 8,
    },
    seeAllText: {
        color: '#ff6b9d',
        fontSize: 14,
        fontWeight: '600',
    },
    focusCard: {
        marginHorizontal: 24,
        borderRadius: 20,
        overflow: 'hidden',
    },
    focusGradient: {
        padding: 20,
        borderWidth: 1,
        borderColor: 'rgba(77, 171, 255, 0.2)',
        borderRadius: 20,
    },
    focusHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    verseTag: {
        backgroundColor: 'rgba(77, 255, 174, 0.15)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    verseText: {
        color: '#4dffae',
        fontSize: 12,
        fontWeight: '600',
    },
    durationText: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 13,
    },
    focusTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 8,
    },
    focusDescription: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 16,
    },
    focusFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    categoryTag: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    categoryTagText: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 13,
    },
    arrowCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(77, 171, 255, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    statsRow: {
        flexDirection: 'row',
        paddingHorizontal: 24,
        gap: 12,
    },
    statCard: {
        flex: 1,
        borderRadius: 16,
        overflow: 'hidden',
    },
    statGradient: {
        padding: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.08)',
        borderRadius: 16,
    },
    statValue: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    statLabel: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 11,
    },
    horizontalScroll: {
        paddingHorizontal: 24,
    },
    miniCard: {
        width: 130,
        marginRight: 12,
        borderRadius: 16,
        overflow: 'hidden',
    },
    miniGradient: {
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.08)',
        borderRadius: 16,
        height: 140,
    },
    miniIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    miniTitle: {
        color: 'white',
        fontSize: 13,
        fontWeight: '600',
        marginBottom: 6,
        lineHeight: 18,
    },
    miniDuration: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 11,
    },
});
