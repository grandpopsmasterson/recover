'use client'

import { validateEmail, validatePhonenumber } from "@/api/utils/validation";
import { RecoverLogo } from "@/components/ui/RecoverLogo";
import { CreateProject, CreateProjectError, StepOneProps } from "@/types/createProject";
import { Alert, Card, CardBody, CardFooter, CardHeader, Input, Progress } from "@heroui/react";
import { useRouter } from "next/navigation";
import { lazy, useEffect, useState } from "react";
import { NavLink } from "../dashboard/DashboardNavbar";
import { BackArrow } from "@/components/ui/BackArrow";
import { WrapperNoHREF } from "@/components/ui/WrapperNoHREF";
import Button1 from "@/components/ui/ButtonC";

// Lazy loading the other components
const StepTwo = lazy(() => import('./StepTwo'));
const StepThree = lazy(() => import('./StepThree'));
const StepFour = lazy(() => import('./StepFour'));
const StepFive = lazy(() => import('./StepFive'));

// Eager loading of the first step
const StepOne: React.FC<StepOneProps> =({
    firstName,
    lastName,
    formData,
    handleInputChange,
    errors,
    handleKeyDown
}) => (
    <div>
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
            type="email"
            id="email"
            name="email"
            variant="bordered"
            value={formData.clientEmail}
            errorMessage='Please enter client&apos;s email'
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            isInvalid={errors === null ? false : errors.field == 'email' ? true : false}
        />
        <Input 
            className="w-[100%] h-[50px]"
            radius="sm"
            label='Phone Number'
            type="phoneNumber"
            id="phoneNumber"
            name="phoneNumber"
            variant="bordered"
            value={formData.clientPhone}
            errorMessage='Please enter client&apos;s phone number'
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            isInvalid={errors === null ? false : errors.field == 'phoneNumber' ? true : false}
        />
    </div>
);

export default function MainCard() {
    const router = useRouter();
    const [stage, setStage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<CreateProjectError | null>(null);

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');

    const [formData, setFormData] = useState<CreateProject>({
        projectName: '',
        lossDate: '',
        clientName: firstName + ' ' + lastName,
        clientEmail: '',
        clientPhone: '',
        streetAddress: '',
        city: '',
        state: '',
        zipcode: 0,
        stage: 1,
        projectType: '',
        carrier: '',
        assignedUser: '',
        catReference: '',
        lossType: '',
        scope: '',
        claimNumber: 0,
        policyExpiration: '',
        policyStartDate: '',
        yearBuilt: 0,
        office: ''
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
                if (!firstName) {
                    setErrors({ message: "Please enter client's first name", field: 'firstName'});
                    return false;
                };
                if (!lastName) {
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
                    //continue from here
                }
        }
        return true;
    }

    //prefetch the other steps
    const prefetchOtherSteps = () => {
        const prefetchStep = async () => {
            await Promise.all([
                import('./StepTwo'),
                import('./StepThree'),
                import('./StepFour'),
                import('./StepFive')
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
            if (name === 'firstName') {
                setFirstName(value)
                setErrors( prev => {
                    if (prev?.field === 'firstName') {
                        return null;
                    }
                    return prev;
                });
            };
            if (name === 'lastName') {
                setLastName(value)
                setErrors( prev => {
                    if (prev?.field === 'lastName') {
                        return null;
                    }
                    return prev;
                });
            };
        }
        setErrors(null);
    };

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
            setStage(prev => prev + 1);
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
            console.log(formData) // TODO CREATE CREATE PROJECT API AND INSERT LOGIC HERE
            router.push('./Dashboard') //? maybe to send to step 2- work auths?? or to project page?? straight back to dash????
        };
    };

    const renderStep = (stage: number) => {
        switch (stage) {
            case 1:
                return (
                    <StepOne 
                        formData={formData}
                        firstName={firstName}
                        lastName={lastName}
                        handleInputChange={handleInputChange}
                        handleKeyDown={handleKeyDown}
                        errors={errors}
                    />
                ) // TODO add other steps in here!
            default:
                return null;
        };
    };

    return (
        <div className='w-[100%] h-[100%]'>
            <form onSubmit={handleSubmit}>
        <Card
            
            isBlurred
            className='border-10  w-[35vw] h-[40vw]'
            style={{backgroundColor: '#09090b', border: '10px solid #090f21'}}
            shadow='md'
        >
            <CardHeader className='w-[100%]'>
                <div className='w-[35vw]'>
                    <div className='flex justify-center items-center'>
                        <RecoverLogo/>
                    </div> <br/>
                    <div className='w-[95%]'>
                        <Progress aria-label='Progress bar' size='sm' value={progress[stage]} />
                    </div> <br/>
                    <div className='flex gap-4'>
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
                    <p className='w-[10vw]'>Step {stage} of 3</p>
                    {errors === null ? '' : errors.field == 'server' ? (
                        <Alert color='default' hideIconWrapper variant='bordered' className={'bg-transparent color-red'} title={errors.message} /> 
                    ) : ''} 
                    </div>
                </div>
            </CardHeader>
            <CardBody>
                {renderStep(stage)}
            </CardBody>
            <CardFooter>
                <div className='mt-auto w-[35vw] mb-16'>
                    {stage < 3 ? (
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
                            {isLoading ? 'Signing up...' : 'Sign Up'}
                        </Button1>
                    )}
                    <div className='flex justify-center pt-4'>
                        <p>Already have an account? <a className='text-green-500 underline' href='./Login'>Sign in</a></p>
                    </div>
                </div>
            </CardFooter>
        </Card>
        </form>
        </div>
    )
}