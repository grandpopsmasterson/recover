import { Dispatch, SetStateAction } from "react";

export interface FilterProps {
    setDisplayType: (type: 'ListCard' | 'List' | 'Card') => void;
    selectedFilters: string[];
    setSelectedFilters: Dispatch<SetStateAction<string[]>>;
    pendingRemoval: string|null;
    setPendingRemoval: Dispatch<SetStateAction<string | null>>;
    //pendingSelection: string|null;
    setPendingSelection: Dispatch<SetStateAction<string | null>>;
    inputValue: string;
    setInputValue: Dispatch<SetStateAction<string>>;
}