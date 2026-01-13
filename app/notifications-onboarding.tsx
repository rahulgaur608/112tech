import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Notifications from 'expo-notifications';
import ScreenBackground from '../components/ScreenBackground';

export default function NotificationsOnboarding() {
    const router = useRouter();

    const handleEnableNotifications = async () => {
        try {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status === 'granted') {
                console.log('Notification permissions granted!');
            }
        } catch (error) {
            console.log('Error requesting permissions:', error);
        } finally {
            // Navigate regardless of the outcome
            router.push('/voice-selection');
        }
    };

    return (
        <ScreenBackground className="flex-1">
            <View className="flex-1 flex justify-center items-center px-6 pt-12">
                <View className="w-full max-w-[340px] aspect-[4/5] relative">
                    <LinearGradient
                        colors={['rgba(163, 177, 138, 0.2)', 'transparent']}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 0 }}
                        className="absolute inset-0 rounded-xl"
                        style={{ borderRadius: 12, opacity: 0.5 }}
                    />

                    <View className="relative w-full h-full bg-white rounded-xl border border-gray-100 flex flex-col overflow-hidden shadow-sm">
                        {/* Status Bar removed as per request */}
                        <View className="h-6 w-full" />

                        <View className="mt-8 px-4">
                            <View className="bg-[#FFF9F0] rounded-lg p-4 flex-row items-start gap-3 border border-[#A3B18A]/20 shadow-sm">
                                <View className="bg-[#A3B18A] rounded-md w-8 h-8 flex items-center justify-center">
                                    <MaterialIcons name="self-improvement" size={20} color="#FFFFFF" />
                                </View>
                                <View className="flex-1">
                                    <View className="flex-row justify-between items-center">
                                        <Text className="text-xs font-bold text-[#2C3632]">AWARENESS NOW</Text>
                                        <Text className="text-[10px] text-[#94A1B2]">Just now</Text>
                                    </View>
                                    <Text className="text-sm font-medium mt-1 text-[#5C6B5E]">Time for your daily practice.</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            <View className="items-center pb-12 w-full">
                <Text className="text-[#2C3632] text-[32px] font-bold px-8 text-center pb-3 pt-6 font-serif">
                    Stay Consistent
                </Text>
                <Text className="text-[#5C6B5E] text-base text-center px-10 pb-8 font-display">
                    Build a lasting habit with daily reminders tailored to your schedule.
                </Text>

                <View className="w-full px-6 max-w-[480px]">
                    <TouchableOpacity
                        onPress={handleEnableNotifications}
                        className="w-full rounded-full h-14 bg-[#A3B18A] items-center justify-center shadow-lg shadow-[#A3B18A]/30"
                    >
                        <Text className="text-white font-bold text-lg">Enable Notifications</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => router.push('/voice-selection')} className="pt-4">
                    <Text className="text-[#94A1B2] text-sm font-medium">Maybe Later</Text>
                </TouchableOpacity>
            </View>
        </ScreenBackground>
    );
}
