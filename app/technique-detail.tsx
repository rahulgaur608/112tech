import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function TechniqueDetail() {
    const router = useRouter();
    const params = useLocalSearchParams();

    const title = params.title as string || 'Meditation Technique';
    const description = params.description as string || '';
    const duration = params.duration as string || '15-30 min';
    const category = params.category as string || 'Awareness';
    const benefit = params.benefit as string || '';
    const verse = params.verse as string || '';

    let instructions: string[] = [];
    try {
        instructions = JSON.parse(params.instructions as string || '[]');
    } catch {
        instructions = [];
    }

    const getCategoryColors = () => {
        const colors: { [key: string]: string[] } = {
            'Breath': ['#4dabff', '#4dffae'],
            'Awareness': ['#ff6b9d', '#ffd700'],
            'Sound': ['#c44dff', '#4dabff'],
            'Visualization': ['#ff9d6b', '#ff6b9d'],
            'Body': ['#4dffae', '#4dabff'],
            'Perception': ['#ffd700', '#ff6b9d'],
            'Love': ['#ff6b9d', '#c44dff'],
            'Mind': ['#4dabff', '#c44dff'],
        };
        return colors[category] || ['#c44dff', '#ff6b9d'];
    };

    const getCategoryIcon = () => {
        const icons: { [key: string]: string } = {
            'Breath': 'air',
            'Sound': 'music-note',
            'Visualization': 'visibility',
            'Body': 'self-improvement',
            'Perception': 'remove-red-eye',
            'Love': 'favorite',
            'Mind': 'psychology',
            'Awareness': 'lightbulb',
        };
        return icons[category] || 'psychology';
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
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => router.back()}
                        >
                            <LinearGradient
                                colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
                                style={styles.backButtonGradient}
                            >
                                <MaterialIcons name="arrow-back" size={22} color="white" />
                            </LinearGradient>
                        </TouchableOpacity>
                        <View style={styles.headerInfo}>
                            <LinearGradient
                                colors={getCategoryColors()}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.verseTag}
                            >
                                <Text style={styles.verseText}>✦ Verse {verse}</Text>
                            </LinearGradient>
                        </View>
                    </View>

                    {/* Title Section */}
                    <View style={styles.titleSection}>
                        <View style={styles.categoryBadge}>
                            <LinearGradient
                                colors={getCategoryColors()}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.categoryIconBg}
                            >
                                <MaterialIcons name={getCategoryIcon() as any} size={16} color="white" />
                            </LinearGradient>
                            <Text style={[styles.categoryText, { color: getCategoryColors()[0] }]}>{category}</Text>
                        </View>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.description}>{description}</Text>
                        <View style={styles.durationRow}>
                            <MaterialIcons name="schedule" size={16} color="rgba(255,255,255,0.5)" />
                            <Text style={styles.durationText}>{duration}</Text>
                        </View>
                    </View>

                    {/* Instructions */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>How to Practice</Text>
                        <View style={styles.instructionsContainer}>
                            {instructions.map((instruction, index) => (
                                <View key={index} style={styles.instructionItem}>
                                    <LinearGradient
                                        colors={getCategoryColors()}
                                        style={styles.instructionNumber}
                                    >
                                        <Text style={styles.instructionNumberText}>{index + 1}</Text>
                                    </LinearGradient>
                                    <Text style={styles.instructionText}>{instruction}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Benefit */}
                    {benefit && (
                        <View style={styles.benefitSection}>
                            <LinearGradient
                                colors={[`${getCategoryColors()[0]}20`, `${getCategoryColors()[1]}10`]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.benefitGradient}
                            >
                                <View style={styles.benefitIconContainer}>
                                    <LinearGradient
                                        colors={getCategoryColors()}
                                        style={styles.benefitIcon}
                                    >
                                        <MaterialIcons name="auto-awesome" size={20} color="white" />
                                    </LinearGradient>
                                </View>
                                <View style={styles.benefitContent}>
                                    <Text style={[styles.benefitLabel, { color: getCategoryColors()[0] }]}>Result</Text>
                                    <Text style={styles.benefitText}>"{benefit}"</Text>
                                </View>
                            </LinearGradient>
                        </View>
                    )}

                    {/* Tips */}
                    <View style={styles.tipsSection}>
                        <Text style={styles.sectionTitle}>Tips for Success</Text>
                        <View style={styles.tipItem}>
                            <View style={[styles.tipIcon, { backgroundColor: 'rgba(255, 107, 157, 0.15)' }]}>
                                <MaterialIcons name="schedule" size={16} color="#ff6b9d" />
                            </View>
                            <Text style={styles.tipText}>Practice at the same time each day</Text>
                        </View>
                        <View style={styles.tipItem}>
                            <View style={[styles.tipIcon, { backgroundColor: 'rgba(77, 171, 255, 0.15)' }]}>
                                <MaterialIcons name="place" size={16} color="#4dabff" />
                            </View>
                            <Text style={styles.tipText}>Find a quiet, comfortable space</Text>
                        </View>
                        <View style={styles.tipItem}>
                            <View style={[styles.tipIcon, { backgroundColor: 'rgba(196, 77, 255, 0.15)' }]}>
                                <MaterialIcons name="self-improvement" size={16} color="#c44dff" />
                            </View>
                            <Text style={styles.tipText}>Be patient - progress comes with consistency</Text>
                        </View>
                    </View>

                    {/* Bottom Padding */}
                    <View style={{ height: 140 }} />
                </ScrollView>

                {/* Start Button */}
                <View style={styles.bottomContainer}>
                    <TouchableOpacity
                        style={styles.startButton}
                        onPress={() => router.push({
                            pathname: '/session',
                            params: { title, duration, verse }
                        })}
                    >
                        <LinearGradient
                            colors={['#c44dff', '#ff6b9d', '#ff9d6b']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.startButtonGradient}
                        >
                            <MaterialIcons name="play-arrow" size={26} color="white" />
                            <Text style={styles.startButtonText}>Begin Practice</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
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
        paddingVertical: 16,
    },
    backButton: {
        borderRadius: 20,
        overflow: 'hidden',
    },
    backButtonGradient: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    headerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    verseTag: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
    },
    verseText: {
        color: 'white',
        fontSize: 13,
        fontWeight: '700',
    },
    titleSection: {
        paddingHorizontal: 24,
        paddingBottom: 28,
    },
    categoryBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 16,
    },
    categoryIconBg: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryText: {
        fontSize: 14,
        fontWeight: '600',
    },
    title: {
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 14,
        lineHeight: 34,
    },
    description: {
        color: 'rgba(255,255,255,0.65)',
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 16,
    },
    durationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    durationText: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 14,
    },
    section: {
        paddingHorizontal: 24,
        marginBottom: 28,
    },
    sectionTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 18,
    },
    instructionsContainer: {
        gap: 14,
    },
    instructionItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 14,
    },
    instructionNumber: {
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    instructionNumberText: {
        color: 'white',
        fontSize: 13,
        fontWeight: '700',
    },
    instructionText: {
        flex: 1,
        color: 'rgba(255,255,255,0.75)',
        fontSize: 15,
        lineHeight: 22,
    },
    benefitSection: {
        marginHorizontal: 24,
        marginBottom: 28,
        borderRadius: 20,
        overflow: 'hidden',
    },
    benefitGradient: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 18,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        borderRadius: 20,
    },
    benefitIconContainer: {
        marginRight: 14,
    },
    benefitIcon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    benefitContent: {
        flex: 1,
    },
    benefitLabel: {
        fontSize: 12,
        fontWeight: '700',
        marginBottom: 6,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    benefitText: {
        color: 'white',
        fontSize: 16,
        fontStyle: 'italic',
        lineHeight: 24,
    },
    tipsSection: {
        paddingHorizontal: 24,
    },
    tipItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        marginBottom: 14,
    },
    tipIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tipText: {
        flex: 1,
        color: 'rgba(255,255,255,0.6)',
        fontSize: 14,
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 24,
        paddingVertical: 20,
        paddingBottom: 36,
    },
    startButton: {
        borderRadius: 30,
        overflow: 'hidden',
        shadowColor: '#c44dff',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 10,
    },
    startButtonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 18,
        gap: 10,
    },
    startButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
