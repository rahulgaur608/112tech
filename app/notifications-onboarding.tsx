import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function NotificationsOnboarding() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-background-light dark:bg-background-dark">
            <View className="flex-1 flex justify-center items-center px-6 pt-12">
                <View className="w-full max-w-[340px] aspect-[4/5] relative">
                    {/* <View className="absolute inset-0 bg-primary/20 rounded-xl blur-2xl" /> */}
                    <LinearGradient
                        colors={['rgba(19, 236, 182, 0.2)', 'transparent']}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 0 }}
                        className="absolute inset-0 rounded-xl"
                        style={{ borderRadius: 12, opacity: 0.5 }}
                    />

                    <View className="relative w-full h-full bg-[#1a2e2a] rounded-xl border border-white/10 flex flex-col overflow-hidden shadow-2xl">
                        <View className="h-6 flex-row justify-between items-center px-4 pt-2">
                            <Text className="text-[10px] font-bold text-white">9:41</Text>
                            <View className="flex-row gap-1">
                                <MaterialIcons name="signal-cellular-alt" size={12} color="white" />
                                <MaterialIcons name="wifi" size={12} color="white" />
                                <MaterialIcons name="battery-full" size={12} color="white" />
                            </View>
                        </View>

                        <View className="mt-12 px-4">
                            <View className="bg-white/10 backdrop-blur-md rounded-lg p-4 flex-row items-start gap-3 border border-white/5">
                                <View className="bg-primary rounded-md w-8 h-8 flex items-center justify-center">
                                    <MaterialIcons name="self-improvement" size={20} color="#11221e" />
                                </View>
                                <View className="flex-1">
                                    <View className="flex-row justify-between items-center">
                                        <Text className="text-xs font-bold text-primary">AWARENESS NOW</Text>
                                        <Text className="text-[10px] text-white/50">Just now</Text>
                                    </View>
                                    <Text className="text-sm font-medium mt-1 text-white">Time for your daily practice.</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            <View className="items-center pb-12 w-full">
                <Text className="text-[#11221e] dark:text-white text-[32px] font-bold px-8 text-center pb-3 pt-6 font-lexend">
                    Stay Consistent
                </Text>
                <Text className="text-[#11221e]/70 dark:text-white/80 text-base text-center px-10 pb-8 font-display">
                    Build a lasting habit with daily reminders tailored to your schedule.
                </Text>

                <View className="w-full px-6 max-w-[480px]">
                    <TouchableOpacity
                        onPress={() => router.push('/voice-selection')}
                        className="w-full rounded-full h-14 bg-primary items-center justify-center shadow-lg shadow-primary/20"
                    >
                        <Text className="text-[#11221e] font-bold text-lg">Enable Notifications</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => router.push('/voice-selection')} className="pt-4">
                    <Text className="text-[#11221e]/50 dark:text-[#92c9bb] text-sm font-medium">Maybe Later</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
