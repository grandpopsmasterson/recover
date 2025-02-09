import { StepFourProps } from "@/types/createProject";
import { DatePicker, Input } from "@heroui/react";
import { today } from "@internationalized/date";
import { useEffect, useState } from "react";


export default function StepFour({formData, errors, handleInputChange, handleKeyDown}: StepFourProps) {
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [selectedDateYearBuilt, setSelectedDateYearBuilt] = useState<any>(today);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [selectedDatePolicyStart, setSelectedDatePolicyStart] = useState<any>(today);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [selectedDatePolicyExp, setSelectedDatePolicyExp] = useState<any>(today);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChangeYearBuilt = (value: any) => {
        setSelectedDateYearBuilt(value);
    }
    useEffect(() => {
        formData.yearBuilt = selectedDateYearBuilt.toString();
        console.log(selectedDateYearBuilt.toString());
    }, [selectedDateYearBuilt, formData])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChangePolicyStart = (value: any) => {
        setSelectedDatePolicyStart(value);
    }
    useEffect(() => {
        formData.policyStart = selectedDatePolicyStart.toString();
        console.log(selectedDatePolicyStart.toString());
    }, [selectedDatePolicyStart, formData])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChangePolicyExp = (value: any) => {
        setSelectedDatePolicyExp(value);
        formData.policyExpiration = selectedDatePolicyExp.toString();
        console.log(selectedDatePolicyExp.toString());
    }
    useEffect(() => {
        formData.policyStart = selectedDatePolicyExp.toString();
        console.log(selectedDatePolicyExp.toString());
    }, [selectedDatePolicyExp, formData])

    return (
        <div>
            <div className="space-y-4">
                <p>Insurance Information</p>
                <DatePicker 
                    classNames={{
                        calendar: "dark bg-zinc-950 border-2", // border-2 for thicker border
                        popoverContent: "dark bg-zinc-950",
                        innerWrapper: "dark bg-zinc-950",
                         // Try this one too
                        timeInput: "hover:bg-green-500 data-[selected=true]:bg-green-500",
                        helperWrapper: "dark bg-zinc-950",
                    }}
                    color="success"
                    //style={{backgroundColor: '#09090b', border: '10px solid #090f21'}}
                    label='Year built'
                    labelPlacement="outside"
                    granularity="year" //TODO false this is fine ignore me
                    id="yearBuilt"
                    name="yearBuilt"
                    variant="bordered"
                    value={selectedDateYearBuilt}
                    onChange={handleChangeYearBuilt}
                />
                <Input 
                    className='w-[30vw]' 
                    color="success"
                    label='Carrier' 
                    type='carrier'
                    id='carrier'
                    name='carrier'
                    variant='bordered'
                    value={formData.carrier}
                    onChange={handleInputChange}
                    errorMessage={errors?.message}
                    onKeyDown={handleKeyDown}
                    isInvalid={errors === null ? false : errors.field == 'carrier' ? true : false}
                />
                <DatePicker  //TODO add functionality so users can not set start date after end date
                    label='Policy start date'
                    color="success"
                    labelPlacement="outside"
                    id="policyStart"
                    name="policyStart"
                    variant="bordered"
                    value={selectedDatePolicyStart}
                    onChange={handleChangePolicyStart}
                    classNames={{
                        calendar: "dark bg-zinc-950 border-2", // border-2 for thicker border
                        popoverContent: "dark bg-zinc-950",
                        innerWrapper: "dark bg-zinc-950",
                         // Try this one too
                        timeInput: "hover:bg-green-500 data-[selected=true]:bg-green-500",
                        helperWrapper: "dark bg-zinc-950",
                    }}
                />
                <DatePicker //TODO add functionality so users can not set end date before start date
                    label='Policy expiration date'
                    color="success"
                    labelPlacement="outside"
                    id="policyExpiration"
                    name="policyExpiration"
                    variant="bordered"
                    value={selectedDatePolicyExp}
                    onChange={handleChangePolicyExp}
                    classNames={{
                        calendar: "dark bg-zinc-950 border-2", // border-2 for thicker border
                        popoverContent: "dark bg-zinc-950",
                        innerWrapper: "dark bg-zinc-950",
                         // Try this one too
                        timeInput: "hover:bg-green-500 data-[selected=true]:bg-green-500",
                        helperWrapper: "dark bg-zinc-950",
                    }}
                />
                <Input 
                    className='w-[30vw]' 
                    color="success"
                    label='Claim number' 
                    type='claimNumber'
                    id='claimNumber'
                    name='claimNumber'
                    variant='bordered'
                    value={formData.claimNumber}
                    onChange={handleInputChange}
                    errorMessage={errors?.message}
                    onKeyDown={handleKeyDown}
                    isInvalid={errors === null ? false : errors.field == 'claimNumber' ? true : false}
                />
            </div>
        </div>
    )
}