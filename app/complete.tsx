import { View, Text, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function SessionComplete() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-background-dark">
            <View className="flex-row items-center p-4 pt-12 justify-between">
                <TouchableOpacity onPress={() => router.push('/(tabs)/home')}>
                    <MaterialIcons name="close" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-lg font-bold text-white pr-8 font-lexend">Session Summary</Text>
                <View />
            </View>

            <View className="p-4 space-y-6 flex-1">
                <ImageBackground
                    source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDhVHumorN4aEGq8dVu5xn-uFK3x3INN9Yo9i8nNtjVXIXPDEm4yp7i-w-lLDRYsX1GRvtj8_di4kk8w0Svl_b3wHSnRhbPNLrHNIOXbuz3uSKO6AQA9WQvfgmBKnk2TqgedlauRwgwNo0VjR3U1CXK-5erw9CK8nSeCH03LW8unm5VR5-_6nLfKlF5AhrNsNOPRI2WTvNftIocSiwRlkaEkn-lXPY8-gvEqnzGdpgX8WqKXyr-DSgnddwfzBpTWEFbswj04HHeT8" }}
                    className="rounded-xl min-h-[240px] items-center justify-center border border-primary/20 overflow-hidden"
                    imageStyle={{ borderRadius: 12 }}
                >
                    <LinearGradient
                        colors={['transparent', 'rgba(16, 34, 29, 0.9)']}
                        className="absolute inset-0"
                    />
                    <View className="items-center z-10 p-6">
                        <View className="w-16 h-16 bg-primary/20 rounded-full items-center justify-center mb-4">
                            <MaterialIcons name="verified" size={40} color="#13ecb6" />
                        </View>
                        <Text className="text-3xl font-bold text-white font-lexend">Session Complete</Text>
                    </View>
                </ImageBackground>

                <View className="flex-row gap-4">
                    <LinearGradient colors={['rgba(25, 51, 45, 0.4)', 'rgba(25, 51, 45, 0.4)']} className="flex-1 p-5 rounded-xl border border-white/5 items-center">
                        <Text className="text-xs text-slate-400 uppercase font-bold mb-1">Time</Text>
                        <Text className="text-2xl font-bold text-white font-display">10:00</Text>
                    </LinearGradient>
                    <LinearGradient colors={['rgba(25, 51, 45, 0.4)', 'rgba(25, 51, 45, 0.4)']} className="flex-1 p-5 rounded-xl border border-white/5 items-center">
                        <Text className="text-xs text-slate-400 uppercase font-bold mb-1">Streak</Text>
                        <Text className="text-2xl font-bold text-white font-display">6 Days</Text>
                    </LinearGradient>
                </View>

                <View>
                    <Text className="font-bold text-white mb-2 ml-1 text-lg font-lexend">Reflect on your session</Text>
                    <TextInput
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 h-32 text-white text-base"
                        placeholder="How do you feel?"
                        placeholderTextColor="rgba(255,255,255,0.3)"
                        multiline
                        textAlignVertical="top"
                    />
                </View>
            </View>

            <View className="p-4 pb-8 mt-auto">
                <TouchableOpacity
                    onPress={() => router.push('/(tabs)/home')}
                    className="w-full bg-primary items-center justify-center py-4 rounded-full shadow-lg shadow-primary/20"
                >
                    <Text className="text-background-dark font-bold text-lg">Return to Home</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
