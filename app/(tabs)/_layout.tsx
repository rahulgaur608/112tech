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
                    backgroundColor: '#1A1A1A', // Deep Charcoal
                    borderTopWidth: 0,
                    position: 'absolute',
                    bottom: 30,
                    left: 20,
                    right: 20,
                    elevation: 10,
                    height: 65,
                    borderRadius: 35,
                    paddingTop: 0,
                    paddingBottom: 0,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 10 },
                    shadowOpacity: 0.15,
                    shadowRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                tabBarActiveTintColor: '#E9C46A', // Sunny Yellow
                tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.4)',
                tabBarShowLabel: false,
                tabBarItemStyle: {
                    height: 65,
                    padding: 0,
                }
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <View style={[styles.tabItem, focused && styles.tabItemActive]}>
                            {focused ? (
                                <View style={styles.activeIconBg}>
                                    <MaterialIcons name="home" size={24} color="#1A1A1A" />
                                </View>
                            ) : (
                                <MaterialIcons name="home" size={26} color={color} />
                            )}
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="library"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <View style={[styles.tabItem, focused && styles.tabItemActive]}>
                            {focused ? (
                                <View style={styles.activeIconBg}>
                                    <MaterialIcons name="auto-stories" size={24} color="#1A1A1A" />
                                </View>
                            ) : (
                                <MaterialIcons name="auto-stories" size={26} color={color} />
                            )}
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="stats"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <View style={[styles.tabItem, focused && styles.tabItemActive]}>
                            {focused ? (
                                <View style={styles.activeIconBg}>
                                    <MaterialIcons name="insights" size={24} color="#1A1A1A" />
                                </View>
                            ) : (
                                <MaterialIcons name="insights" size={26} color={color} />
                            )}
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <View style={[styles.tabItem, focused && styles.tabItemActive]}>
                            {focused ? (
                                <View style={styles.activeIconBg}>
                                    <MaterialIcons name="person" size={24} color="#1A1A1A" />
                                </View>
                            ) : (
                                <MaterialIcons name="person" size={26} color={color} />
                            )}
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
        justifyContent: 'center',
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    tabItemActive: {
        // transform: [{ translateY: -10 }], // Optional pop effect
    },
    activeIconBg: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#E9C46A', // Sunny Yellow Background for active
        justifyContent: 'center',
        alignItems: 'center',
    },
});
