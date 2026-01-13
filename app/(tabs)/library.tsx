import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Dimensions, Platform, Animated } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { categories, Technique } from '../../data/techniques';
import { useTechniques } from '../../context/TechniqueContext';
import ScreenBackground from '../../components/ScreenBackground';

const { width } = Dimensions.get('window');

export default function Library() {
    const router = useRouter();
    const { techniques } = useTechniques();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
        }).start();
    }, []);

    const filteredTechniques = techniques.filter(t => {
        const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
        const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
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

    const getCategoryColor = (category: string) => {
        const colors: { [key: string]: string } = {
            'All': '#A3B18A',
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

    const getCategoryIcon = (category: string) => {
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
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.title}>Library</Text>
                        <Text style={styles.subtitle}>112 Sacred Techniques</Text>
                    </View>
                    <View style={styles.countBadge}>
                        <Text style={styles.countText}>{filteredTechniques.length}</Text>
                    </View>
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <View style={styles.searchBar}>
                        <MaterialIcons name="search" size={22} color="#5C6B5E" />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Find a technique..."
                            placeholderTextColor="#94A1B2"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                        {searchQuery.length > 0 && (
                            <TouchableOpacity onPress={() => setSearchQuery('')}>
                                <MaterialIcons name="close" size={20} color="#5C6B5E" />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                {/* Categories */}
                <View style={styles.categoriesContainer}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.categoriesContent}
                    >
                        {categories.map((category) => (
                            <TouchableOpacity
                                key={category}
                                onPress={() => setSelectedCategory(category)}
                                activeOpacity={0.8}
                            >
                                <View style={[
                                    styles.categoryPill,
                                    selectedCategory === category && { backgroundColor: '#A3B18A' }
                                ]}>
                                    <Text style={[
                                        styles.categoryText,
                                        selectedCategory === category && styles.categoryTextActive
                                    ]}>{category}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Techniques List */}
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                >
                    {filteredTechniques.map((technique, index) => (
                        <Animated.View
                            key={technique.id}
                            style={{ opacity: fadeAnim }}
                        >
                            <TouchableOpacity
                                style={styles.techniqueCardContainer}
                                onPress={() => handleTechniquePress(technique)}
                                activeOpacity={0.9}
                            >
                                <View style={styles.techniqueCard}>
                                    <View style={styles.cardHeader}>
                                        <View style={[styles.iconContainer, { backgroundColor: `${getCategoryColor(technique.category)}20` }]}>
                                            <MaterialIcons
                                                name={getCategoryIcon(technique.category) as any}
                                                size={18}
                                                color={getCategoryColor(technique.category)}
                                            />
                                        </View>
                                        <View style={styles.verseBadge}>
                                            <Text style={styles.verseText}>#{technique.verse}</Text>
                                        </View>
                                    </View>

                                    <Text style={styles.cardTitle}>{technique.title}</Text>
                                    <Text style={styles.durationText}>{technique.duration}</Text>
                                </View>
                            </TouchableOpacity>
                        </Animated.View>
                    ))}
                    <View style={{ height: 100 }} />
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 16,
        marginBottom: 16,
    },
    title: {
        color: '#2C3632',
        fontSize: 32,
        fontWeight: 'bold',
        fontFamily: 'serif',
        marginBottom: 4,
    },
    subtitle: {
        color: '#A3B18A',
        fontSize: 14,
        fontWeight: '600',
    },
    countBadge: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#FFF9F0',
        borderWidth: 1,
        borderColor: '#A3B18A',
    },
    countText: {
        color: '#A3B18A',
        fontSize: 16,
        fontWeight: 'bold',
    },
    searchContainer: {
        paddingHorizontal: 24,
        marginBottom: 20,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    searchInput: {
        flex: 1,
        marginLeft: 12,
        color: '#2C3632',
        fontSize: 16,
    },
    categoriesContainer: {
        marginBottom: 8,
    },
    categoriesContent: {
        paddingHorizontal: 24,
        gap: 10,
        paddingBottom: 12,
    },
    categoryPill: {
        paddingHorizontal: 18,
        paddingVertical: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
    },
    categoryText: {
        color: '#5C6B5E',
        fontSize: 14,
        fontWeight: '500',
    },
    categoryTextActive: {
        color: '#FFFFFF',
        fontWeight: '700',
    },
    scrollView: {
        flex: 1,
    },
    listContent: {
        paddingHorizontal: 24,
        paddingTop: 8,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    techniqueCardContainer: {
        width: (width - 60) / 2, // 2 columns with spacing
        marginBottom: 16,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
    },
    techniqueCard: {
        padding: 16,
        height: 160,
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    iconContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    verseBadge: {
        backgroundColor: '#FFF9F0',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    verseText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#A3B18A',
    },
    cardTitle: {
        color: '#2C3632',
        fontSize: 15,
        fontWeight: '600',
        lineHeight: 20,
        fontFamily: 'serif',
    },
    durationText: {
        color: '#94A1B2',
        fontSize: 12,
    },
});
