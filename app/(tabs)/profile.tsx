import { View, Text, TouchableOpacity, ScrollView, Image, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { useState, useCallback } from 'react';
import ScreenBackground from '../../components/ScreenBackground';
import { useTheme } from '../../context/ThemeContext';

export default function Profile() {
    const router = useRouter();
    const { isDarkMode, toggleTheme } = useTheme();
    const [name, setName] = useState('Traveler');
    const [goal, setGoal] = useState('');

    useFocusEffect(
        useCallback(() => {
            const loadData = async () => {
                try {
                    const storedName = await AsyncStorage.getItem('user_name');
                    if (storedName) {
                        setName(storedName);
                    }
                    const storedGoal = await AsyncStorage.getItem('user_goal');
                    if (storedGoal) {
                        // Format goal ID to readable text
                        const goalText = storedGoal.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                        setGoal(goalText);
                    }
                } catch (e) {
                    console.error('Failed to load user data', e);
                }
            };
            loadData();
        }, [])
    );

    const textColor = isDarkMode ? "#FFF9F0" : "#2C3632";
    const subTextColor = isDarkMode ? "#A3B18A" : "#5C6B5E";
    const cardBg = isDarkMode ? "bg-[#2C3632]/80" : "bg-white";
    const iconColor = isDarkMode ? "#E9C46A" : "#2C3632";
    const borderColor = isDarkMode ? "border-[#A3B18A]/20" : "border-gray-50";

    return (
        <ScreenBackground className="flex-1 pb-24">
            <View className={`flex-row justify-between items-center p-4 pt-12 sticky top-0 z-10 w-full border-b ${borderColor} ${isDarkMode ? 'bg-[#1A1A1A]/90' : 'bg-white/90'} backdrop-blur-md`}>
                <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
                    <MaterialIcons name="arrow-back-ios" size={20} color={textColor} />
                </TouchableOpacity>
                <Text className={`text-lg font-bold font-serif`} style={{ color: textColor }}>Settings</Text>
                <MaterialIcons name="notifications-none" size={24} color={textColor} />
            </View>

            <ScrollView className="flex-1 p-4">
                <View className="items-center py-8">
                    <View className={`w-32 h-32 rounded-full border-4 mb-4 overflow-hidden shadow-sm bg-[#A3B18A]/20 ${isDarkMode ? 'border-[#2C3632]' : 'border-[#FFF9F0]'}`}>
                        <Image
                            source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuD859qOh8yzZ_qAGq8UaHgpO6VVgBz5dm1CkIBLCcQMs_9f7shnWd-TDRogJQxMHE002kNDyXyxdntiKcwQQztvNNte9vp6cldTQ_E_dxpoiJ_g414-OASxx5B933IDnN-P6PSHIzmZX73IbyEtDk8EVo0bFFtLe7bOPmvziZh-mM5QhCC7N8Pr35_QjT2Pw1bUZDbGumS4OxBNcZkCLy6HiaxWjQ4nvYBo8FI4v43jIqehV-sennIPbjdslJJr1kPocux6J9Qv9RA" }}
                            className="w-full h-full"
                        />
                    </View>
                    <Text className={`text-2xl font-bold font-serif`} style={{ color: textColor }}>{name}</Text>
                    <Text className={`text-sm font-display mt-1`} style={{ color: subTextColor }}>Joined June 2023</Text>
                    {goal ? <Text className={`text-xs mt-2 font-bold uppercase tracking-widest bg-[#A3B18A]/20 px-3 py-1 rounded-full`} style={{ color: subTextColor }}>{goal}</Text> : null}
                </View>

                <View className="space-y-6">
                    <View className="space-y-3">
                        <Text className="text-xs font-bold text-[#A3B18A] uppercase tracking-widest px-1">Preferences</Text>
                        <View className={`${cardBg} rounded-2xl overflow-hidden shadow-sm border ${borderColor}`}>
                            <View className={`p-4 flex-row justify-between items-center border-b ${borderColor}`}>
                                <View className="flex-row items-center gap-4">
                                    <View className="w-10 h-10 bg-[#E9C46A]/20 rounded-lg items-center justify-center">
                                        <MaterialIcons name="schedule" size={20} color="#E9C46A" />
                                    </View>
                                    <Text className={`font-display`} style={{ color: textColor }}>Daily Reminder</Text>
                                </View>
                                <Text className="text-[#A3B18A] font-bold">7:00 AM</Text>
                            </View>

                            <View className="p-4 flex-row justify-between items-center">
                                <View className="flex-row items-center gap-4">
                                    <View className={`w-10 h-10 rounded-lg items-center justify-center ${isDarkMode ? 'bg-[#FFF9F0]/10' : 'bg-[#2C3632]/10'}`}>
                                        <MaterialIcons name="dark-mode" size={20} color={iconColor} />
                                    </View>
                                    <Text className={`font-display`} style={{ color: textColor }}>Dark Mode</Text>
                                </View>
                                <Switch
                                    trackColor={{ false: "#E0E0E0", true: "#A3B18A" }}
                                    thumbColor={isDarkMode ? "#FFFFFF" : "#f4f3f4"}
                                    onValueChange={toggleTheme}
                                    value={isDarkMode}
                                />
                            </View>
                        </View>
                    </View>
                </View>

                <TouchableOpacity
                    onPress={() => router.push('/')}
                    className="w-full mt-12 bg-red-50/50 items-center justify-center py-4 rounded-xl border border-red-100"
                >
                    <Text className="text-red-400 font-bold">Logout</Text>
                </TouchableOpacity>
            </ScrollView>
        </ScreenBackground>
    );
}
