import { Tabs } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: 'rgba(10, 15, 26, 0.9)',
                    borderTopWidth: 1,
                    borderTopColor: 'rgba(196, 77, 255, 0.15)',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    elevation: 0,
                    height: 85,
                    paddingTop: 12,
                    paddingBottom: 20,
                },
                tabBarActiveTintColor: '#c44dff',
                tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.4)',
                tabBarShowLabel: false,
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <View style={styles.tabItem}>
                            {focused ? (
                                <LinearGradient
                                    colors={['#c44dff', '#ff6b9d']}
                                    style={styles.activeIconBg}
                                >
                                    <MaterialIcons name="home" size={22} color="white" />
                                </LinearGradient>
                            ) : (
                                <MaterialIcons name="home" size={24} color={color} />
                            )}
                            <Text style={[styles.tabLabel, focused && styles.tabLabelActive]}>HOME</Text>
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="library"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <View style={styles.tabItem}>
                            {focused ? (
                                <LinearGradient
                                    colors={['#4dabff', '#4dffae']}
                                    style={styles.activeIconBg}
                                >
                                    <MaterialIcons name="auto-stories" size={22} color="white" />
                                </LinearGradient>
                            ) : (
                                <MaterialIcons name="auto-stories" size={24} color={color} />
                            )}
                            <Text style={[styles.tabLabel, focused && { color: '#4dabff' }]}>LIBRARY</Text>
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="stats"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <View style={styles.tabItem}>
                            {focused ? (
                                <LinearGradient
                                    colors={['#ff6b9d', '#ffd700']}
                                    style={styles.activeIconBg}
                                >
                                    <MaterialIcons name="insights" size={22} color="white" />
                                </LinearGradient>
                            ) : (
                                <MaterialIcons name="insights" size={24} color={color} />
                            )}
                            <Text style={[styles.tabLabel, focused && { color: '#ff6b9d' }]}>STATS</Text>
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <View style={styles.tabItem}>
                            {focused ? (
                                <LinearGradient
                                    colors={['#ff9d6b', '#c44dff']}
                                    style={styles.activeIconBg}
                                >
                                    <MaterialIcons name="person" size={22} color="white" />
                                </LinearGradient>
                            ) : (
                                <MaterialIcons name="person" size={24} color={color} />
                            )}
                            <Text style={[styles.tabLabel, focused && { color: '#ff9d6b' }]}>PROFILE</Text>
                        </View>
                    ),
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabItem: {
        alignItems: 'center',
        gap: 6,
    },
    activeIconBg: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabLabel: {
        fontSize: 10,
        fontWeight: '600',
        color: 'rgba(255, 255, 255, 0.4)',
        letterSpacing: 1,
    },
    tabLabelActive: {
        color: '#c44dff',
    },
});
