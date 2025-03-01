'use client'

import { useState } from "react";
import { CreateProject, CreateProjectError, InsurerArray, LossTypeArray, ProjectStageArray } from "@/types/createProject";
import { Autocomplete, AutocompleteItem, Button, CheckboxGroup, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Link } from "@heroui/react";
import { CustomCheckbox } from "@/components/ui/CustomCheckbox";
import { validateDate, validateEmail, validatePhonenumber } from "@/api/utils/validation";
import { projectsApi } from "@/api/features/projectsApi";
import { useRouter } from "next/navigation";

export default function CreateProject() {
    // STATE SETTING
    const [stage, setStage] = useState<number>(0);
    const [errors, setErrors] = useState<CreateProjectError | null>(null);
    const [view, setView] = useState<'visible'|'exit-left'|'exit-right'|'entering-left'|'entering-right'>('visible');

    const [ownProperty, setOwnProperty] = useState<boolean>(false);
    const [policyInfo, setPolicyInfo] = useState<boolean>(false);
    const [claim, setClaim] = useState<boolean>(false);
    const [catastrophe, setCatastrophe] = useState<boolean>(false);
    //const [typeSelected, setTypeSelected] = useState<string>('')

    const router = useRouter();

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

    // LISTS FOR FIELDS

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

    const projStage: string[] = [
        'PENDING_SALE',
        'PRE_PRODUCTION',
        'ESTIMATION',
        'MITIGATION',
        'RECONSTRUCTION',
        'PENDING_INVOICE',
        'ACCOUNTS_RECEIVABLE',
        'COMPLETE',
    ];

    const insurers: InsurerArray[] = [
        {label: 'State Farm', key: 'State Farm'},
        {label: 'Berkshire Hathaway', key: 'Berkshire Hathaway'},
        {label: 'Progressive', key: 'Progressive'},
        {label: 'Allstate', key: 'Allstate'},
        {label: 'Liberty Mutual', key: 'Liberty Mutual'},
        {label: 'Travelers', key: 'Travelers'},
        {label: 'USAA', key: 'USAA'},
        {label: 'Chubb', key: 'Chubb'},
        {label: 'Nationwide Insurance', key: 'Nationwide Insurance'},
        {label: 'Farmers Insurance', key: 'Farmers Insurance'},
        {label: 'American Family Insurance', key: 'American Family Insurance'},
        {label: 'The Hartford', key: 'The Hartford'},
        {label: 'Fairfax Financial', key: 'Fairfax Financial'},
        {label: 'CNA', key: 'CNA'},
        {label: 'Erie Insurance', key: 'Erie Insurance'},
    ]

    // LOGIC

    const validateStage = (): boolean => {
            switch(stage) {
                case 0:
                    if (!formData.lossType) {
                        setErrors({ message: "Please select a loss type", field: 'lossType'});
                        return false;
                    };
                    if (!formData.lossDate) {
                        setErrors({ message: "Please enter the date of loss", field: 'lossDate'});
                        return false;
                    };
                    break;
                case 1:
                    if (!formData.streetAddress) {
                        setErrors({ message: 'Please enter a street address', field: 'streetAddress'});
                        return false;
                    }
                    if (!formData.city) {
                        setErrors({ message: 'Please enter a city', field: 'city'});
                        return false;
                    }
                    if (!formData.state) {
                        setErrors({ message: 'Please enter a state', field: 'state'});
                        return false;
                    }
                    if (!formData.zipcode) {
                        setErrors({ message: 'Please enter a zip code', field: 'zipcode'});
                        return false;
                    }
                    break;
                case 2:
                    if (ownProperty) {
                        if (!localForm.firstName) {
                            setErrors({ message: "Please enter the client's first name", field: 'firstName'});
                            return false;
                        }
                        if (!localForm.lastName) {
                            setErrors({ message: "Please enter the client's last name", field: 'lastName'});
                            return false;
                        }
                        if (!validatePhonenumber(formData.clientPhone)) {
                            setErrors({ message: 'Please enter a valid phone number', field: 'clientPhone'});
                            return false;
                        }
                        if (!validateEmail(formData.clientEmail)) {
                            setErrors({ message: 'Please enter a valid email', field: 'clientEmail'});
                            return false;
                        }
                    }
                    break;
                case 3:
                    if (formData.projectType == '') {
                        setErrors({ message: 'Please select a property type', field: 'projectType'});
                        return false;
                    }
                    break;
                case 4:
                    break;
                case 5:
                    if (policyInfo) {
                        if (formData.carrier == '') {
                            setErrors({ message: 'Please select an insurance carrier', field: 'carrier'});
                            return false;
                        }
                        if (!validateDate(formData.policyStart)) {
                            setErrors({ message: 'Please enter a valid policy start date', field: 'policyStart'});
                            return false;
                        }
                        if (!validateDate(formData.policyExpiration)) {
                            setErrors({ message: 'Please enter a valid policy expiration date', field: 'policyExpiration'});
                            return false;
                        } // TODO add something here to make sure the start date is not after the expiration date
                    }
                    break;
                case 6:
                    if (claim) {
                        if (!formData.claimNumber) {
                            setErrors({ message: 'Please enter a claim number', field: 'claimNumber'});
                            return false;
                        }
                    }
                    break;
                case 7:
                    if (catastrophe) {
                        if (!formData.catReference) {
                            setErrors({ message: 'Please enter the catastrophe name', field: 'catReference'});
                            return false;
                        }
                    }
                    break;
                case 8:
                    if (!formData.stage) {
                        setErrors({ message: 'Please select a stage, this will default to pending sale once projects have been more developed', field: 'stage'});
                        return false;
                    }
                    if (formData.scope == '') {
                        setErrors({ message: 'Please select the scope, this will change later in development', field: 'scope'});
                        return false;
                    }
            }
        return true;
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement> | boolean, name?: string
    ): void => {
        if (typeof e === 'boolean' && name) {

            setFormData(prev => ({ ...prev, [name]: e}));

        } else if (e instanceof Object && 'target' in e) {

            const { name, value, type, checked } = e.target as HTMLInputElement;
            setFormData(prev => ({ ...prev, [name]: type === 'checkbox' 
                ? checked 
                : value }));

            if (name === 'firstName' || name === 'lastName') {
                setLocalForm(prev => {
                    const newLocal = { ...prev, [name]: value };
                    setFormData(prevForm => ({
                        ...prevForm,
                        clientName: `${name === 'firstName' 
                            ? value 
                            : newLocal.firstName} ${name === 'lastName' 
                                ? value 
                                : newLocal.lastName}`.trim()
                    }));
                    return newLocal;
                });
                
                setErrors(prev => {
                    if (prev?.field === name) {
                        return null;
                    }
                    return prev;
                });
            } else {
            if (name === 'lossType') {
            }
        }
        setErrors(null);
    }};

    const makeUpper = (value:string) => {
        return value.toUpperCase();
    };

    const dateFormatter = (dateString: string) => {
        if (!validateDate(dateString)) {
            return dateString;
        };

        const [month, day, year] = dateString.split('/');
        return `${year}-${month}-${day}`;
    }

    const handleProjectTypeChange = (projectType: string, isSelected: boolean) => {
        if (isSelected) {
            setFormData(prev => ({
                ...prev,
                projectType: makeUpper(projectType)
            }));
        }
        setErrors(null);
    };

    const handleProjectScopeChange = (scope: string, isSelected: boolean) => {
        if (isSelected) {
            setFormData(prev => ({
                ...prev,
                scope: makeUpper(scope)
            }));
        }
        setErrors(null);
    }

    const handleStageChange = (projStage: string,): void => {
        setFormData(prev => ({
            ...prev,
            stage: projStage
        }));
        console.log(projStage);
        setErrors(null);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, stage: number) => {
        if (event.key === 'Enter') {
            if (stage < 8) {
                handleNext(stage);
            } else if (stage === 8) {
                handleSubmit();
            }
        }
    };

    const handleSubmit = async (event?: React.FormEvent) => {
            if (event){ event.preventDefault(); };
            if (validateStage()) {
                setErrors(null);
                //setIsLoading(true);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any -- need to clean out first and last name from the submission data
                const {firstName, lastName, ...submissionData} = formData as any;
                console.log(submissionData); 
                const apiFormData = {...submissionData};
                apiFormData.lossDate = dateFormatter(apiFormData.lossDate);
                apiFormData.policyStart = dateFormatter(apiFormData.policyStart);
                apiFormData.policyExpiration = dateFormatter(apiFormData.policyExpiration);
                try {
                    const response = await projectsApi.createProject(apiFormData);
                    console.log('Success: ', response);
                    router.push("/dashboard/ridgeline")
                    //setIsLoading(false)

                } catch (error) {
                    console.log('Submission error: ', error)
                    //setIsLoading(false)
                    return 
                }
            }; 
        };

    // ANIMATION FUNCTIONS

    const animate = (stage: number, direction: string) => {
        if (view !== 'visible') return;

        setView(direction === 'next' ? 'exit-left' : 'exit-right');

        setTimeout(() => {
            setStage(stage);
            setView(direction === 'next' ? 'entering-right' : 'entering-left');

            setTimeout(() => {
                setView('visible');
            }, 250)
        }, 250)
    };

    const handleNext = (stage: number) => {
        if (validateStage()){
            animate(stage, 'next');
        }
    };
    const handlePrev = (stage: number) => animate(stage, 'prev');

    const getAnimationClasses = () => {
        switch (view) {
            case 'exit-left':
                return '-translate-x-1/2 scale-90 opacity-0';
            case 'exit-right':
                return 'translate-x-1/2 scale-90 opacity-0';
            case 'entering-left':
                return '-translate-x-1/2 opacity-0';
            case 'entering-right':
                return 'translate-x-1/2 opacity-0';
            case 'visible':
                return 'translate-x-0 scale-100 opacity-100';
            default:
                return '';
        }
    };

    // STEPS FOR FORM

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
                            type="lossType"
                            id="lossType"
                            name="lossType"
                            value={formData.lossType}
                            label='Select the loss type'
                            variant="bordered"
                            color="primary"
                            onSelectionChange={(id) => setFormData({...formData, lossType: id?.toString() || ''})}
                            isInvalid={errors === null ? false : errors.field === 'lossType' ? true : false}
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
                            type="lossDate"
                            id="lossDate"
                            name="lossDate"
                            variant="bordered"
                            color="primary"
                            value={formData.lossDate}
                            errorMessage='Please enter a valid loss date'
                            description='Format: MM/DD/YYYY'
                            onChange={handleInputChange}
                            onKeyDown={(e) => handleKeyDown(e, 1)}
                            isInvalid={errors === null ? false : errors.field === 'lossDate' ? true : false}
                        />
                    </div>
                    <div className="pt-2 space-x-2">
                        <Button as={Link} href="/dashboard/ridgeline" >Back</Button>
                        <Button onPress={() => handleNext(1)}>Next</Button>
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
                            type="input"
                            id="streetAddress"
                            name="streetAddress"
                            variant="bordered"
                            color="primary"
                            value={formData.streetAddress}
                            errorMessage='Please enter a street address'
                            onChange={handleInputChange}
                            onKeyDown={(e) => handleKeyDown(e, 2)}
                            isInvalid={errors === null ? false : errors.field === 'streetAddress' ? true : false}
                        />
                        <div className="flex gap-2">
                            <Input 
                                className="w-1/3 h-[50px] text-black shadow-md"
                                classNames={{
                                    label: 'text-black'
                                }}
                                radius='md'
                                label='City'
                                type="input"
                                id="city"
                                name="city"
                                variant="bordered"
                                color="primary"
                                value={formData.city}
                                errorMessage='Please enter a city'
                                onChange={handleInputChange}
                                onKeyDown={(e) => handleKeyDown(e, 2)}
                                isInvalid={errors === null ? false : errors.field === 'city' ? true : false}
                            />
                            <Input 
                                className="w-1/3 h-[50px] text-black shadow-md"
                                classNames={{
                                    label: 'text-black'
                                }}
                                radius='md'
                                label='State'
                                type="input"
                                id="state"
                                name="state"
                                variant="bordered"
                                color="primary"
                                value={formData.state}
                                errorMessage='Please enter a state'
                                onChange={handleInputChange}
                                onKeyDown={(e) => handleKeyDown(e, 2)}
                                isInvalid={errors === null ? false : errors.field === 'state' ? true : false}
                            />
                            <Input 
                                className="w-1/3 h-[50px] text-black shadow-md"
                                classNames={{
                                    label: 'text-black'
                                }}
                                radius='md'
                                label='Zipcode'
                                type="input"
                                id="zipcode"
                                name="zipcode"
                                variant="bordered"
                                color="primary"
                                value={formData.zipcode}
                                errorMessage='Please enter a zipcode'
                                onChange={handleInputChange}
                                onKeyDown={(e) => handleKeyDown(e, 2)}
                                isInvalid={errors === null ? false : errors.field === 'zipcode' ? true : false}
                            />
                        </div>
                    </div>
                    <div className="pt-2 space-x-2">
                        <Button onPress={() => handlePrev(0)}>Back</Button>
                        <Button onPress={() => handleNext(2)}>Next</Button>
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
                                    type="input"
                                    id="firstName"
                                    name="firstName"
                                    variant="bordered"
                                    color="primary"
                                    value={localForm.firstName}
                                    errorMessage='Please enter your first name'
                                    onChange={handleInputChange}
                                    onKeyDown={(e) => handleKeyDown(e, 3)}
                                    isInvalid={errors === null ? false : errors.field == 'firstName' ? true : false}
                                />
                                <Input 
                                    className="w-1/2 h-[50px] text-black shadow-md"
                                    classNames={{
                                        label: 'text-black'
                                    }}
                                    radius='md'
                                    label='Last name'
                                    type="input"
                                    id="lastName"
                                    name="lastName"
                                    variant="bordered"
                                    color="primary"
                                    value={localForm.lastName}
                                    errorMessage='Please enter your last name'
                                    onChange={handleInputChange}
                                    onKeyDown={(e) => handleKeyDown(e, 3)}
                                    isInvalid={errors === null ? false : errors.field == 'lastName' ? true : false}
                                />
                            </div>
                            <Input 
                                className="w-full h-[50px] text-black shadow-md"
                                classNames={{
                                    label: 'text-black'
                                }}
                                radius='md'
                                label='Phone number'
                                type="input"
                                id="clientPhone"
                                name="clientPhone"
                                variant="bordered"
                                color="primary"
                                value={formData.clientPhone}
                                errorMessage='Please enter your phone number'
                                onChange={handleInputChange}
                                onKeyDown={(e) => handleKeyDown(e, 3)}
                                isInvalid={errors === null ? false : errors.field == 'clientPhone' ? true : false}
                            />
                            <Input 
                                className="w-full h-[50px] text-black shadow-md"
                                classNames={{
                                    label: 'text-black'
                                }}
                                radius='md'
                                label='Email'
                                type="input"
                                id="clientEmail"
                                name="clientEmail"
                                variant="bordered"
                                color="primary"
                                value={formData.clientEmail}
                                errorMessage='Please enter your email'
                                onChange={handleInputChange}
                                onKeyDown={(e) => handleKeyDown(e, 3)}
                                isInvalid={errors === null ? false : errors.field == 'clientEmail' ? true : false}
                            />
                        </div>
                        ): (
                            <></>
                        )
                    }
                    <div className="pt-2 space-x-2">
                        <Button onPress={() => handlePrev(1)}>Back</Button>
                        <Button onPress={() => handleNext(3)}>Next</Button>
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
                    <div>
                    <CheckboxGroup
                    className="gap-1"
                    label='Select property type'
                    orientation="horizontal"
                    errorMessage='Please select the property type'
                    isInvalid={errors === null ? false : errors.field === 'projectType' ? true : false}
                >
                    {projectType.map((type: string) => (
                        <CustomCheckbox
                        key={type}
                        value={type}
                        isSelected={formData.projectType === makeUpper(type)}                         
                        onChange={(isSelected) => handleProjectTypeChange(type, isSelected)}
                    >
                            {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
                        </CustomCheckbox>
                    ))}
                </CheckboxGroup>
                    </div>
                    <div className="pt-2 space-x-2">
                        <Button onPress={() => handlePrev(2)}>Back</Button>
                        <Button onPress={() => handleNext(5)}>Next</Button>
                    </div>
                </div>
            )
        },
        {
            stage: 4, //TODO FIGURE OUT --------------------------------
            id: 'insuranceUsage',
            title: 'Are you using insurance?',
            component: () => (
                <div>
                    <div>Are you using insurance? LEAVE THIS OFF AND SKIP THIS STAGE</div>
                    How did you get here?
                    <div>Residential</div>
                    <div>Commercial</div>
                    <div>Industrial</div>
                    <Button onPress={() => handlePrev(3)}>Back</Button>
                </div>
            )
        },
        {
            stage: 5,
            id: 'policyInfo',
            title: 'Do you have your policy information?',
            component: () => (
                <div className="space-y-4">
                    <div>Do you have your policy information?</div>
                    <div className="space-y-4 space-x-2">
                        <Button isDisabled>No</Button>
                        <Button onPress={() => setPolicyInfo(true)}>Yes</Button>
                    </div>
                    <div>
                        {policyInfo ? (
                            <div className="space-y-4">
                                <Autocomplete
                                    allowsCustomValue={true}
                                    className=""
                                    defaultItems={insurers}
                                    label='Select the insurance carrier'
                                    variant="bordered"
                                    color="primary"
                                    onSelectionChange={(id) => setFormData({...formData, carrier: id?.toString() || ''})}
                                >
                            {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
                        </Autocomplete>
                                <div className="flex space-x-2">
                                    <Input 
                                        className="w-1/2 h-[50px] text-black"
                                        classNames={{
                                            label: 'text-black'
                                        }}
                                        radius='md'
                                        label='Policy start date'
                                        type="input"
                                        id="policyStart"
                                        name="policyStart"
                                        variant="bordered"
                                        color="primary"
                                        value={formData.policyStart}
                                        errorMessage='Please enter a valid start date'
                                        description='Format: MM/DD/YYYY'
                                        onChange={handleInputChange}
                                        onKeyDown={(e) => handleKeyDown(e, 6)}
                                        isInvalid={errors === null ? false : errors.field == 'policyStart' ? true : false}
                                    />
                                    <Input 
                                        className="w-1/2 h-[50px] text-black"
                                        classNames={{
                                            label: 'text-black'
                                        }}
                                        radius='md'
                                        label='Policy end date'
                                        type="input"
                                        id="policyExpiration"
                                        name="policyExpiration"
                                        variant="bordered"
                                        color="primary"
                                        value={formData.policyExpiration}
                                        errorMessage='Please enter a valid expiration date'
                                        description='Format: MM/DD/YYYY'
                                        onChange={handleInputChange}
                                        onKeyDown={(e) => handleKeyDown(e, 6)}
                                        isInvalid={errors === null ? false : errors.field == 'policyExpiration' ? true : false}
                                    />
                                </div>
                            </div>
                        )
                        :(
                            <></>
                        )}
                        
                    </div>
                    <div className="pt-2 space-x-2">
                        <Button onPress={() => handlePrev(3)}>Back</Button>
                        <Button onPress={() => handleNext(6)}>Next</Button>
                    </div>
                </div>
            )
        },
        {
            stage: 6,
            id: 'claimInfo',
            title: 'Have you filed a claim?',
            component: () => (
                <div className="space-y-4">
                    <div>Have you filed a claim?</div>
                        <div className="space-y-4 space-x-2">
                            <Button isDisabled>No</Button>
                            <Button onPress={() => setClaim(true)}>Yes</Button>
                        </div>
                    <div>
                        {claim ? (
                            <Input 
                                className="w-1/2 h-[50px] text-black"
                                classNames={{
                                    label: 'text-black'
                                }}
                                radius='md'
                                label='Claim number'
                                type="claimNumber"
                                id="claimNumber"
                                name="claimNumber"
                                variant="bordered"
                                color="primary"
                                value={formData.claimNumber}
                                errorMessage='Please enter a valid claimNumber'
                                onChange={handleInputChange}
                                onKeyDown={(e) => handleKeyDown(e, 7)}
                                isInvalid={errors === null ? false : errors.field === 'claimNumber' ? true : false}
                            />
                        ) : (
                            <></>
                        )}
                    </div>
                    <div className="pt-2 space-x-2">
                        <Button onPress={() => handlePrev(5)}>Back</Button>
                        <Button onPress={() => handleNext(7)}>Next</Button>
                    </div>
                </div>
            )
        },
        {
            stage: 7,
            id: 'catReference',
            title: 'Was this due to a catastrophe?',
            component: () => (
                <div className="space-y-4">
                    <div>Was this due to a catastrophe?</div>
                        <div className="space-y-4 space-x-2">
                            <Button isDisabled>No</Button>
                            <Button onPress={() => setCatastrophe(true)}>Yes</Button>
                        </div>
                        <div>
                            {catastrophe ? (
                                <div>
                                    <Input 
                                        className="w-full h-[50px] text-black"
                                        classNames={{
                                            label: 'text-black'
                                        }}
                                        radius='md'
                                        label='Enter catastrophe'
                                        type="catReference"
                                        id="catReference"
                                        name="catReference"
                                        variant="bordered"
                                        color="primary"
                                        value={formData.catReference}
                                        errorMessage='Please enter a valid catastrophe?'
                                        onChange={handleInputChange}
                                        onKeyDown={(e) => handleKeyDown(e, 8)}
                                        isInvalid={errors === null ? false : errors.field === 'catReference' ? true : false}
                                    />
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    <div className="pt-2 space-x-2">
                        <Button onPress={() => handlePrev(6)}>Back</Button>
                        <Button onPress={() => handleNext(8)}>Next</Button>
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
                    <Dropdown>
                    <DropdownTrigger>
                        <Button color="success">
                            {formData.stage.replace(/_/g, ' ').toLowerCase().replace(/(^|\s)([a-z])/g, (_, space: string, letter: string) => space + letter.toUpperCase()) || "Select stage"}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                    className=" border-2 border-recovernavy rounded-md"
                        //style={{background: '#09090b', border: '5px solid #090f21', borderRadius: '5px'}}
                        onAction={(key) => handleStageChange(key.toString())}
                    >
                        {projStage.map((stage: string) => (
                            <DropdownItem
                                key={stage}
                            >
                                {stage.replace(/_/g, ' ').toLowerCase().replace(/(^|\s)([a-z])/g, (_, space: string, letter: string) => space + letter.toUpperCase())}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
                    <div>
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
                            isSelected={formData.scope === makeUpper(scope)}
                            onChange={(isSelected) => handleProjectScopeChange(scope, isSelected)}
                        >
                                {scope.charAt(0).toUpperCase() + scope.slice(1).toLowerCase()}
                            </CustomCheckbox>
                        ))}
                    </CheckboxGroup>
                    </div>
                    {/* After this we will send the data but use the 200 response for assigning users (use daves assign users component) */}
                    <div className="pt-2 space-x-2">
                        <Button onPress={() => handlePrev(7)}>Back</Button>
                        <Button type="submit">Submit</Button>
                        <Button onPress={() => console.log(formData)}>Log form data</Button>
                    </div>
                </div>
            )
        },
    ];

    return (
    
        <div className="flex justify-center items-center h-full -mt-12 overflow-hidden">
            <form onSubmit={handleSubmit}
                className={`
                    transition-all
                    duration-250
                    ease-in-out
                    ${getAnimationClasses()}
                `}
            >
                {steps[stage].component()}
            </form>
        </div>
    )
}