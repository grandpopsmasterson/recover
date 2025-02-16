'use client'

import React, { useState, lazy, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import type { SignupRequest, SignUpError, StepOneProps } from '../../types/signup';

import { Card, CardBody, CardHeader, Progress, Input, Alert, CardFooter, Button } from "@heroui/react";
import { BackArrow } from '@/components/ui/BackArrow';
import { RecoverLogo } from '@/components/ui/RecoverLogo';
import { NavLink } from '../dashboard/DashboardNavbar';
import Button1 from '@/components/ui/ButtonC';
import { WrapperNoHREF } from '@/components/ui/WrapperNoHREF';
import { validateEmail, validatePassword } from '@/api/utils/validation';
import { signupApi } from '@/api/authApi';



//lazy load the other components
const StepTwo = lazy(() => import('./StepTwo'));
const StepThree = lazy(() => import('./StepThree'));

//First step component - eagerly loaded
const StepOne: React.FC<StepOneProps> =({
    formData,
    handleInputChange,
    handleKeyDown,
    errors
}) => (
    <div>
        <p>Enter your email</p><br/>
        <Input 
            className='w-full h-[50px]'
            radius='sm' 
            label='Email' 
            type='email'
            id='email'
            name='email'
            color='secondary'
            variant='bordered'
            value={formData.email}
            errorMessage='Please enter a valid email. Format: example@recover.com'
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            isInvalid={errors === null ? false : errors.field == 'email' ? true : false}
        />
    </div>
);

export default function SignUpCard() {
    const router = useRouter();
    const [stage, setStage] = useState<number>(1);
    const [isLoading, setIsLoading]= useState<boolean>(false); // theres nothing currently to set is loading to true
    const [errors, setErrors] = useState<SignUpError | null>(null);

    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const [formData, setFormData] = useState<SignupRequest>({
        email: '',
        username: '',
        firstName: '',
        lastName: '',
        password: '',
        companyId: '',
        userType: 'Viewer',
    });

    const userType: string[] = [
        'Technician',
        'Manager',
        'Client',
        'Adjuster',
        'Secretary',
        'Viewer',
        'Editor'
    ];

    // Progress bar values
    const progress: Record<number, number> = {
        1: 33,
        2: 66,
        3: 100,
    };

    //stage validation with switch cases for error40 handling
    const validateStage = (stage: number): boolean => {
        switch (stage) {
            case 1:
                if (!validateEmail(formData.email)) {
                    setErrors({ message: 'Please enter a valid email address', field: 'email'});
                    return false;
                }
                break;
            case 2:
                if (!validatePassword(formData.password)) {
                    setErrors({ message: 'Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number', field: 'password'});
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
            if (name === 'confirmPassword') {
                setConfirmPassword(value)
                setErrors(prev => {
                    if (prev?.field === 'confirmPassword') {
                        return null;
                    }
                    return prev;
                    });
                }
            if (name === 'confirmPassword' && value !== formData.password) {
                setErrors({
                    field: 'confirmPassword',
                    message: 'Passwords do not match'
                });
            }
        }
        setErrors(null);
    };

    const makeUpper = (value: string) => {
        return value.toUpperCase();
    }

    const handleRoleChange = (userType: string): void => {
        setFormData(prev => ({
            ...prev,
            userType: makeUpper(userType)
            
        })); console.log(formData.userType)
        setErrors(null);
    }
    
    const handleNext = (): void => {
        if (validateStage(stage)) {
            setStage(prev => prev + 1);
        }
    };
    
    const handleBack = (): void => {
        setStage(prev => prev - 1);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            if (stage < 3) {
                handleNext();
            } else if (stage === 3) {
                handleSubmit();
            };
        };
    };
    

    const handleSubmit = async (event?: React.FormEvent) => { // event.preventDefault is not a function and never works???

        if (event){ event.preventDefault(); }

            if (validateStage(stage)) {
                console.log(formData); // TODO remove this at a later date ---------------------------------------------------------------------------
            
            try {
                const response = await signupApi.signup(formData);
                console.log('Success: ', response);
                router.push('./Login');
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
                    handleKeyDown={handleKeyDown}
                    errors={errors}
                />
                );
            case 2:
                return (
                <Suspense fallback={<div>Loading...</div>}>
                    <StepTwo 
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleKeyDown={handleKeyDown}
                    errors={errors}
                    confirmPassword={confirmPassword}
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
                    handleKeyDown={handleKeyDown}
                    errors={errors}
                    userType={userType}
                    />
                </Suspense>
                );
            default:
                return null;
            }
    };

    return(
        
    <form onSubmit={handleSubmit} className='h-[clamp(30rem,40vh+10rem,50rem)] w-[clamp(25rem,25vw+5rem,45rem)]'>
        <Card
            isBlurred
            className='border-[10px] bg-recovernavy border-slate-500 min-h-[30rem] rounded-xl h-auto bg-clip-padding overflow-hidden'
            shadow='md'
        >

            <CardHeader className='w-[100%] '>
                <div className='w-full'>
                    <div className='flex justify-center items-center'>
                        <RecoverLogo/>
                    </div> <br/>
                    <div className='w-[95%]'>
                        <Progress aria-label='Progress bar' color='secondary' size='sm' value={progress[stage]} />
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
            <CardBody className='flex flex-col'>
                {renderStep(stage)}
            </CardBody>
            <CardFooter>
                <div className='mt-auto w-full'>
                    {stage < 3 ? (
                        <Button1 
                            variant='ghost' 
                            className='!bg-transparent font-bold opacity-100 !text-white w-full h-[50px] mb-8' 
                            color='secondary' 
                            onPress={handleNext}
                            >
                                Next
                            </Button1>
                    ) : (
                        <Button 
                            color='secondary'
                            type='submit'
                            variant='bordered' 
                            isDisabled={isLoading} 
                            className='font-bold opacity-100 !text-white w-full h-[50px] mb-8 border-white hover:bg-purple-500'
                        >
                            {isLoading ? 'Signing up...' : 'Sign Up'}
                        </Button>
                    )}
                    <div className='flex justify-center'>
                        <p>Already have an account? <a className='text-purple-500 underline' href='./Login'>Sign in</a></p>
                    </div>
                </div>
            </CardFooter>
        </Card>
    </form>
    )
}
