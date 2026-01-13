import { View, Text, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ScreenBackground from '../../components/ScreenBackground';

export default function Stats() {
    return (
        <ScreenBackground className="flex-1 pb-24">
            <View className="p-4 pt-12 items-center bg-white/90 border-b border-gray-100">
                <Text className="text-lg font-bold text-[#2C3632] font-serif">Progress</Text>
            </View>

            <ScrollView className="flex-1 p-4">
                <LinearGradient
                    colors={['#FFF9F0', '#FFFFFF']}
                    className="rounded-xl p-6 border border-[#E9C46A]/30 mb-6 shadow-sm"
                >
                    <Text className="text-[#E9C46A] text-xs font-bold uppercase mb-1 tracking-widest">Achievement</Text>
                    <Text className="text-4xl font-bold text-[#2C3632] mb-2 font-serif">7-Day Streak</Text>
                    <Text className="text-[#5C6B5E] text-sm font-display">Consistency is the gateway to awareness.</Text>
                </LinearGradient>

                <View className="bg-white rounded-xl p-6 border border-gray-50 shadow-sm">
                    <Text className="text-xs text-[#A3B18A] uppercase mb-4 font-bold tracking-widest">Minutes Practiced</Text>
                    <View className="flex-row items-baseline gap-2 mb-8">
                        <Text className="text-4xl font-bold text-[#2C3632] font-serif">225m</Text>
                        <Text className="text-[#F4A261] text-sm font-bold">+12%</Text>
                    </View>

                    <View className="flex-row justify-between items-end h-32 gap-2">
                        {[65, 85, 45, 95, 70, 60, 75].map((h, i) => (
                            <View key={i} className="flex-1 flex-col items-center gap-2 h-full justify-end">
                                <View
                                    className="bg-[#A3B18A] w-full rounded-full min-w-[8px]"
                                    style={{ height: `${h}%`, opacity: i === 3 ? 1 : 0.6 }}
                                />
                                <Text className="text-[10px] text-[#94A1B2] font-mono">
                                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </ScreenBackground>
    );
}
