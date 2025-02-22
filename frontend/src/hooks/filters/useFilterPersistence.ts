// hooks/useFilterPersistence.ts
import { useState, useEffect, Dispatch, SetStateAction } from 'react';

const FILTER_STORAGE_KEY = 'dashboard_filters';
const DEFAULT_FILTERS = ['Stage'];

export const useFilterPersistence = () => {
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load filters from localStorage on mount
    useEffect(() => {
        const savedFilters = localStorage.getItem(FILTER_STORAGE_KEY);
        if (savedFilters !== null) {
            setSelectedFilters(JSON.parse(savedFilters));
        } else {
            setSelectedFilters(DEFAULT_FILTERS);
        }
        setIsInitialized(true);
    }, []);

    // Wrap the setState function to also update localStorage
    const updateFilters: Dispatch<SetStateAction<string[]>> = (value) => {
        const newFilters = typeof value === 'function' 
            ? value(selectedFilters) 
            : value;
        
        setSelectedFilters(newFilters);
        localStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(newFilters));
    };

    return {
        selectedFilters,
        setSelectedFilters: updateFilters,
        isInitialized
    };
};

// Example type for FilterComponent props
interface FilterProps {
    setDisplayType: (type: 'ListCard' | 'List' | 'Card') => void;
    selectedFilters: string[];
    setSelectedFilters: Dispatch<SetStateAction<string[]>>;
    pendingRemoval: string | null;
    setPendingRemoval: (value: string | null) => void;
    setPendingSelection: (value: string | null) => void;
    inputValue: string;
    setInputValue: (value: string) => void;
}