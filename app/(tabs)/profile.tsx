import { View, Text, TouchableOpacity, ScrollView, Image, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function Profile() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-background-dark pb-24">
            <View className="flex-row justify-between items-center p-4 pt-12 bg-background-dark/80 backdrop-blur-md sticky top-0 bg-background-dark z-10 w-full">
                <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
                    <MaterialIcons name="arrow-back-ios" size={20} color="white" />
                </TouchableOpacity>
                <Text className="text-lg font-bold text-white font-lexend">Settings</Text>
                <MaterialIcons name="notifications" size={24} color="white" />
            </View>

            <ScrollView className="flex-1 p-4">
                <View className="items-center py-8">
                    <View className="w-32 h-32 rounded-full border-4 border-primary/20 mb-4 overflow-hidden">
                        <Image
                            source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuD859qOh8yzZ_qAGq8UaHgpO6VVgBz5dm1CkIBLCcQMs_9f7shnWd-TDRogJQxMHE002kNDyXyxdntiKcwQQztvNNte9vp6cldTQ_E_dxpoiJ_g414-OASxx5B933IDnN-P6PSHIzmZX73IbyEtDk8EVo0bFFtLe7bOPmvziZh-mM5QhCC7N8Pr35_QjT2Pw1bUZDbGumS4OxBNcZkCLy6HiaxWjQ4nvYBo8FI4v43jIqehV-sennIPbjdslJJr1kPocux6J9Qv9RA" }}
                            className="w-full h-full"
                        />
                    </View>
                    <Text className="text-2xl font-bold text-white font-lexend">Rahul</Text>
                    <Text className="text-primary/70 text-sm font-display">Joined June 2023</Text>
                </View>

                <View className="space-y-6">
                    <View className="space-y-3">
                        <Text className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Preferences</Text>
                        <View className="bg-white/5 rounded-2xl overflow-hidden">
                            <View className="p-4 flex-row justify-between items-center border-b border-white/5">
                                <View className="flex-row items-center gap-4">
                                    <View className="w-10 h-10 bg-primary/10 rounded-lg items-center justify-center">
                                        <MaterialIcons name="schedule" size={20} color="#13ecb6" />
                                    </View>
                                    <Text className="text-white font-display">Daily Reminder</Text>
                                </View>
                                <Text className="text-primary font-bold">7:00 AM</Text>
                            </View>

                            <View className="p-4 flex-row justify-between items-center">
                                <View className="flex-row items-center gap-4">
                                    <View className="w-10 h-10 bg-primary/10 rounded-lg items-center justify-center">
                                        <MaterialIcons name="dark-mode" size={20} color="#13ecb6" />
                                    </View>
                                    <Text className="text-white font-display">Dark Mode</Text>
                                </View>
                                {/* Custom Switch Look */}
                                <View className="w-11 h-6 bg-primary rounded-full justify-center px-0.5 items-end">
                                    <View className="w-5 h-5 bg-white rounded-full shadow-sm" />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <TouchableOpacity
                    onPress={() => router.push('/')}
                    className="w-full mt-12 bg-red-500/10 items-center justify-center py-4 rounded-xl"
                >
                    <Text className="text-red-500 font-bold">Logout</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}
