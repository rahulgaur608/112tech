import "../global.css";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { Inter_300Light, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from "@expo-google-fonts/inter";
import { Lexend_100Thin, Lexend_400Regular, Lexend_500Medium, Lexend_600SemiBold, Lexend_700Bold } from "@expo-google-fonts/lexend";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { TechniqueProvider } from "../context/TechniqueContext";
import { ThemeProvider, useTheme } from "../context/ThemeContext";

SplashScreen.preventAutoHideAsync();

function RootContent() {
    const { isDarkMode } = useTheme();

    return (
        <View style={{ flex: 1, backgroundColor: isDarkMode ? '#10221d' : '#FFF9F0' }}>
            <StatusBar style={isDarkMode ? "light" : "dark"} backgroundColor={isDarkMode ? '#10221d' : '#FFF9F0'} />
            <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: isDarkMode ? '#10221d' : '#FFF9F0' } }}>
                <Stack.Screen name="index" />
            </Stack>
        </View>
    );
}

export default function RootLayout() {
    const [fontsLoaded, error] = useFonts({
        Inter_300Light,
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold, Inter_700Bold,
        Lexend_100Thin,
        Lexend_400Regular,
        Lexend_500Medium,
        Lexend_600SemiBold,
        Lexend_700Bold,
    });

    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <ThemeProvider>
            <TechniqueProvider>
                <RootContent />
            </TechniqueProvider>
        </ThemeProvider>
    );
}
