"use client"

import { CardDisplay } from '@/components/ui/icons/CardDisplay';
import { ListCardDisplay } from '@/components/ui/icons/ListCardDisplay';
import { ListDisplay } from '@/components/ui/icons/ListDisplay';
import { SearchIcon } from '@/components/ui/icons/SearchIcon';
import { FilterProps } from '@/types/dashboard';
import { filters } from '@/types/project';
import { Autocomplete, AutocompleteItem, AutocompleteSection, Button, Chip } from '@heroui/react'
import { useEffect } from 'react';

export default function FilterComponent({
    setDisplayType, 
    selectedFilters, 
    setSelectedFilters, 
    setPendingRemoval, 
    pendingRemoval, 
    setPendingSelection, 
    inputValue, 
    setInputValue
}: FilterProps) {

    //const [selectedFilters, setSelectedFilters] = useState<string[]>(['Stage']);
    // const [inputValue, setInputValue] = useState<string>('');
    // const [pendingSelection, setPendingSelection] = useState<string | null>(null);
    // const [pendingRemoval, setPendingRemoval] = useState<string | null>(null);
    // const [groupedProjects, setGroupedProjects] = useState<GroupedProjects>({}); // this will be used to map out the card groups
    // const [isLoading, setIsLoading] = useState<boolean>(false);
    // const [error, setError] = useState<FilterError|string|null>(null);
    //const [isOpen, setIsOpen] = useState<boolean>(false);

    // const fetchProjects = async (filters: string[]) => {
    //     setIsLoading(true);
    //     setError(null);
    //     try {
    //         const data = await filterApi.getGroupedProjects(filters);
    //         setGroupedProjects(data);
    //         console.log(data);
    //     } catch (error) {
    //         setError(error instanceof Error ? error.message : 'An error occurred');
    //         console.error('Error fetching projects: ', error);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // }

    // useEffect(() => {
    //     const debounceTimeout = setTimeout(() => {
    //         fetchProjects(selectedFilters);
    //     }, 300);
    //     return () => clearTimeout(debounceTimeout);
    // }, [selectedFilters]);

    // useEffect(() => {
    //     if (pendingSelection && !selectedFilters.includes(pendingSelection)) {
    //     setSelectedFilters(prev => [...prev, pendingSelection]);
    //     setInputValue('');
    //     setPendingSelection(null);
    //     //setIsOpen(false);
    //     }
    // }, [pendingSelection, selectedFilters]);

    const handleSelectionChange = (value: string) => {
        if (value) {
        setPendingSelection(value);

        }
    };

    useEffect(() => {
        if (pendingRemoval) {
        setSelectedFilters((prev: string[]) => prev.filter((filter: string) => filter !== pendingRemoval));
        setPendingRemoval(null);
        }
    }, [pendingRemoval, setSelectedFilters, setPendingRemoval, selectedFilters]);

    const removeFilter = (filterToRemove: string) => {
        setPendingRemoval(filterToRemove);
    };

    
    

    return (
        <div >
            <div className="h-full w-full pt-2 flex">
                <Autocomplete
                // data-open={isOpen}
                onSelectionChange={(value) => handleSelectionChange(value as string)}
                inputValue={inputValue}
                onInputChange={(value) => setInputValue(value)}
                aria-label="Select an employee"
                className='p-4'
                classNames={{
                    base: "max-w-xs",
                    listboxWrapper: "max-h-[320px]",
                    selectorButton: "text-default-500",
                }}
                // defaultItems={filters}
                inputProps={{
                    classNames: {
                    input: "ml-1",
                    inputWrapper: "h-[48px]",
                    },
                }}
                listboxProps={{
                    hideSelectedIcon: true,
                    itemClasses: {
                    base: [
                        "rounded-medium",
                        "text-black",
                        "transition-opacity",
                        "data-[hover=true]:text-purple-500",
                        "dark:data-[hover=true]:bg-default-50",
                        "data-[pressed=true]:opacity-70",
                        "data-[hover=true]:bg-default-200",
                        "data-[selectable=true]:focus:bg-default-100",
                        "data-[focus-visible=true]:ring-default-500",
                    ],
                    },
                }}
                placeholder="Enter filters"
                popoverProps={{
                    offset: 10,
                    classNames: {
                    base: "rounded-large",
                    content: "p-1 border-small border-default-100 bg-background",
                    },
                }}
                radius="full"
                startContent={<SearchIcon className="text-default-400" size={20} strokeWidth={2.5} />}
                variant="bordered"
                >
                    <AutocompleteSection showDivider title='Group'>
                    {filters.map((item) => (
                        item.group == 'Group' 
                        ? (
                            
                            <AutocompleteItem key={item.name} textValue={item.name}>
                                <div className="flex justify-between items-center">
                                <div className="flex gap-2 items-center">
                                    
                                    <div className="flex flex-col">
                                    <span className="text-small">{item.name}</span>
                                    </div>
                                </div>
                        
                                </div>
                            </AutocompleteItem>
                            
                        )
                        : (<></>)
                    ))}
                    </AutocompleteSection>
                    <AutocompleteSection showDivider title='Values'>
                    {filters.map((item) => (
                        item.group !== 'Group' 
                        ? (
                            
                            <AutocompleteItem key={item.name} textValue={item.name}>
                                <div className="flex justify-between items-center">
                                <div className="flex gap-2 items-center">
                                    
                                    <div className="flex flex-col">
                                    <span className="text-small">{item.name}</span>
                                    <span className="text-xs">{item.group}</span>
                                    </div>
                                </div>
                        
                                </div>
                            </AutocompleteItem>
                            
                        )
                        : (<></>)
                    ))}
                    </AutocompleteSection>
                </Autocomplete>
                <div className='space-x-2 space-y-2'>
                    {selectedFilters.map((filter) => <Chip key={filter} onClose={() => removeFilter(filter) }>{filter}</Chip>)}
                </div>
                <div>
                    <Button className='p-1 m-0 gap-0 !min-w-0 w-[25px] h-[25px] bg-red-400 rounded-md' onPress={() => setDisplayType('ListCard')}>
                        <ListCardDisplay  />
                    </Button>
                </div>
                <div>
                <Button className='p-1 m-0 gap-0 !min-w-0 w-[25px] h-[25px] bg-red-400 rounded-md' onPress={() => setDisplayType('Card')}>
                    <CardDisplay />
                    </Button>
                </div>
                <div>
                <Button className='p-1 m-0 gap-0 !min-w-0 w-[25px] h-[25px] bg-red-400 rounded-md' onPress={() => setDisplayType('List')}>
                    <ListDisplay />
                    </Button>
                </div>
            </div>
        </div>
    );
}