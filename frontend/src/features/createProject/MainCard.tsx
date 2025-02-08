'use client'

import { validateEmail, validatePhonenumber } from "@/api/utils/validation";
import { RecoverLogo } from "@/components/ui/RecoverLogo";
import { CreateProject, CreateProjectError, StepOneProps } from "@/types/createProject";
import { Alert, Card, CardBody, CardFooter, CardHeader, Input, Progress } from "@heroui/react";
import { useRouter } from "next/navigation";
import { lazy, Suspense, useEffect, useState } from "react";
import { NavLink } from "../dashboard/DashboardNavbar";
import { BackArrow } from "@/components/ui/BackArrow";
import { WrapperNoHREF } from "@/components/ui/WrapperNoHREF";
import Button1 from "@/components/ui/ButtonC";

// Lazy loading the other components
const StepTwo = lazy(() => import('./steps/StepTwo'));
const StepThree = lazy(() => import('./steps/StepThree'));
const StepFour = lazy(() => import('./steps/StepFour'));
const StepFive = lazy(() => import('./steps/StepFive'));

// Eager loading of the first step
const StepOne: React.FC<StepOneProps> =({
    firstName,
    lastName,
    formData,
    handleInputChange,
    errors,
    handleKeyDown
}) => (
    <div className="space-y-4">
        <p>Client Information</p>
        <Input 
            className="w-[50%] h-[50px]"
            radius="sm"
            label='First name'
            type="firstName"
            id="firstName"
            name="firstName"
            variant="bordered"
            value={firstName}
            errorMessage='Please enter client&apos;s first name'
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            isInvalid={errors === null ? false : errors.field == 'firstName' ? true : false}
        />
        <Input 
            className="w-[50%] h-[50px]"
            radius="sm"
            label='Last name'
            type="lastName"
            id="lastName"
            name="lastName"
            variant="bordered"
            value={lastName}
            errorMessage='Please enter client&apos;s last name'
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            isInvalid={errors === null ? false : errors.field == 'lastName' ? true : false}
        />
        <Input 
            className="w-[100%] h-[50px]"
            radius="sm"
            label='Email'
            type="clientEmail"
            id="clientEmail"
            name="clientEmail"
            variant="bordered"
            value={formData.clientEmail}
            errorMessage='Please enter client&apos;s email'
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            isInvalid={errors === null ? false : errors.field == 'clientEmail' ? true : false}
        />
        <Input 
            className="w-[100%] h-[50px]"
            radius="sm"
            label='Phone Number'
            type="clientPhone"
            id="clientPhone"
            name="clientPhone"
            variant="bordered"
            value={formData.clientPhone}
            errorMessage='Please enter client&apos;s phone number'
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            isInvalid={errors === null ? false : errors.field == 'clientPhone' ? true : false}
        />
    </div>
);

