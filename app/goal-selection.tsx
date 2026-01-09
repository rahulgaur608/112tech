import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function GoalSelection() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-background-light dark:bg-background-dark">
            <View className="pt-12 px-4">
                <View className="flex w-full flex-row items-center justify-center gap-3 py-5">
                    <View className="h-2 w-2 rounded-full bg-primary/30" />
                    <View className="h-2 w-10 rounded-full bg-primary" />
                    <View className="h-2 w-2 rounded-full bg-primary/30" />
                </View>
            </View>

            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24 }}>
                <Text className="text-slate-900 dark:text-white tracking-tight text-[32px] font-bold leading-tight text-center pb-3 pt-2 font-lexend">
                    What is your goal?
                </Text>
                <Text className="text-slate-600 dark:text-slate-300 text-base font-normal leading-relaxed pb-8 px-2 text-center font-display">
                    Choose what you’d like to focus on first to tailor your Vigyan Bhairava sessions.
                </Text>

                <View className="flex flex-col gap-4 max-w-md mx-auto w-full">
                    <TouchableOpacity className="flex-row items-center justify-between p-5 rounded-xl bg-primary/5 border border-primary/10 active:opacity-80">
                        <View className="flex-row items-center gap-4">
                            <View className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <MaterialIcons name="spa" size={24} color="#13ecb6" />
                            </View>
                            <Text className="text-lg font-semibold dark:text-white text-slate-900 font-display">Reduce Stress</Text>
                        </View>
                        <MaterialIcons name="check-circle" size={24} color="rgba(19, 236, 182, 0.4)" />
                    </TouchableOpacity>

                    <TouchableOpacity className="flex-row items-center justify-between p-5 rounded-xl bg-primary/15 border-2 border-primary active:opacity-80">
                        <View className="flex-row items-center gap-4">
                            <View className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                                <MaterialIcons name="center-focus-strong" size={24} color="#10221d" />
                            </View>
                            <Text className="text-lg font-semibold dark:text-white text-slate-900 font-display">Deepen Focus</Text>
                        </View>
                        <MaterialIcons name="check-circle" size={24} color="#13ecb6" />
                    </TouchableOpacity>

                    <TouchableOpacity className="flex-row items-center justify-between p-5 rounded-xl bg-primary/5 border border-primary/10 active:opacity-80">
                        <View className="flex-row items-center gap-4">
                            <View className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <MaterialIcons name="explore" size={24} color="#13ecb6" />
                            </View>
                            <Text className="text-lg font-semibold dark:text-white text-slate-900 font-display">Self-Discovery</Text>
                        </View>
                        <MaterialIcons name="radio-button-unchecked" size={24} color="rgba(19, 236, 182, 0.4)" />
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <View className="px-6 py-10">
                <TouchableOpacity
                    onPress={() => router.push('/notifications-onboarding')}
                    className="flex w-full cursor-pointer items-center justify-center text-center rounded-full h-14 px-5 bg-primary shadow-lg shadow-primary/20"
                >
                    <Text className="text-background-dark text-lg font-bold">Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
