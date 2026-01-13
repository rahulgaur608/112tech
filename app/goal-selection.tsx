import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import ScreenBackground from '../components/ScreenBackground';

export default function GoalSelection() {
    const router = useRouter();
    const [selectedGoal, setSelectedGoal] = useState<string>('reduce-stress');

    const goals = [
        { id: 'reduce-stress', label: 'Reduce Stress', icon: 'spa' as const },
        { id: 'deepen-focus', label: 'Deepen Focus', icon: 'center-focus-strong' as const },
        { id: 'self-discovery', label: 'Self-Discovery', icon: 'explore' as const },
        { id: 'better-sleep', label: 'Better Sleep', icon: 'bedtime' as const },
        { id: 'manage-anxiety', label: 'Manage Anxiety', icon: 'healing' as const },
        { id: 'spiritual-growth', label: 'Spiritual Growth', icon: 'self-improvement' as const },
    ];

    return (
        <ScreenBackground className="flex-1">
            <View className="pt-12 px-4">
                <View className="flex w-full flex-row items-center justify-center gap-3 py-5">
                    <View className="h-2 w-2 rounded-full bg-[#A3B18A]/30" />
                    <View className="h-2 w-10 rounded-full bg-[#A3B18A]" />
                    <View className="h-2 w-2 rounded-full bg-[#A3B18A]/30" />
                </View>
            </View>

            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingBottom: 100 }}>
                <View className="items-center mb-8 pt-2">
                    <Text className="text-[#2C3632] tracking-tight text-[32px] font-bold leading-tight text-center pb-3 font-serif">
                        What is your goal?
                    </Text>
                    <Text className="text-[#5C6B5E] text-base font-normal leading-relaxed px-2 text-center font-display">
                        Choose what you’d like to focus on first to tailor your Vigyan Bhairava sessions.
                    </Text>
                </View>

                <View className="flex flex-col gap-4 max-w-md mx-auto w-full">
                    {goals.map((goal) => {
                        const isSelected = selectedGoal === goal.id;
                        return (
                            <TouchableOpacity
                                key={goal.id}
                                onPress={() => setSelectedGoal(goal.id)}
                                className={`flex-row items-center justify-between p-5 rounded-xl border active:opacity-80 shadow-sm ${isSelected
                                    ? 'bg-[#A3B18A]/10 border-[#A3B18A]'
                                    : 'bg-white border-transparent'
                                    }`}
                            >
                                <View className="flex-row items-center gap-4">
                                    <View className={`w-12 h-12 rounded-full flex items-center justify-center ${isSelected ? 'bg-[#A3B18A]' : 'bg-[#FFF9F0]'
                                        }`}>
                                        <MaterialIcons
                                            name={goal.icon}
                                            size={24}
                                            color={isSelected ? '#FFFFFF' : '#A3B18A'}
                                        />
                                    </View>
                                    <Text className={`text-lg font-semibold font-display ${isSelected ? 'text-[#2C3632]' : 'text-[#5C6B5E]'}`}>
                                        {goal.label}
                                    </Text>
                                </View>
                                <MaterialIcons
                                    name={isSelected ? "check-circle" : "radio-button-unchecked"}
                                    size={24}
                                    color={isSelected ? "#A3B18A" : "#E0E0E0"}
                                />
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>

            <View className="absolute bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-md">
                <TouchableOpacity
                    onPress={() => router.push('/notifications-onboarding')}
                    className="flex w-full cursor-pointer items-center justify-center text-center rounded-full h-14 px-5 bg-[#A3B18A] shadow-lg shadow-[#A3B18A]/20"
                >
                    <Text className="text-white text-lg font-bold">Next</Text>
                </TouchableOpacity>
            </View>
        </ScreenBackground>
    );
}
