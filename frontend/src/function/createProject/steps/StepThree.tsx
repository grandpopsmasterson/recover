import { CustomCheckbox } from "@/components/ui/CustomCheckbox";
import { StepThreeProps } from "@/types/createProject";
import { CheckboxGroup, DatePicker, Input } from "@heroui/react";
import { getLocalTimeZone, today } from "@internationalized/date";
import { useEffect, useState } from "react";


export default function StepThree({ scope, lossType, formData, handleInputChange, handleKeyDown, errors, setErrors }: StepThreeProps) {
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [selectedDate, setSelectedDate] = useState<any>(today);
    const [selectedValues, setSelectedValues] = useState<Set<string>>(new Set());
    const [selectedValuesScope, setSelectedValuesScope] = useState<Set<string>>(new Set());
        
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (value: any) => {
        setSelectedDate(value);
    }
    useEffect(() => {
        formData.lossDate = selectedDate.toString();
        console.log(selectedDate.toString())
    }, [selectedDate, formData])

    const handleCheckChange = (value: string, isSelected: boolean) => {
        const newSelectedValues = new Set(selectedValues);
        
        if (isSelected) {
            newSelectedValues.add(value);
        } else {
            newSelectedValues.delete(value);
        }
        
        setSelectedValues(newSelectedValues);
        // Convert Set to array and join for formData
        formData.lossType = Array.from(newSelectedValues).join(', ');
        setErrors(null);
        
        console.log('Selected values:', Array.from(newSelectedValues)); // Debug log
    }

    const handleCheckChangeScope = (value: string, isSelected: boolean) => {
        const newSelectedValues = new Set(selectedValuesScope);
        
        if (isSelected) {
            newSelectedValues.add(value);
        } else {
            newSelectedValues.delete(value);
        }
        
        setSelectedValuesScope(newSelectedValues);
        // Convert Set to array and join for formData
        formData.scope = Array.from(newSelectedValues).join(', ');
        setErrors(null);
        
        console.log('Selected values:', Array.from(newSelectedValues)); // Debug log
    }

    return (
        <div>
            <div className="space-y-2 w-full -mt-4">
                <p className="text-white">Loss information</p>
                <DatePicker //TODO Deal with this bs -- close to scrapping all the date pickers and making them inputs and we can just regex the shit out of them
                    label='Loss date'
                    labelPlacement="outside"
                    id="lossDate"
                    name="lossDate"
                    variant="bordered"
                    className="border-white text-white"
                    classNames={{
                        label: 'text-white',
                        segment: '!text-white',
                        timeInput: '!text-white'
                    }}
                    color="secondary"
                    value={selectedDate}
                    onChange={handleChange}
                    maxValue={today(getLocalTimeZone())}
                />
                <div className="w-full">
                    <CheckboxGroup
                        className="gap-2 flex flex-wrap"
                        label='Select loss type'
                        orientation="horizontal"
                        errorMessage='Please select a loss type'
                        isInvalid={errors === null ? false : errors.field === 'lossType' ? true : false}
                    >
                        {lossType.map((type: string) => (
                            <CustomCheckbox
                                key={type}
                                value={type}
                                isSelected={selectedValues.has(type)}
                                onChange={(isSelected) => handleCheckChange(type, isSelected)}
                        >
                                {type}
                            </CustomCheckbox>
                        ))}
                    </CheckboxGroup>
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <CheckboxGroup
                        className="gap-1"
                        label='Select scope'
                        orientation="horizontal"
                        errorMessage='Please select the scope'
                        isInvalid={errors === null ? false : errors.field === 'scope' ? true : false}
                    >
                        {scope.map((scope: string) => (
                            <CustomCheckbox
                            key={scope}
                            value={scope}
                            isSelected={selectedValuesScope.has(scope)}
                            onChange={(isSelected) => handleCheckChangeScope(scope, isSelected)}
                        >
                                {scope}
                            </CustomCheckbox>
                        ))}
                    </CheckboxGroup>
                </div> <br/>
                <Input 
                    className='w-[30vw]'
                    label='Catastrophe reference'
                    type='catReference'
                    id='catReference'
                    name='catReference'
                    variant='bordered'
                    value={formData.catReference}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
            </div>
        </div>
    )
}