import { View, Text, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import ScreenBackground from '../components/ScreenBackground';

export default function SessionComplete() {
    const router = useRouter();

    return (
        <ScreenBackground className="flex-1">
            <View className="flex-row items-center p-4 pt-12 justify-between">
                <TouchableOpacity onPress={() => router.push('/(tabs)/home')}>
                    <MaterialIcons name="close" size={24} color="#00F0FF" />
                </TouchableOpacity>
                <Text className="text-lg font-bold text-cosmic-text pr-8 font-lexend">Session Summary</Text>
                <View />
            </View>

            <View className="p-4 space-y-6 flex-1">
                <ImageBackground
                    source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDhVHumorN4aEGq8dVu5xn-uFK3x3INN9Yo9i8nNtjVXIXPDEm4yp7i-w-lLDRYsX1GRvtj8_di4kk8w0Svl_b3wHSnRhbPNLrHNIOXbuz3uSKO6AQA9WQvfgmBKnk2TqgedlauRwgwNo0VjR3U1CXK-5erw9CK8nSeCH03LW8unm5VR5-_6nLfKlF5AhrNsNOPRI2WTvNftIocSiwRlkaEkn-lXPY8-gvEqnzGdpgX8WqKXyr-DSgnddwfzBpTWEFbswj04HHeT8" }}
                    className="rounded-xl min-h-[240px] items-center justify-center border border-cosmic-cyan/30 overflow-hidden shadow-neon-cyan"
                    imageStyle={{ borderRadius: 12 }}
                >
                    <LinearGradient
                        colors={['transparent', 'rgba(5, 5, 17, 0.8)']}
                        className="absolute inset-0"
                    />
                    <View className="items-center z-10 p-6">
                        <View className="w-16 h-16 bg-white/10 rounded-full items-center justify-center mb-4 border border-cosmic-cyan/50">
                            <MaterialIcons name="verified" size={40} color="#00F0FF" />
                        </View>
                        <Text className="text-3xl font-bold text-cosmic-text font-lexend">Session Complete</Text>
                    </View>
                </ImageBackground>

                <View className="flex-row gap-4">
                    <LinearGradient colors={['rgba(18, 18, 42, 0.6)', 'rgba(5, 5, 17, 0.4)']} className="flex-1 p-5 rounded-xl border border-cosmic-cyan/20 items-center">
                        <Text className="text-xs text-cosmic-cyan uppercase font-bold mb-1">Time</Text>
                        <Text className="text-2xl font-bold text-cosmic-text font-display">10:00</Text>
                    </LinearGradient>
                    <LinearGradient colors={['rgba(18, 18, 42, 0.6)', 'rgba(5, 5, 17, 0.4)']} className="flex-1 p-5 rounded-xl border border-cosmic-cyan/20 items-center">
                        <Text className="text-xs text-cosmic-cyan uppercase font-bold mb-1">Streak</Text>
                        <Text className="text-2xl font-bold text-cosmic-text font-display">6 Days</Text>
                    </LinearGradient>
                </View>

                <View>
                    <Text className="font-bold text-cosmic-text mb-2 ml-1 text-lg font-lexend">Reflect on your session</Text>
                    <TextInput
                        className="w-full bg-cosmic-surface/60 border border-cosmic-cyan/20 rounded-xl p-4 h-32 text-cosmic-text text-base"
                        placeholder="How do you feel?"
                        placeholderTextColor="#94A1B2"
                        multiline
                        textAlignVertical="top"
                    />
                </View>
            </View>

            <View className="p-4 pb-8 mt-auto">
                <TouchableOpacity
                    onPress={() => router.push('/(tabs)/home')}
                    className="w-full bg-cosmic-cyan items-center justify-center py-4 rounded-full shadow-lg shadow-neon-cyan"
                >
                    <Text className="text-background-dark font-bold text-lg">Return to Home</Text>
                </TouchableOpacity>
            </View>
        </ScreenBackground>
    );
}
