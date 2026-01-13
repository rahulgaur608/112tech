import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { ReactNode } from 'react';
import { useTheme } from '../context/ThemeContext';

interface ScreenBackgroundProps {
    children?: ReactNode;
    style?: StyleProp<ViewStyle>;
    className?: string;
}

export default function ScreenBackground({ children, style, className }: ScreenBackgroundProps) {
    const { isDarkMode } = useTheme();

    const colors = isDarkMode
        ? ['#1A1A1A', '#2C3632', '#1A1A1A'] as const // Charcoal Dark
        : ['#FFF9F0', '#FFFFFF', '#FFF9F0'] as const; // Cream Light

    return (
        <LinearGradient
            colors={colors as any}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.container, style]}
            className={className}
        >
            {children}
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
