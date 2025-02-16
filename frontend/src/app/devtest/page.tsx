"use client"
import { SearchIcon } from '@/components/ui/icons/SearchIcon';
//import Button1 from "@/components/ui/ButtonC";
//import {useRouter} from "next/navigation"

import { Autocomplete, AutocompleteItem, AutocompleteSection, Chip } from '@heroui/react'
import { useEffect, useState } from 'react';
//import './../../images/house1.png';
// const recoverGreen = "#4ade80";



export default function Devtest() {

  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [pendingSelection, setPendingSelection] = useState<string | null>(null);
  const [pendingRemoval, setPendingRemoval] = useState<string | null>(null);
  //const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (pendingSelection && !selectedFilters.includes(pendingSelection)) {
      setSelectedFilters(prev => [...prev, pendingSelection]);
      setInputValue('');
      setPendingSelection(null);
      //setIsOpen(false);
    }
  }, [pendingSelection, selectedFilters]);

  const handleSelectionChange = (value: string) => {
    if (value) {
      setPendingSelection(value);

    }
  };

  useEffect(() => {
    if (pendingRemoval) {
      setSelectedFilters(prev => prev.filter(filter => filter !== pendingRemoval));
      setPendingRemoval(null);
    }
  }, [pendingRemoval, selectedFilters]);

  const removeFilter = (filterToRemove: string) => {
    setPendingRemoval(filterToRemove);
  };

  
  const filters = [
    {name: 'Technicians', group: 'Group' },
    {name: 'Tommy Technician', group: 'Technician' },
    {name: 'Flags', group: 'Group' },
    {name: 'Flags: Urgent', group: 'Flags' },
    {name: 'Flags: Action Needed', group: 'Flags' },
    {name: 'Flags: Up to Date', group: 'Flags' },
    {name: 'Invoice', group: 'Group' },
    {name: 'Invoice Pending', group: 'Invoice' },
    {name: 'Invoice Sent', group: 'Invoice' },
    {name: 'Estimate', group: 'Group' },
    {name: 'Estimate Pending', group: 'Estimate' },
    {name: 'Estimate Complete', group: 'Estimate' },
  ]

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="h-1/6 w-1/6 bg-recovernavy">
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
    </div>
    </div>
  );
}