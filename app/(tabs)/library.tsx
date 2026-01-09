import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { techniques, categories, getTechniquesByCategory, Technique } from '../../data/techniques';

const { width } = Dimensions.get('window');

export default function Library() {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTechniques = getTechniquesByCategory(selectedCategory).filter(t =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

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

    const getCategoryColor = (category: string, isActive: boolean) => {
        const colors: { [key: string]: string[] } = {
            'All': ['#c44dff', '#ff6b9d'],
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
                            <Text style={styles.title}>Library</Text>
                            <Text style={styles.subtitle}>112 Sacred Techniques</Text>
                        </View>
                        <View style={styles.countBadge}>
                            <Text style={styles.countText}>{filteredTechniques.length}</Text>
                        </View>
                    </View>

                    {/* Search */}
                    <View style={styles.searchContainer}>
                        <LinearGradient
                            colors={['rgba(196, 77, 255, 0.1)', 'rgba(77, 171, 255, 0.05)']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.searchGradient}
                        >
                            <MaterialIcons name="search" size={22} color="rgba(255,255,255,0.5)" />
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search techniques..."
                                placeholderTextColor="rgba(255,255,255,0.4)"
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                            />
                            {searchQuery.length > 0 && (
                                <TouchableOpacity onPress={() => setSearchQuery('')}>
                                    <MaterialIcons name="close" size={20} color="rgba(255,255,255,0.5)" />
                                </TouchableOpacity>
                            )}
                        </LinearGradient>
                    </View>

                    {/* Categories */}
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.categoriesScroll}
                        contentContainerStyle={styles.categoriesContainer}
                    >
                        {categories.map((category) => (
                            <TouchableOpacity
                                key={category}
                                onPress={() => setSelectedCategory(category)}
                            >
                                {selectedCategory === category ? (
                                    <LinearGradient
                                        colors={getCategoryColor(category, true)}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        style={styles.categoryPillActive}
                                    >
                                        <Text style={styles.categoryTextActive}>{category}</Text>
                                    </LinearGradient>
                                ) : (
                                    <View style={styles.categoryPill}>
                                        <Text style={styles.categoryText}>{category}</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* Techniques List */}
                    <View style={styles.techniquesContainer}>
                        {filteredTechniques.map((technique, index) => (
                            <TouchableOpacity
                                key={technique.id}
                                style={styles.techniqueCard}
                                onPress={() => handleTechniquePress(technique)}
                            >
                                <LinearGradient
                                    colors={[
                                        index % 4 === 0 ? 'rgba(255, 107, 157, 0.12)' :
                                            index % 4 === 1 ? 'rgba(77, 171, 255, 0.12)' :
                                                index % 4 === 2 ? 'rgba(196, 77, 255, 0.12)' :
                                                    'rgba(77, 255, 174, 0.12)',
                                        'rgba(10, 15, 26, 0.5)'
                                    ]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={styles.techniqueGradient}
                                >
                                    <View style={styles.techniqueHeader}>
                                        <View style={[styles.verseTag, {
                                            backgroundColor: index % 4 === 0 ? 'rgba(255, 107, 157, 0.2)' :
                                                index % 4 === 1 ? 'rgba(77, 171, 255, 0.2)' :
                                                    index % 4 === 2 ? 'rgba(196, 77, 255, 0.2)' :
                                                        'rgba(77, 255, 174, 0.2)'
                                        }]}>
                                            <Text style={[styles.verseText, {
                                                color: index % 4 === 0 ? '#ff6b9d' :
                                                    index % 4 === 1 ? '#4dabff' :
                                                        index % 4 === 2 ? '#c44dff' :
                                                            '#4dffae'
                                            }]}>✦ Verse {technique.verse}</Text>
                                        </View>
                                        <Text style={styles.durationText}>{technique.duration}</Text>
                                    </View>
                                    <Text style={styles.techniqueTitle}>{technique.title}</Text>
                                    <Text style={styles.techniqueDescription} numberOfLines={2}>
                                        {technique.description}
                                    </Text>
                                    <View style={styles.techniqueFooter}>
                                        <View style={styles.categoryTag}>
                                            <View style={[styles.categoryIconContainer, {
                                                backgroundColor: index % 4 === 0 ? 'rgba(255, 107, 157, 0.2)' :
                                                    index % 4 === 1 ? 'rgba(77, 171, 255, 0.2)' :
                                                        index % 4 === 2 ? 'rgba(196, 77, 255, 0.2)' :
                                                            'rgba(77, 255, 174, 0.2)'
                                            }]}>
                                                <MaterialIcons
                                                    name={getCategoryIcon(technique.category) as any}
                                                    size={12}
                                                    color={index % 4 === 0 ? '#ff6b9d' :
                                                        index % 4 === 1 ? '#4dabff' :
                                                            index % 4 === 2 ? '#c44dff' :
                                                                '#4dffae'}
                                                />
                                            </View>
                                            <Text style={styles.categoryTagText}>{technique.category}</Text>
                                        </View>
                                        <View style={[styles.arrowCircle, {
                                            backgroundColor: index % 4 === 0 ? 'rgba(255, 107, 157, 0.2)' :
                                                index % 4 === 1 ? 'rgba(77, 171, 255, 0.2)' :
                                                    index % 4 === 2 ? 'rgba(196, 77, 255, 0.2)' :
                                                        'rgba(77, 255, 174, 0.2)'
                                        }]}>
                                            <MaterialIcons name="arrow-forward" size={14} color="white" />
                                        </View>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        ))}
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
        paddingBottom: 8,
    },
    title: {
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    subtitle: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 14,
    },
    countBadge: {
        backgroundColor: 'rgba(196, 77, 255, 0.2)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(196, 77, 255, 0.3)',
    },
    countText: {
        color: '#c44dff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    searchContainer: {
        paddingHorizontal: 24,
        marginVertical: 16,
    },
    searchGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(196, 77, 255, 0.2)',
    },
    searchInput: {
        flex: 1,
        marginLeft: 12,
        color: 'white',
        fontSize: 16,
    },
    categoriesScroll: {
        marginBottom: 20,
    },
    categoriesContainer: {
        paddingHorizontal: 24,
        gap: 10,
    },
    categoryPill: {
        paddingHorizontal: 18,
        paddingVertical: 10,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 25,
        marginRight: 10,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    categoryPillActive: {
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 25,
        marginRight: 10,
    },
    categoryText: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 14,
        fontWeight: '500',
    },
    categoryTextActive: {
        color: 'white',
        fontSize: 14,
        fontWeight: '700',
    },
    techniquesContainer: {
        paddingHorizontal: 24,
    },
    techniqueCard: {
        marginBottom: 14,
        borderRadius: 20,
        overflow: 'hidden',
    },
    techniqueGradient: {
        padding: 18,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.08)',
        borderRadius: 20,
    },
    techniqueHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    verseTag: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
    },
    verseText: {
        fontSize: 11,
        fontWeight: '700',
    },
    durationText: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 12,
    },
    techniqueTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 6,
    },
    techniqueDescription: {
        color: 'rgba(255,255,255,0.55)',
        fontSize: 13,
        lineHeight: 19,
        marginBottom: 14,
    },
    techniqueFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    categoryTag: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    categoryIconContainer: {
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryTagText: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 12,
    },
    arrowCircle: {
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
