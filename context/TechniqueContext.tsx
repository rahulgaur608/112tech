import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { techniques as initialTechniques, Technique } from '../data/techniques';

interface TechniqueContextType {
    techniques: Technique[];
    isLoading: boolean;
    updateTechnique: (updatedTechnique: Technique) => Promise<void>;
    resetTechniques: () => Promise<void>;
}

const TechniqueContext = createContext<TechniqueContextType | undefined>(undefined);

export const STORAGE_KEY = 'ancient-awareness-techniques-v1';

export function TechniqueProvider({ children }: { children: React.ReactNode }) {
    const [techniques, setTechniques] = useState<Technique[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadTechniques();
    }, []);

    const loadTechniques = async () => {
        try {
            const storedData = await AsyncStorage.getItem(STORAGE_KEY);
            if (storedData) {
                setTechniques(JSON.parse(storedData));
            } else {
                // Seed with initial data
                setTechniques(initialTechniques);
                await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initialTechniques));
            }
        } catch (error) {
            console.error('Failed to load techniques:', error);
            // Fallback to initial data if loading fails
            setTechniques(initialTechniques);
        } finally {
            setIsLoading(false);
        }
    };

    const updateTechnique = async (updatedTechnique: Technique) => {
        let previousTechniques: Technique[] | null = null;
        try {
            let newTechniques: Technique[] = [];
            setTechniques(prev => {
                previousTechniques = prev;
                newTechniques = prev.map(t =>
                    t.id === updatedTechnique.id ? updatedTechnique : t
                );
                return newTechniques;
            });
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newTechniques));
        } catch (error) {
            console.error('Failed to save technique:', error);
            if (previousTechniques) {
                setTechniques(previousTechniques);
            }
        }
    };

    const resetTechniques = async () => {
        try {
            setTechniques(initialTechniques);
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initialTechniques));
        } catch (error) {
            console.error('Failed to reset techniques:', error);
        }
    };

    return (
        <TechniqueContext.Provider value={{ techniques, isLoading, updateTechnique, resetTechniques }}>
            {children}
        </TechniqueContext.Provider>
    );
}

export function useTechniques() {
    const context = useContext(TechniqueContext);
    if (context === undefined) {
        throw new Error('useTechniques must be used within a TechniqueProvider');
    }
    return context;
}
