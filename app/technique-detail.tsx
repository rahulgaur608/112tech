import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import ScreenBackground from '../components/ScreenBackground';

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

    const getCategoryColor = () => {
        const colors: { [key: string]: string } = {
            'Breath': '#A3B18A',
            'Awareness': '#F4A261',
            'Sound': '#E9C46A',
            'Visualization': '#E76F51',
            'Body': '#2A9D8F',
            'Perception': '#F4A261',
            'Love': '#E76F51',
            'Mind': '#264653',
        };
        return colors[category] || '#A3B18A';
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
        <ScreenBackground style={styles.container}>
            <SafeAreaView style={styles.safeArea} edges={['top']}>
                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => router.back()}
                        >
                            <MaterialIcons name="arrow-back-ios" size={20} color="#2C3632" />
                        </TouchableOpacity>
                        <View style={[styles.verseTag, { backgroundColor: getCategoryColor() }]}>
                            <Text style={styles.verseText}>Verse {verse}</Text>
                        </View>
                    </View>

                    {/* Title Section */}
                    <View style={styles.titleSection}>
                        <View style={styles.categoryBadge}>
                            <View style={[styles.categoryIconBg, { backgroundColor: `${getCategoryColor()}20` }]}>
                                <MaterialIcons name={getCategoryIcon() as any} size={16} color={getCategoryColor()} />
                            </View>
                            <Text style={[styles.categoryText, { color: getCategoryColor() }]}>{category}</Text>
                        </View>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.description}>{description}</Text>
                        <View style={styles.durationRow}>
                            <MaterialIcons name="schedule" size={16} color="#A3B18A" />
                            <Text style={styles.durationText}>{duration}</Text>
                        </View>
                    </View>

                    {/* Instructions */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>How to Practice</Text>
                        <View style={styles.instructionsContainer}>
                            {instructions.map((instruction, index) => (
                                <View key={index} style={styles.instructionItem}>
                                    <View style={[styles.instructionNumber, { backgroundColor: `${getCategoryColor()}20` }]}>
                                        <Text style={[styles.instructionNumberText, { color: getCategoryColor() }]}>{index + 1}</Text>
                                    </View>
                                    <Text style={styles.instructionText}>{instruction}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Benefit */}
                    {benefit && (
                        <View style={styles.benefitSection}>
                            <View style={[styles.benefitCard, { borderColor: `${getCategoryColor()}30` }]}>
                                <View style={styles.benefitHeader}>
                                    <MaterialIcons name="auto-awesome" size={20} color={getCategoryColor()} />
                                    <Text style={[styles.benefitLabel, { color: getCategoryColor() }]}>Benefits</Text>
                                </View>
                                <Text style={styles.benefitText}>"{benefit}"</Text>
                            </View>
                        </View>
                    )}

                    {/* Tips */}
                    <View style={styles.tipsSection}>
                        <Text style={styles.sectionTitle}>Tips for Success</Text>
                        <View style={styles.tipItem}>
                            <View style={styles.tipIcon}>
                                <MaterialIcons name="schedule" size={20} color="#A3B18A" />
                            </View>
                            <Text style={styles.tipText}>Practice at the same time each day</Text>
                        </View>
                        <View style={styles.tipItem}>
                            <View style={styles.tipIcon}>
                                <MaterialIcons name="place" size={20} color="#E9C46A" />
                            </View>
                            <Text style={styles.tipText}>Find a quiet, comfortable space</Text>
                        </View>
                        <View style={styles.tipItem}>
                            <View style={styles.tipIcon}>
                                <MaterialIcons name="self-improvement" size={20} color="#F4A261" />
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
                        activeOpacity={0.9}
                    >
                        <LinearGradient
                            colors={['#A3B18A', '#8F9E75']}
                            style={styles.startButtonGradient}
                        >
                            <MaterialIcons name="play-arrow" size={26} color="white" />
                            <Text style={styles.startButtonText}>Begin Practice</Text>
                        </LinearGradient>
                    </TouchableOpacity>
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
        padding: 8,
        marginLeft: -8,
        borderRadius: 20,
    },
    verseTag: {
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
    },
    verseText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '700',
    },
    titleSection: {
        paddingHorizontal: 24,
        paddingBottom: 28,
        marginTop: 10,
    },
    categoryBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16,
    },
    categoryIconBg: {
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryText: {
        fontSize: 13,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    title: {
        color: '#2C3632',
        fontSize: 28,
        fontWeight: 'bold',
        fontFamily: 'serif',
        marginBottom: 12,
        lineHeight: 36,
    },
    description: {
        color: '#5C6B5E',
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 16,
    },
    durationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    durationText: {
        color: '#5C6B5E',
        fontSize: 14,
        fontWeight: '500',
    },
    section: {
        paddingHorizontal: 24,
        marginBottom: 28,
    },
    sectionTitle: {
        color: '#2C3632',
        fontSize: 18,
        fontWeight: '700',
        fontFamily: 'serif',
        marginBottom: 16,
    },
    instructionsContainer: {
        gap: 16,
        backgroundColor: 'rgba(255,255,255,0.6)',
        padding: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.03)',
    },
    instructionItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 14,
    },
    instructionNumber: {
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 2,
    },
    instructionNumberText: {
        fontSize: 12,
        fontWeight: '700',
    },
    instructionText: {
        flex: 1,
        color: '#2C3632',
        fontSize: 15,
        lineHeight: 24,
    },
    benefitSection: {
        paddingHorizontal: 24,
        marginBottom: 28,
    },
    benefitCard: {
        backgroundColor: '#FFF9F0',
        padding: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderStyle: 'dashed',
    },
    benefitHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 8,
    },
    benefitLabel: {
        fontSize: 12,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    benefitText: {
        color: '#2C3632',
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
        marginBottom: 16,
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 1,
    },
    tipIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#FFF9F0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tipText: {
        flex: 1,
        color: '#5C6B5E',
        fontSize: 14,
        fontWeight: '500',
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 24,
        paddingVertical: 20,
        paddingBottom: 36,
        backgroundColor: 'rgba(255,255,255,0.9)',
    },
    startButton: {
        borderRadius: 30,
        overflow: 'hidden',
        shadowColor: '#A3B18A',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 6,
    },
    startButtonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 18,
        gap: 10,
    },
    startButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
