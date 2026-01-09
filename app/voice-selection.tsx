import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function VoiceSelection() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-background-dark">
            <View className="flex-row items-center justify-between px-4 pt-12 pb-2 bg-background-dark/80">
                <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center rounded-full bg-gray-800">
                    <MaterialIcons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-lg font-bold text-white pr-10 font-display">Guided Voice Selection</Text>
                <View className="w-10" />
            </View>

            <View className="flex-1 px-4 py-4">
                <Text className="text-xl font-bold text-white pt-4 font-lexend">Select a voice that resonates with your awareness.</Text>

                <View className="mt-6 gap-3">
                    <TouchableOpacity className="flex-row items-center gap-4 bg-[#1a2e29] px-4 py-3 justify-between rounded-xl border border-primary/50 shadow-sm active:opacity-80">
                        <View className="flex-row items-center gap-4">
                            <View className="relative">
                                <Image
                                    source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBW7Utl17A38oNQyNMjf46WZ6U5-9pvm4d-RlEfvup7cPgPH0V94wirlAfL8wNuo3GligzbR7nXqGVuFhn-yQFPuQJt4kXb0fjmtgOJUAbujgSvR7Drm1wifLv1LOOBIuFSsYvg1p0_UtArkXvCjZ694D79RvDLxrzpcDSFmjmC53daKKJAHiTupKcUyOCWrZfCw9NK3PTC8oN1_kqvL_XljFZwuIgEkFyg0wo58mUJQkSb-iQPorY6rYmAEz1uUZ92cgvW4WuQWiI" }}
                                    className="h-16 w-16 rounded-full border-2 border-primary"
                                />
                            </View>
                            <View>
                                <Text className="font-semibold text-white font-display">Master Aradhana</Text>
                                <Text className="text-sm text-[#92c9bb] font-display">Calm & Grounded</Text>
                            </View>
                        </View>
                        <MaterialIcons name="check-circle" size={24} color="#13ecb6" />
                    </TouchableOpacity>
                </View>
            </View>

            <View className="p-4 pb-8">
                <TouchableOpacity
                    onPress={() => router.push('/(tabs)/home')}
                    className="w-full bg-primary items-center justify-center py-4 rounded-full shadow-lg"
                >
                    <Text className="text-background-dark font-bold text-lg">Select & Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
