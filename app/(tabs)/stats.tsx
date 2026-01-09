import { View, Text, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Stats() {
    return (
        <View className="flex-1 bg-background-dark pb-24">
            <View className="p-4 pt-12 items-center bg-background-dark/80 border-b border-white/5">
                <Text className="text-lg font-bold text-white font-lexend">Progress</Text>
            </View>

            <ScrollView className="flex-1 p-4">
                <LinearGradient
                    colors={['#1a3a32', '#10221d']}
                    className="rounded-xl p-6 border border-primary/20 mb-6"
                >
                    <Text className="text-primary text-xs font-bold uppercase mb-1">Achievement</Text>
                    <Text className="text-4xl font-bold text-white mb-2 font-display">7-Day Streak</Text>
                    <Text className="text-slate-300 text-sm font-display">Consistency is the gateway to awareness.</Text>
                </LinearGradient>

                <View className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <Text className="text-xs text-slate-400 uppercase mb-4">Minutes Practiced</Text>
                    <View className="flex-row items-baseline gap-2 mb-8">
                        <Text className="text-4xl font-bold text-white font-display">225m</Text>
                        <Text className="text-emerald-500 text-sm font-bold">+12%</Text>
                    </View>

                    <View className="flex-row justify-between items-end h-32 gap-2">
                        {[65, 85, 45, 95, 70, 60, 75].map((h, i) => (
                            <View key={i} className="flex-1 flex-col items-center gap-2 h-full justify-end">
                                <View className="bg-primary w-full rounded-full min-w-[8px]" style={{ height: `${h}%` }} />
                                <Text className="text-[10px] text-slate-500 font-mono">
                                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
