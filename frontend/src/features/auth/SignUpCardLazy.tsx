'use client'

import React, { useState, lazy, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import type { FormData, SignUpError, StepOneProps } from '../../types/signup';
import apiClient from '@/config/apiClient';

import { Card, CardBody, CardHeader, Progress, Input, Alert, CardFooter } from "@heroui/react";
import { RecoverLogo } from '@/app/Components/RecoverLogo';
import Button1 from '@/app/Components/ButtonC';
import { NavLink } from '@/app/Dashboard/Components/DashboardNavbar';
import { BackArrow } from '@/app/Components/BackArrow';

//lazy load the other components
const StepTwo = lazy(() => import('./StepTwo'));
const StepThree = lazy(() => import('./StepThree'));

//First step component - eagerly loaded
const StepOne: React.FC<StepOneProps> =({
    formData,
    handleInputChange,
    errors
}) => (
    <div>
        <p>Enter your email</p><br/>
        <Input 
            className='w-[100%] h-[50px] '
            radius='sm' 
            label='Email' 
            type='email'
            id='email'
            name='email'
            variant='bordered'
            value={formData.email}
            errorMessage='Please enter a valid email. Format: example@recover.com'
            onChange={handleInputChange}
            isInvalid={errors === null ? false : errors.field == 'email' ? true : false}
        />
    </div>
);

export default function SignUpCardLazy() {
    const router = useRouter();
    const [stage, setStage] = useState<number>(1);
    const [isLoading, setIsLoading]= useState<boolean>(false); // theres nothing currently to set is loading to true
    const [errors, setErrors] = useState<SignUpError | null>(null);

    const confirmPassword: string= '';

    const [formData, setFormData] = useState<FormData>({
        email: '',
        username: '',
        firstName: '',
        lastName: '',
        password: '',
        //companyId: '',
        role: 'Viewer',
    });

    const roles: string[] = [
        'Viewer',
        'Secretary',
        'Technician',
        'Project Manager',
        'Adjuster',
        'Client'
    ];

    // Progress bar values
    const progress: Record<number, number> = {
        1: 33,
        2: 66,
        3: 100,
    };

    const validateEmail = (value: string): boolean => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        return emailRegex.test(value);
    };

    //password validation
    const validatePassword = (password: string): boolean => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        return passwordRegex.test(password);
    };
    //stage validation with switch cases for error40 handling
    const validateStage = (): boolean => {
        switch (stage) {
            case 1:
                if (!validateEmail(formData.email)) {
                    setErrors({ message: 'Please enter a valid email address', field: 'email'});
                    return false;
                }
                break;
            case 2:
                if (!validatePassword(formData.password)) {
                    setErrors({ message: 'Password must be at least 8 characters with 1 uppercase, 1 lowervase, and 1 number', field: 'password'});
                    return false;
                }
                if (formData.password !== confirmPassword) {
                    setErrors({ message: 'Passwords do not match', field: 'confirmPassword'});
                    return false;
                }
                if (formData.username.length < 5) {
                    setErrors({message: 'Username must be at least 5 characters long', field: 'username'});
                    return false;
                }
                break;
            case 3:
                if (!formData.firstName) {
                    setErrors({ message: 'Please enter your first name', field: 'firstName'});
                    return false;
                }
                if (!formData.lastName) {
                    setErrors({ message: 'Please enter your last name', field: 'lastName'});
                    return false;
                }
                break;
            default:
                return false;
    };
    return true;
}
    //prefetch other steps
    const prefetchOtherSteps = () => {
        const prefetchStep = async () => {
            await Promise.all([
                import('./StepTwo'),
                import('./StepThree')
            ]);
        };

        if ('requestIdleCallback' in window) {
            window.requestIdleCallback(() => prefetchStep());
        } else {
            setTimeout(prefetchStep, 1000);
        }
    };

    React.useEffect(() => {
        prefetchOtherSteps();
    }, []);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement> | boolean, name?: string
    ): void => {
        if (typeof e === 'boolean' && name) {
        setFormData(prev => ({ ...prev, [name]: e }));
        } else if (e instanceof Object && 'target' in e) {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        } 
        setErrors(null);
    };

    const handleRoleChange = (role: string): void => {
        setFormData(prev => ({
            ...prev,
            role: role
        }));
        setErrors(null);
    }
    
    const handleNext = (): void => {
        if (validateStage()) {
            setStage(prev => prev + 1);
        }
    };
    
    const handleBack = (): void => {
        setStage(prev => prev - 1);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        if (validateStage()) {
            console.log(formData); // TODO remove this at a later date ---------------------------------------------------------------------------

            //event.preventDefault();
            
            try {
                const response = await apiClient.post('/signup', formData);

                console.log('Success: ', response);
            } catch (error) {
                console.log('Submission error: ', error)
                return 
            }
        
        
            router.push('./Login')
        
        }
    }

    const renderStep = (stage: number) => {
        switch (stage) {
            case 1:
                return (
                <StepOne 
                    formData={formData}
                    handleInputChange={handleInputChange}
                    errors={errors}
                />
                );
            case 2:
                return (
                <Suspense fallback={<div>Loading...</div>}>
                    <StepTwo 
                    formData={formData}
                    handleInputChange={handleInputChange}
                    errors={errors}
                    />
                </Suspense>
                );
            case 3:
                return (
                <Suspense fallback={<div>Loading...</div>}>
                    <StepThree 
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleRoleChange={handleRoleChange}
                    errors={errors}
                    roles={roles}
                    />
                </Suspense>
                );
            default:
                return null;
            }
    };

    return(
        <Card
            isBlurred
            className='border-8  w-[35vw] h-[40vw]'
            style={{backgroundColor: '#09090b', borderColor: '#090f21'}}
            shadow='md'
        >
            <CardHeader>
                <div className='w-[100%]'>
                    <div className='flex justify-center items-center'>
                        <RecoverLogo/>
                    </div> <br/>
                    <div>
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
                            <Button1 onPress={handleBack}>Back</Button1>
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
                <div className='mt-auto'>
                    {stage < 3 ? (
                        <Button1 
                            variant='ghost' 
                            className='!bg-transparent text-bold !text-green-500 w-[100%] h-[50px]' 
                            color='success' 
                            onPress={handleNext}
                            >
                                Next
                            </Button1>
                    ) : (
                        <Button1 color='success' isDisabled={isLoading} onPress={handleSubmit}>{isLoading ? 'Signing up...' : 'Sign Up'}</Button1>
                    )}
                </div>
            </CardFooter>
        </Card>
    )
}
