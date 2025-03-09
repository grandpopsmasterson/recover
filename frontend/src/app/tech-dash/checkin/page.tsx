'use client'
import { DocusignForm } from '@/components/docusign/Docusign';
import { CustomCheckbox } from '@/components/ui/CustomCheckbox';
import { forms } from '@/types/docusign';
import { CheckInType, MicroForm } from '@/types/techDash';
import { Button } from '@heroui/button';
import { Checkbox, CheckboxGroup, Input } from '@heroui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react';

export default function Checkin() {
    const [count, setCount] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const [selectedForm, setSelectedForm] = React.useState<string | null>(null);

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [selectedValuesScope, setSelectedValuesScope] = useState<Set<string>>(new Set());

    const placeHolderData = {
        firstName: "first",
        lastName: 'last',
        email: 'email'
    }

    const [formData, setFormData] = useState<CheckInType>({
        checkIn: false,
        photo: null,
        scopeAndCarrier: false,
        workAuth: null,
    });
    const [microForm, setMicroForm] = useState<MicroForm>({
        carrier: 'Farmers',
        scope: 'Mitigation, Contents'
    })

    const router = useRouter();
    const scope: string[] = ['Mitigation', 'Restoration', 'Contents']

    const handleCheckboxCheckIn = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, checkIn: e.target.checked});
    }
    const handleCheckboxScopeAndCarrier = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, scopeAndCarrier: e.target.checked});
        console.log(formData.scopeAndCarrier)
    }
    const handleCarrierChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMicroForm({...microForm, carrier: e.target.value});
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
        microForm.scope = Array.from(newSelectedValues).join(', ');
        setError(null);
        
        console.log('Selected values:', Array.from(newSelectedValues)); // Debug log
    };

    const handleSave = () => {
        setIsEditing(false); // TODO make an api call to send the data to the db
    };

    const onComplete = () => {
        setSelectedForm(null);
        //TODO navigate to next section???
    }

    const steps = [
        {
            id: 'check-in',
            title: 'Check In',
            component: () => (
                <div className='space-y-4'>
                    <h1>Greet the customer and confirm you are at the right place</h1>
                    <Checkbox isSelected={formData.checkIn} onChange={handleCheckboxCheckIn}>
                        Confirm
                    </Checkbox>
                </div>
            )
        },
        {
            id: 'housePhoto',
            title: 'House Photo',
            component: () => (
                <div className='space-y-4'>
                    <h1>Take a frontal photo of the work site</h1>
                    <input 
                        type="file" 
                        id='imageCapture'
                        accept='image/*'
                        capture='environment'
                        onChange={handlePhotoChange}
                    />
                    {formData.photo && <Image 
                                            src={formData.photo} 
                                            alt='Captured'
                                            width={200} 
                                            height={200}
                                            className='mt-[10px]' 
                                            />}
                </div>
            )
        },
        {
            id: 'scopeCarrierConfirm',
            title: 'Confirm Scope and Carrier',
            component: () => (
                <div className='space-y-4'>
                    {isEditing 
                        ? ( 
                            <div>
                                <Input 
                                    className='text-black'
                                    value={microForm.carrier}
                                    onChange={handleCarrierChange}
                                    label='Carrier'
                                    variant='bordered'
                                />
                                <CheckboxGroup
                                    className="gap-1"
                                    label='Select scope'
                                    orientation="horizontal"
                                    // errorMessage='Please select the scope'
                                    // isInvalid={errors === null ? false : errors.field === 'scope' ? true : false}
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
                            </div>
                        )
                        : (
                            <div>
                                <h1>Confirm scope and carrier for work authorization</h1>
                                <p>Carrier: {microForm.carrier}</p>
                                <p>Scope: {microForm.scope}</p>
                            </div>
                        )}
                    {isEditing 
                        ? <Button onPress={handleSave}>Save</Button> 
                        : <Button onPress={() => setIsEditing(true)}>Edit</Button>
                    }
                    <Checkbox isSelected={formData.scopeAndCarrier} onChange={handleCheckboxScopeAndCarrier}>
                        Confirm
                    </Checkbox>
                </div>
            )
        },
        {
            id: 'workAuth',
            title: 'Docusign for work authorizatrion',
            component: () => (
                <div className='space-y-4'>
                    <h1>Select a work authentication to sign</h1>
                    {selectedForm ? (
                        <DocusignForm 
                        clientInfo={placeHolderData}
                        formId={selectedForm}
                        onComplete={() => {
                            setSelectedForm(null);
                            onComplete();
                        }}
                        />
                    ) : (
                        <div className='space-y-4'>
                            {forms.map(form => (
                                <Button
                                key={form.id}
                                className="w-full px-4 py-2 text-left border rounded hover:bg-gray-100"
                                onPress={() => setSelectedForm(form.id)}
                                >
                                    {form.name}
                                </Button>
                            ))}
                        </div>
                    )
                    }
                </div>
            )
        }
    ];

    const handlePhotoChange = ( event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setFormData({...formData, photo: imageUrl});
        };
    };
    
    const testButton = () => {
        console.log(formData);
    }

    const handleNext = () => {
        setCount(count + 1);
    };
    const handleBack = () => {
        setCount(count - 1);
    };
    const handleSubmit = () => {
        console.log(formData);
        router.push('/tech-dash/inspection');
    };
    const handleHome = () => {
        router.push('/tech-dash');
    };

    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            {steps[count].component()}
            <div>
            {count === 0
                ? (
                    <Button onPress={handleHome}>Return</Button>
                )
                : (
                    <Button onPress={handleBack}>Back</Button>
                )
            }
            {count < 3 
                ? (
                    <Button onPress={handleNext}>Next</Button>
                )
                : (
                    <Button onPress={handleSubmit}>Start Inspection</Button>
                )
            }
            <Button onPress={testButton}>Log form data</Button>
            </div>
        </div>
    )
}