export default function MainCard() {
    const router = useRouter();
    const [stage, setStage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<CreateProjectError | null>(null);
    //sliging animation state
    const [slideDirection, setSlideDirection] = useState<string>('');
const [currentContent, setCurrentContent] = useState<React.ReactNode | null>(null);

    const [localForm, setLocalForm] = useState({
        firstName: '',
        lastName: ''
    })

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
        stage: 1,
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
        'Other'
    ];
    
    const lossType: string[] = [
        'Fire',
        'Clean Water - Cat 1',
        'Grey Water - Cat 2',
        'Black Water - Cat 3',
        'Wind',
        'Mold',
        'Chemical',
        'Structural'
    ]

    const scope: string[] = [
        'Mitigation',
        'Contents',
        'Reconstruction'
    ]

    const progress: Record<number, number> = {
        1: 20,
        2: 40,
        3: 60,
        4: 80,
        5: 100
    };

    const validateStage = (): boolean => {
        switch(stage) {
            case 1:
                if (!localForm.firstName) {
                    setErrors({ message: "Please enter client's first name", field: 'firstName'});
                    return false;
                };
                if (!localForm.lastName) {
                    setErrors({ message: "Please enter client's last name", field: 'lastName'});
                    return false;
                };
                if (!validateEmail(formData.clientEmail)) {
                    setErrors({ message: 'Please enter a valid email address', field: 'email'});
                    return false;
                };
                if (!validatePhonenumber(formData.clientPhone)) {
                    setErrors({ message: 'Please enter a valid phone number'});
                    return false;
                }
                break;
            case 2:
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
                if (!formData.projectType) {
                    setErrors({ message: 'Please choose a project type', field: 'projectType'});
                    return false;
                }
                break;
            case 3:
                if (!formData.lossDate) {
                    setErrors({ message: 'Please select a loss date', field: 'lossDate'});
                    return false;
                }
                if (formData.lossType == '') {
                    setErrors({ message: 'Please select a loss type', field: 'lossType'});
                    return false;
                }
                if (formData.scope == '') {
                    setErrors({ message: 'Please select your scope', field: 'scope'});
                    return false;
                }
                break;
            case 4:
                if (!formData.yearBuilt) {
                    setErrors({ message: 'Please enter the year the property was built', field: 'yearBuilt'});
                    return false;
                }
        }
        return true;
    }

    //prefetch the other steps
    const prefetchOtherSteps = () => {
        const prefetchStep = async () => {
            await Promise.all([
                import('./steps/StepTwo'),
                import('./steps/StepThree'),
                import('./steps/StepFour'),
                import('./steps/StepFive')
            ]);
        };
        if ('requestIdleCallback' in window) {
            window.requestIdleCallback(() => prefetchStep());
        } else {
            setTimeout(prefetchStep, 1000);
        }
    };

    useEffect(() => { prefetchOtherSteps(); })

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement> | boolean, name?: string
    ): void => {
        if (typeof e === 'boolean' && name) {
            setFormData(prev => ({ ...prev, [name]: e}));
        } else if (e instanceof Object && 'target' in e) {
            const { name, value, type, checked } = e.target as HTMLInputElement;
            setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
            if (name === 'firstName' || name === 'lastName') {
                setLocalForm(prev => {
                    const newLocal = { ...prev, [name]: value };
                    setFormData(prevForm => ({
                        ...prevForm,
                        clientName: `${name === 'firstName' ? value : newLocal.firstName} ${name === 'lastName' ? value : newLocal.lastName}`.trim()
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

    // formatting for the enums when being sent to the backend
    const makeUpper = (value: string) => {
        return value.toUpperCase();
    };

    const handleProjectTypeChange = (projectType: string): void => {
        setFormData(prev => ({
            ...prev,
            projectType: makeUpper(projectType)
        }));
        setErrors(null); //? is this necessary???
    }

    const handleNext = (): void => {
        if (validateStage()) {
            setSlideDirection('slide-out-left');
            setTimeout(() => {
                setStage(prev => prev + 1);
                setSlideDirection('slide-in-right');
            }, 300);
        };
    };

    const handleBack = (): void => {
        setStage(prev => prev - 1);
    };

    const handleHome = (): void => {
        router.push('./Dashboard');
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            if (stage < 5) {
                handleNext();
            } else if (stage === 5) {
                handleSubmit();
            };
        };
    };

    const handleSubmit = async (event?: React.FormEvent) => {
        if (event){ event.preventDefault(); };
        if (validateStage()) {
            setErrors(null);
            setIsLoading(true);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any -- need to clean out first and last name from the submission data
            const {firstName, lastName, ...submissionData} = formData as any;
            console.log(submissionData) // TODO CREATE CREATE PROJECT API AND INSERT LOGIC HERE
            //router.push('./Dashboard') //? maybe to send to step 2- work auths?? or to project page?? straight back to dash????
        };
    };

    const renderStep = (stage: number) => {
        switch (stage) {
            case 1:
                return (
                    <StepOne 
                        formData={formData}
                        firstName={localForm.firstName}
                        lastName={localForm.lastName}
                        handleInputChange={handleInputChange}
                        handleKeyDown={handleKeyDown}
                        errors={errors}
                    />
                );
            case 2:
                return (
                    <Suspense fallback={<div>Loading...</div>}>
                        <StepTwo 
                            projectType={projectType}
                            formData={formData}
                            errors={errors}
                            handleInputChange={handleInputChange}
                            handleKeyDown={handleKeyDown}
                            handleProjectTypeChange={handleProjectTypeChange}
                        />
                    </Suspense>
                );
            case 3:
                return (
                    <Suspense fallback={<div>Loading...</div>}>
                        <StepThree 
                            scope={scope}
                            lossType={lossType}
                            formData={formData}
                            errors={errors}
                            handleInputChange={handleInputChange}
                            handleKeyDown={handleKeyDown}
                            setErrors={setErrors}
                        />
                    </Suspense>
                );
            case 4:
                return (
                    <Suspense fallback={<div>Loading...</div>}>
                        <StepFour 
                            formData={formData}
                            errors={errors}
                            handleInputChange={handleInputChange}
                            handleKeyDown={handleKeyDown}
                        />
                    </Suspense>
                );
            case 5:
                return (
                    <Suspense fallback={<div>Loading...</div>}>
                        <StepFive 
                        
                        />
                    </Suspense>
                )
            default:
                return null;
        };
    };

    return (
        <div className='w-[100%] h-[100%]'>
            <form onSubmit={handleSubmit}>
                <div className="relarive overflow-hidden">
                    <div
                        className={`transform transition-all duration-500 ease-in-out
                            ${slideDirection === 'slide-out-left' ? '-translate-x-full' : ''}
                            ${slideDirection === 'slide-in-right' ? 'translate-x-0' : ''}
                            ${slideDirection === 'initial' ? 'translate-x-0' : ''}`}
                    >
        <Card
            className={`border-10 w-[40vw] h-[40vw] max-w-[40vw]`}
            style={{backgroundColor: '#09090b', border: '10px solid #090f21'}}
            shadow='md'
        >
            <CardHeader className='w-[100%]'>
                <div className='w-[35vw]'>
                    <div className='flex justify-center items-center'>
                        <RecoverLogo/>
                    </div> <br/>
                    <div className='w-[95%]'>
                        <Progress aria-label='Progress bar' color="success" size='sm' value={progress[stage]} />
                    </div> <br/>
                    <div className='grid grid-cols-[auto_1fr] items-center relative gap-4'>
                        <div className="flex items-center gap-4">
                        {stage === 1 && (
                                <NavLink
                                    href='/'
                                >
                                    <BackArrow />
                                </NavLink>
                            )}
                            {stage > 1 && ( 
                                <WrapperNoHREF onPress={handleBack}>
                                    <BackArrow />
                                    </WrapperNoHREF>
                            )}
                        <p className='w-[10vw]'>Step {stage} of 5</p>
                    </div>
                    {errors === null ? '' : errors.field == 'server' ? (
                        <Alert color='default' hideIconWrapper variant='bordered' className={'bg-transparent color-red'} title={errors.message} /> 
                    ) : ''} 
                    <h1 className="absolute left-1/2 transform -translate-x-1/2 text-xl whitespace-nowrap">Create a project</h1>
                    </div>
                </div>
            </CardHeader>
            <CardBody className="flex w-full flex-col">
                {renderStep(stage)}
            </CardBody>
            <CardFooter>
                <div className='mt-auto w-[35vw] mb-16'>
                    {stage < 4 ? (
                        <Button1 
                            variant='ghost' 
                            className='!bg-transparent font-bold opacity-100 text-white w-full h-[50px] mb-8' 
                            color='success' 
                            onPress={handleNext}
                            >
                                Next
                            </Button1>
                    ) : (
                        <Button1 
                            color='success'
                            type='submit'
                            variant='ghost' 
                            isDisabled={isLoading} 
                            className='!bg-transparent font-bold opacity-100 text-white w-full h-[50px] mb-8'
                        >
                            {isLoading ? 'Creating Project...' : 'Create Project'}
                        </Button1>
                    )}
                </div>
            </CardFooter>
        </Card>
        </div>
        </div>
        </form>
        </div>
    )
}