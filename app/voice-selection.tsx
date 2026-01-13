import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import ScreenBackground from '../components/ScreenBackground';

export default function VoiceSelection() {
    const router = useRouter();

    return (
        <ScreenBackground className="flex-1">
            <View className="flex-row items-center justify-between px-4 pt-12 pb-2 bg-[#FFF9F0]/80 border-b border-gray-100">
                <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center rounded-full bg-white shadow-sm">
                    <MaterialIcons name="arrow-back-ios" size={20} color="#2C3632" />
                </TouchableOpacity>
                <Text className="text-lg font-bold text-[#2C3632] pr-10 font-serif">Voice Guide</Text>
                <View className="w-10" />
            </View>

            <View className="flex-1 px-4 py-4">
                <Text className="text-xl font-bold text-[#2C3632] pt-4 font-serif text-center mb-6">Select a voice that resonates with your awareness.</Text>

                <View className="mt-2 gap-3">
                    <TouchableOpacity className="flex-row items-center gap-4 bg-white px-4 py-4 justify-between rounded-xl border border-[#A3B18A]/30 shadow-sm active:opacity-80">
                        <View className="flex-row items-center gap-4">
                            <View className="relative">
                                <Image
                                    source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBW7Utl17A38oNQyNMjf46WZ6U5-9pvm4d-RlEfvup7cPgPH0V94wirlAfL8wNuo3GligzbR7nXqGVuFhn-yQFPuQJt4kXb0fjmtgOJUAbujgSvR7Drm1wifLv1LOOBIuFSsYvg1p0_UtArkXvCjZ694D79RvDLxrzpcDSFmjmC53daKKJAHiTupKcUyOCWrZfCw9NK3PTC8oN1_kqvL_XljFZwuIgEkFyg0wo58mUJQkSb-iQPorY6rYmAEz1uUZ92cgvW4WuQWiI" }}
                                    className="h-16 w-16 rounded-full border-2 border-[#A3B18A]"
                                />
                            </View>
                            <View>
                                <Text className="font-semibold text-[#2C3632] font-display text-lg">Master Aradhana</Text>
                                <Text className="text-sm text-[#5C6B5E] font-display">Calm & Grounded</Text>
                            </View>
                        </View>
                        <MaterialIcons name="check-circle" size={24} color="#A3B18A" />
                    </TouchableOpacity>
                </View>
            </View>

            <View className="p-4 pb-8 bg-white/80 backdrop-blur-md">
                <TouchableOpacity
                    onPress={() => router.push('/(tabs)/home')}
                    className="w-full bg-[#E9C46A] items-center justify-center py-4 rounded-full shadow-lg shadow-[#E9C46A]/20"
                >
                    <Text className="text-[#2C3632] font-bold text-lg">Select & Continue</Text>
                </TouchableOpacity>
            </View>
        </ScreenBackground>
    );
}
