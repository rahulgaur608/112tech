import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import ScreenBackground from '../components/ScreenBackground';

export default function NameSelection() {
    const router = useRouter();
    const [name, setName] = useState('');

    const handleNext = async () => {
        if (name.trim()) {
            try {
                await AsyncStorage.setItem('user_name', name.trim());
                router.push('/goal-selection');
            } catch (e) {
                console.error('Failed to save name', e);
            }
        }
    };

    return (
        <ScreenBackground className="flex-1">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View className="flex-1 justify-between">
                        <View className="pt-12 px-6">
                            <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center rounded-full bg-white mb-8 shadow-sm">
                                <MaterialIcons name="arrow-back-ios" size={20} color="#2C3632" />
                            </TouchableOpacity>

                            <View className="items-center mb-12">
                                <Text className="text-[#2C3632] text-[32px] font-bold text-center mb-4 font-serif">
                                    What should we call you?
                                </Text>
                                <Text className="text-[#5C6B5E] text-base text-center font-display">
                                    Your name helps us personalize your journey.
                                </Text>
                            </View>

                            <View className="w-full">
                                <TextInput
                                    className="w-full bg-white text-[#2C3632] p-5 rounded-xl text-xl font-display border border-[#E0E0E0] focus:border-[#A3B18A] shadow-sm"
                                    placeholder="Enter your name"
                                    placeholderTextColor="#94A1B2"
                                    value={name}
                                    onChangeText={setName}
                                    autoFocus
                                    returnKeyType="done"
                                    onSubmitEditing={handleNext}
                                />
                            </View>
                        </View>

                        <View className="p-6 pb-12">
                            <TouchableOpacity
                                onPress={handleNext}
                                disabled={!name.trim()}
                                className={`w-full items-center justify-center py-4 rounded-full shadow-lg ${name.trim() ? 'bg-[#A3B18A] shadow-[#A3B18A]/30' : 'bg-[#E0E0E0]'
                                    }`}
                            >
                                <Text className={`text-lg font-bold ${name.trim() ? 'text-white' : 'text-[#94A1B2]'
                                    }`}>
                                    Next
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScreenBackground>
    );
}
