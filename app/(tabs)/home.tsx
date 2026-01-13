import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { techniques as staticTechniques, Technique } from '../../data/techniques';
import { useTechniques } from '../../context/TechniqueContext';
import ScreenBackground from '../../components/ScreenBackground';

const { width } = Dimensions.get('window');

export default function Home() {
    const router = useRouter();
    const { techniques } = useTechniques();
    const activeTechniques = techniques.length > 0 ? techniques : staticTechniques;

    const categories = [
        { id: 'yoga', name: 'Yoga', icon: 'self-improvement', color: '#D4E09B' },
        { id: 'meditation', name: 'Meditation', icon: 'spa', color: '#F6EAC2' },
        { id: 'mindful', name: 'Mindful', icon: 'psychology', color: '#A3B18A' },
        { id: 'profile', name: 'Profile', icon: 'person', color: '#F4A261' },
    ];

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

    return (
        <ScreenBackground style={styles.container}>
            <SafeAreaView style={styles.safeArea} edges={['top']}>
                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 }}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <View style={styles.avatarContainer}>
                                <Image
                                    source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuD859qOh8yzZ_qAGq8UaHgpO6VVgBz5dm1CkIBLCcQMs_9f7shnWd-TDRogJQxMHE002kNDyXyxdntiKcwQQztvNNte9vp6cldTQ_E_dxpoiJ_g414-OASxx5B933IDnN-P6PSHIzmZX73IbyEtDk8EVo0bFFtLe7bOPmvziZh-mM5QhCC7N8Pr35_QjT2Pw1bUZDbGumS4OxBNcZkCLy6HiaxWjQ4nvYBo8FI4v43jIqehV-sennIPbjdslJJr1kPocux6J9Qv9RA" }}
                                    style={styles.avatar}
                                />
                            </View>
                            <Text style={styles.welcomeText}>Hi, Annie</Text>
                        </View>
                        <View style={styles.headerRight}>
                            <TouchableOpacity style={styles.iconButton}>
                                <MaterialIcons name="search" size={24} color="#2C3632" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconButton}>
                                <MaterialIcons name="notifications-none" size={24} color="#2C3632" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Hero Illustration Placeholder */}
                    <View style={styles.heroContainer}>
                        <LinearGradient
                            colors={['#FFF9F0', '#FFFFFF']}
                            style={styles.heroGradient}
                        >
                            {/* Represents the yoga illustration from screenshot */}
                            <View style={styles.heroContent}>
                                <MaterialIcons name="self-improvement" size={80} color="#A3B18A" style={{ opacity: 0.8 }} />
                            </View>
                        </LinearGradient>
                    </View>

                    {/* Categories */}
                    <View style={styles.categoriesContainer}>
                        {categories.map((cat) => (
                            <TouchableOpacity key={cat.id} style={styles.categoryItem} onPress={() => router.push('/(tabs)/library')}>
                                <View style={[styles.categoryCircle, { backgroundColor: cat.color }]}>
                                    <MaterialIcons name={cat.icon as any} size={24} color="#2C3632" />
                                </View>
                                <Text style={styles.categoryText}>{cat.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Today's Sessions */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <MaterialIcons name="calendar-today" size={20} color="#5C6B5E" />
                            <Text style={styles.sectionTitle}>Today's Sessions</Text>
                        </View>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
                            {activeTechniques.slice(0, 3).map((technique, index) => (
                                <TouchableOpacity
                                    key={technique.id}
                                    style={[styles.sessionCard, { backgroundColor: index % 2 === 0 ? '#F6EAC2' : '#F4A261' }]}
                                    onPress={() => handleTechniquePress(technique)}
                                    activeOpacity={0.9}
                                >
                                    <View style={styles.sessionCardContent}>
                                        <Text style={styles.sessionTitle} numberOfLines={2}>{technique.title}</Text>
                                        <View style={styles.sessionMeta}>
                                            <Text style={styles.sessionTime}>{technique.duration}</Text>
                                            <View style={styles.playButton}>
                                                <MaterialIcons name="play-arrow" size={20} color="#FFF" />
                                            </View>
                                        </View>
                                    </View>
                                    {/* Decoration */}
                                    <View style={styles.cardDecoration} />
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    {/* Premium Session */}
                    <View style={styles.section}>
                        <View style={styles.premiumHeader}>
                            <MaterialIcons name="diamond" size={20} color="#5C6B5E" />
                            <Text style={styles.sectionTitle}>Organic Workshop</Text>
                        </View>
                        <TouchableOpacity style={styles.premiumCard} activeOpacity={0.9}>
                            <LinearGradient
                                colors={['#D4E09B', '#A3B18A']}
                                style={styles.premiumGradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                <View style={styles.premiumContent}>
                                    <View style={styles.tagContainer}>
                                        <Text style={styles.tagText}>Intensive</Text>
                                    </View>
                                    <Text style={styles.premiumTitle}>10-DAY YOGA WORKSHOP</Text>
                                    <TouchableOpacity style={styles.knowMoreButton}>
                                        <Text style={styles.knowMoreText}>Know more</Text>
                                        <MaterialIcons name="chevron-right" size={16} color="#5C6B5E" />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.premiumImagePlaceholder}>
                                    <MaterialIcons name="spa" size={80} color="rgba(255,255,255,0.4)" />
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
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
        paddingTop: 16,
        marginBottom: 10,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    avatarContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#fff',
    },
    avatar: {
        width: '100%',
        height: '100%',
    },
    welcomeText: {
        fontSize: 20,
        color: '#2C3632',
        fontFamily: 'serif', // System serif
        fontWeight: '600',
    },
    headerRight: {
        flexDirection: 'row',
        gap: 16,
    },
    iconButton: {
        padding: 4,
    },
    heroContainer: {
        height: 200,
        marginBottom: 20,
    },
    heroGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroContent: {
        alignItems: 'center',
    },
    categoriesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        marginBottom: 32,
    },
    categoryItem: {
        alignItems: 'center',
        gap: 8,
    },
    categoryCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    categoryText: {
        fontSize: 12,
        color: '#5C6B5E',
        fontWeight: '500',
    },
    section: {
        marginBottom: 32,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 24,
        marginBottom: 16,
    },
    premiumHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 24,
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 18,
        color: '#2C3632', // Dark Charcoal
        fontFamily: 'serif',
        fontWeight: '500',
    },
    horizontalList: {
        paddingHorizontal: 24,
        gap: 16,
    },
    sessionCard: {
        width: 200,
        height: 140,
        borderRadius: 24,
        padding: 20,
        justifyContent: 'space-between',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 4,
    },
    sessionCardContent: {
        zIndex: 10,
        height: '100%',
        justifyContent: 'space-between',
    },
    sessionTitle: {
        fontSize: 18,
        fontFamily: 'serif',
        color: '#2C3632',
        fontWeight: '600',
    },
    sessionMeta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sessionTime: {
        fontSize: 12,
        color: '#2C3632',
        opacity: 0.7,
        fontWeight: '600',
    },
    playButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardDecoration: {
        position: 'absolute',
        right: -30,
        bottom: -30,
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    premiumCard: {
        marginHorizontal: 24,
        height: 180,
        borderRadius: 24,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
        elevation: 6,
    },
    premiumGradient: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 24,
    },
    premiumContent: {
        flex: 1,
        justifyContent: 'center',
    },
    tagContainer: {
        backgroundColor: 'rgba(255,255,255,0.6)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
        marginBottom: 12,
    },
    tagText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#2C3632',
        textTransform: 'uppercase',
    },
    premiumTitle: {
        fontSize: 22,
        fontFamily: 'serif',
        color: '#2C3632',
        fontWeight: '600',
        marginBottom: 20,
        lineHeight: 28,
    },
    knowMoreButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        alignSelf: 'flex-start',
    },
    knowMoreText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#5C6B5E',
        marginRight: 4,
    },
    premiumImagePlaceholder: {
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
