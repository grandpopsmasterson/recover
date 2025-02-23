'use client'

import { useState } from "react";
import { CreateProject, LossTypeArray, ProjectStageArray } from "@/types/createProject";
import { Autocomplete, AutocompleteItem, Button, Input, Link } from "@heroui/react";

export default function CreateProject() {

    const [stage, setStage] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);

    const [ownProperty, setOwnProperty] = useState<boolean>(false);

    const [localForm, setLocalForm] = useState({
        firstName: '',
        lastName:'',
    });

    const [formData, setFormData] = useState<CreateProject>({
            projectName: '',
            lossDate: '',
            clientName: '',
            clientEmail: '',
            clientPhone: '',
            streetAddress: '',
            city: '',
            state: '',
            zipcode: '',
            stage: '',
            projectType: '',
            carrier: '',
            //assignedUser: '',
            catReference: '',
            lossType: '',
            scope: '',
            claimNumber: '0',
            policyExpiration: '',
            policyStart: '',
            yearBuilt: 0,
            //office: ''
        });

        const projectType: string[] = [
            'Residential',
            'Commercial',
            'Industrial',
        ];

        const lossType: LossTypeArray[] = [ 
        {label: 'Fire', key: 'FIRE'},
        {label: 'Water', key: 'WATER'},
        {label: 'Wind', key: 'WIND'},
        {label: 'Mold', key: 'MOLD'},
        {label: 'Chemical', key: 'CHEMICAL'},
        {label: 'Structural', key: 'STRUCTURAL'},
        ];

        const scope: string[] = [
            'MITIGATION',
            'CONTENTS',
            'RECONSTRUCTION'
        ];
    
        const projStage: ProjectStageArray[] = [
            {label: 'Pending Sale', key:'PENDING_SALE'},
            {label: 'Pre-Production', key:'PRE_PRODUCTION'},
            {label: 'Estimation', key:'ESTIMATION'},
            {label: 'Mitigation', key:'MITIGATION'},
            {label: 'Reconstruction', key:'RECONSTRUCTION'},
            {label: 'Pending Invoice', key:'PENDING_INVOICE'},
            {label: 'Accounts Recievable', key:'ACCOUNTS_RECEIVABLE'},
            {label: 'Complete', key:'COMPLETE'},
        ];

        const progress: Record<number, number> = {
            1: 20,
            2: 40,
            3: 60,
            4: 80,
            5: 100
        };

        const steps = [
            {
                stage: 0,
                id: 'loss',
                title: 'What happened?',
                component: () => (
                    <div className="space-y-4">
                        <div>What happened?</div>
                        <div>
                            <Autocomplete
                                allowsCustomValue={true}
                                className=""
                                defaultItems={lossType}
                                label='Select the loss type'
                                variant="bordered"
                                color="primary"
                                onSelectionChange={(id) => setFormData({...formData, lossType: id.toString()})}
                            >
                                {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
                            </Autocomplete>
                        </div>
                        <div>
                            <Input 
                                className="w-1/2 h-[50px] text-black"
                                classNames={{
                                    label: 'text-black'
                                }}
                                radius='md'
                                label='Date of loss'
                                type="text"
                                id="lossDate"
                                name="lossDate"
                                variant="bordered"
                                color="primary"
                                value={formData.lossDate}
                                errorMessage='Please enter a valid loss date'
                                description='Format: MM/DD/YYYY'
                                // TODO onChange={}
                                // TODO onKeyDown={}
                                // TODO isInvald={}
                            />
                        </div>
                        <div className="pt-2 space-x-2">
                            <Button as={Link} href="/dashboard/ridgeline" >Back</Button>
                            <Button onPress={() => setStage(1)}>Next</Button>
                        </div>
                    </div>
                )
            },
            {
                stage: 1,
                id: 'location',
                title: 'Where did the loss occurr?',
                component: () => (
                    <div className="space-y-4">
                        <div>Where did the loss occurr?</div>
                        <div className="space-y-4" >
                            <Input 
                                className="w-full h-[50px] text-black shadow-md"
                                classNames={{
                                    label: 'text-black'
                                }}
                                radius='md'
                                label='Street Address'
                                type="text"
                                id="streetAddress"
                                name="streetAddress"
                                variant="bordered"
                                color="primary"
                                value={formData.streetAddress}
                                errorMessage='Please enter a street address'
                                // TODO onChange={}
                                // TODO onKeyDown={}
                                // TODO isInvald={}
                            />
                            <div className="flex gap-2">
                                <Input 
                                    className="w-1/3 h-[50px] text-black shadow-md"
                                    classNames={{
                                        label: 'text-black'
                                    }}
                                    radius='md'
                                    label='City'
                                    type="text"
                                    id="city"
                                    name="city"
                                    variant="bordered"
                                    color="primary"
                                    value={formData.city}
                                    errorMessage='Please enter a city'
                                    // TODO onChange={}
                                    // TODO onKeyDown={}
                                    // TODO isInvald={}
                                />
                                <Input 
                                    className="w-1/3 h-[50px] text-black shadow-md"
                                    classNames={{
                                        label: 'text-black'
                                    }}
                                    radius='md'
                                    label='State'
                                    type="text"
                                    id="state"
                                    name="state"
                                    variant="bordered"
                                    color="primary"
                                    value={formData.state}
                                    errorMessage='Please enter a state'
                                    // TODO onChange={}
                                    // TODO onKeyDown={}
                                    // TODO isInvald={}
                                />
                                <Input 
                                    className="w-1/3 h-[50px] text-black shadow-md"
                                    classNames={{
                                        label: 'text-black'
                                    }}
                                    radius='md'
                                    label='Zipcode'
                                    type="text"
                                    id="zipcode"
                                    name="zipcode"
                                    variant="bordered"
                                    color="primary"
                                    value={formData.zipcode}
                                    errorMessage='Please enter a zipcode'
                                    // TODO onChange={}
                                    // TODO onKeyDown={}
                                    // TODO isInvald={}
                                />
                            </div>
                        </div>
                        <div className="pt-2 space-x-2">
                            <Button onPress={() => setStage(0)}>Back</Button>
                            <Button onPress={() => setStage(2)}>Next</Button>
                        </div>
                    </div>
                )
            },
            {
                stage: 2,
                id: 'ownerInfo',
                title: 'Does the customer own the property?',
                component: () => (
                    <div className="space-y-2">
                        <div>Does the customer own the property?</div>
                        <div>
                            <Button isDisabled>No</Button>
                            <Button onPress={() => setOwnProperty(true)}>Yes</Button>
                        </div>
                        {ownProperty ? (
                            <div className="space-y-2">
                                <div className="flex space-x-2">
                                    <Input 
                                        className="w-1/2 h-[50px] text-black shadow-md"
                                        classNames={{
                                            label: 'text-black'
                                        }}
                                        radius='md'
                                        label='First name'
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        variant="bordered"
                                        color="primary"
                                        value={localForm.firstName}
                                        errorMessage='Please enter your first name'
                                        // TODO onChange={}
                                        // TODO onKeyDown={}
                                        // TODO isInvald={}
                                    />
                                    <Input 
                                        className="w-1/2 h-[50px] text-black shadow-md"
                                        classNames={{
                                            label: 'text-black'
                                        }}
                                        radius='md'
                                        label='Last name'
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        variant="bordered"
                                        color="primary"
                                        value={localForm.lastName}
                                        errorMessage='Please enter your last name'
                                        // TODO onChange={}
                                        // TODO onKeyDown={}
                                        // TODO isInvald={}
                                    />
                                </div>
                                <Input 
                                    className="w-full h-[50px] text-black shadow-md"
                                    classNames={{
                                        label: 'text-black'
                                    }}
                                    radius='md'
                                    label='Phone number'
                                    type="text"
                                    id="clientPhone"
                                    name="clientPhone"
                                    variant="bordered"
                                    color="primary"
                                    value={formData.clientPhone}
                                    errorMessage='Please enter your phone number'
                                    // TODO onChange={}
                                    // TODO onKeyDown={}
                                    // TODO isInvald={}
                                />
                                <Input 
                                    className="w-full h-[50px] text-black shadow-md"
                                    classNames={{
                                        label: 'text-black'
                                    }}
                                    radius='md'
                                    label='Email'
                                    type="text"
                                    id="clientEmail"
                                    name="clientEmail"
                                    variant="bordered"
                                    color="primary"
                                    value={formData.clientEmail}
                                    errorMessage='Please enter your email'
                                    // TODO onChange={}
                                    // TODO onKeyDown={}
                                    // TODO isInvald={}
                                />
                            </div>
                            ): (
                                <></>
                            )
                        }
                        <div className="pt-2 space-x-2">
                            <Button onPress={() => setStage(1)}>Back</Button>
                            <Button onPress={() => setStage(3)}>Next</Button>
                        </div>
                    </div>
                )
            },
            {
                stage: 3,
                id: 'propertyType',
                title: 'What is the type of property?',
                component: () => (
                    <div>
                        <div>What is the type of property?</div>
                        <div>Residential</div>
                        <div>Commercial</div>
                        <div>Industrial</div>
                    </div>
                )
            },
            {
                stage: 4,
                id: 'insuranceUsage',
                title: 'Are you using insurance?',
                component: () => (
                    <div>
                        <div>Are you using insurance? LEAVE THIS OFF AND SKIP THIS STAGE</div>
                        <div>Residential</div>
                        <div>Commercial</div>
                        <div>Industrial</div>
                    </div>
                )
            },
            {
                stage: 5,
                id: 'policyInfo',
                title: 'Do you have your policy information?',
                component: () => (
                    <div>
                        <div>Do you have your policy information?</div>
                        <div>No (Disabled)</div>
                        <div>Yes</div>
                        <div>If yes
                            <div>Carrier</div>
                            <div>Policy Start Date</div>
                            <div>Policy End Date</div>
                        </div>
                    </div>
                )
            },
            {
                stage: 6,
                id: 'claimInfo',
                title: 'Have you filed a claim?',
                component: () => (
                    <div>
                        <div>Have you filed a claim?</div>
                        <div>No (Disabled)</div>
                        <div>Yes</div>
                        <div>If yes
                            <div>Claim number</div>
                        </div>
                    </div>
                )
            },
            {
                stage: 7,
                id: 'catReference',
                title: 'Was this due to a catastrophe?',
                component: () => (
                    <div>
                        <div>Was this due to a catastrophe?</div>
                        <div>No</div>
                        <div>Yes</div>
                        <div>If yes
                            <div>Cat reference</div>
                        </div>
                    </div>
                )
            },
            {
                stage: 8,
                id: 'developmentFields',
                title: 'Development fields',
                component: () => (
                    <div>
                        <div>Development fields for manipulation and testing of data</div>
                        <div>Set stage</div>
                        <div>Set scope</div>
                        After this we will send the data but use the 200 response for assigning users (use daves assign users component)
                    </div>
                )
            },
        ];




    return (
        <div className="flex flex-col justify-center items-center min-h-full">
            {steps[stage].component()}
        </div>
    )
}