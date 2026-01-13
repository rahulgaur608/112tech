import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'nativewind';

type ThemeContextType = {
    isDarkMode: boolean;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
    isDarkMode: false,
    toggleTheme: () => { },
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const { colorScheme, setColorScheme } = useColorScheme();
    const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

    useEffect(() => {
        const loadTheme = async () => {
            try {
                const storedTheme = await AsyncStorage.getItem('theme');
                if (storedTheme) {
                    const isDark = storedTheme === 'dark';
                    setIsDarkMode(isDark);
                    setColorScheme(isDark ? 'dark' : 'light');
                } else {
                    // Default to light if no preference
                    setIsDarkMode(false);
                    setColorScheme('light');
                }
            } catch (e) {
                console.error('Failed to load theme preference', e);
            }
        };
        loadTheme();
    }, []);

    const toggleTheme = async () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        setColorScheme(newMode ? 'dark' : 'light');
        try {
            await AsyncStorage.setItem('theme', newMode ? 'dark' : 'light');
        } catch (e) {
            console.error('Failed to save theme preference', e);
        }
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
