'use client'

import { useRouter } from 'next/navigation';
import React, { lazy, Suspense, useRef, useState } from 'react';
import type { SignUpError, SignupRequest, StepOneProps } from '../../types/signup';

import { signupApi } from '@/api/features/authApi';
import { validateEmail, validatePassword } from '@/api/utils/validation';
import { BackArrow } from '@/components/ui/icons/BackArrow';
import { RecoverLogo } from '@/components/ui/icons/RecoverLogo';
import { WrapperNoHREF } from '@/components/ui/WrapperNoHREF';
import { Alert, Button, Card, CardBody, CardFooter, CardHeader, Input, Progress } from "@heroui/react";
import { NavLink } from '@/components/navbars/DashboardNavbar';



//lazy load the other components
const StepTwo = lazy(() => import('../../function/auth/StepTwo'));
const StepThree = lazy(() => import('../../function/auth/StepThree'));

//First step component - eagerly loaded
const StepOne: React.FC<StepOneProps> =({
    formData,
    handleInputChange,
    handleKeyDown,
    errors
}) => (
    <div>
        <p className='text-white'>Enter your email</p><br/>
        <Input 
            className='w-full h-[50px] text-white'
            classNames={{
                label: 'text-white',
                errorMessage: 'font-semibold'
            }}
            radius='sm' 
            label='Email' 
            type='email'
            id='email'
            name='email'
            color='primary'
            variant='bordered'
            value={formData.user.email}
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
        user: {
            email: '',
            username: '',
            firstName: '',
            lastName: '',
            password: '',
            companyId: ''
        },
        globalRole: 'Viewer'
    });

    const roles: string[] = [
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
        //console.log('validation triggered by: ', new Error().stack)
        //console.log('validate stage call with stage: ', stage)
        switch (stage) {
            case 1:
                if (!validateEmail(formData.user.email)) {
                    setErrors({ message: 'Please enter a valid email address', field: 'email'});
                    return false;
                }
                // if (!signupApi.checkEmailAvailability(formData.email)) {
                //     setErrors({ message: 'An account with this email already exists', field: 'email'});
                //     return false;
                // }
                return true;
            case 2:
                if (formData.user.username.length < 5) {
                    setErrors({message: 'Username must be at least 5 characters long', field: 'username'});
                    return false;
                }
                if (!validatePassword(formData.user.password)) {
                    setErrors({ message: 'Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number', field: 'password'});
                    return false;
                }
                if (formData.user.password !== confirmPassword) {
                    setErrors({ message: 'Passwords do not match', field: 'confirmPassword'});
                    return false;
                }
                // if (!signupApi.checkUsernameAvailable(formData.username)) {
                //     setErrors({ message: 'Username is taken', field: 'username'});
                //     return false;
                // }
                return true;
            case 3:
                    if (!formData.user.firstName) {
                        setErrors({ message: 'Please enter your first name', field: 'firstName'});
                        return false;
                    }
                    if (formData.user.lastName.length < 1) {
                        setErrors({ message: 'Please enter your last name', field: 'lastName'});
                        return false;
                    }
                return true;
            default:
                return false;
        };
    }
    //prefetch other steps
    const prefetchOtherSteps = () => {
        const prefetchStep = async () => {
            await Promise.all([
                import('../../function/auth/StepTwo'),
                import('../../function/auth/StepThree')
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
        e: React.ChangeEvent<HTMLInputElement> | boolean,
        name?: string
    ): void => {
        if (typeof e === 'boolean' && name) {
            setFormData((prev) => ({
                ...prev,
                user: {
                    ...prev.user,
                    [name]: e,
                },
            }));
        } else if (e instanceof Object && 'target' in e) {
            const { name, value, type, checked } = e.target as HTMLInputElement;
            
            if (name === 'confirmPassword') {
                // Handle confirmPassword separately
                setConfirmPassword(value);
                
                // Check if passwords match
                if (value !== formData.user.password) {
                    setErrors({
                        field: 'confirmPassword',
                        message: 'Passwords do not match'
                    });
                } else if (errors?.field === 'confirmPassword') {
                    setErrors(null);
                }
            } else {
                // Only update formData for non-confirmPassword fields
                setFormData(prev => ({
                    ...prev,
                    user: {
                        ...prev.user,
                        [name]: type === 'checkbox' ? checked : value
                    }
                }));
                
                // Clear errors
                setErrors(null);
            }
        }
    };

    const makeUpper = (value: string) => {
        return value.toUpperCase();
    }

    const handleRoleChange = (globalRole: string): void => {
        setFormData(prev => ({
            ...prev,
            globalRole: globalRole
        }));
        console.log(formData.globalRole)
        setErrors(null);
    }
    
    //const isProcessing = useRef(false);

    const handleNext = () => {
        
        console.log("🚀 Button clicked!");
        
        if (validateStage(stage)) {
            console.log(`✅ Moving from stage ${stage} to ${stage + 1}`);
    
            setStage((prev) => {
                console.log(`Updating stage state: ${prev} -> ${prev + 1}`);
                return prev + 1;
            });
        } else {
            console.log(`❌ Validation failed at stage: ${stage}`);
        }
    };
    const handleBack = (): void => {
        setStage(prev => prev - 1);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            if (stage < 3) {
                handleNext();
            } else if (stage === 3) {
                handleSubmit();
            };
        };
    };
    

    const handleSubmit = async (event?: React.FormEvent) => {
        if (event) { 
          event.preventDefault(); 
          if (stage !== 3) return;
        }
      
        if (validateStage(stage)) {
          try {
            if (!formData.user.companyId) {
                delete formData.user.companyId;
            }
            const response = await signupApi.signup(formData);
            console.log('Success: ', response);
            router.push('./login');
          } catch (error) {
            console.log('Submission error: ', error)
          }
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
                    roles={roles}
                    />
                </Suspense>
                );
            default:
                return null;
            }
    };

    return(
        
    <form onSubmit={(e) => {if (stage !== 3) {e.preventDefault(); return;} handleSubmit(e)}} className='h-[clamp(30rem,40vh+10rem,60rem)] w-[clamp(25rem,25vw+5rem,45rem)] '>
        <Card
            isBlurred
            className='border-[10px] !bg-recovernavy border-slate-500 min-h-[30rem] rounded-2xl h-auto bg-clip-padding overflow-hidden'
            shadow='md'
        >

            <CardHeader className='w-[100%] '>
                <div className='w-full'>
                    <div className='flex justify-center items-center'>
                        <RecoverLogo size={50}/>
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
                    <p className='w-[10vw] text-white'>Step {stage} of 3</p>
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
                        <Button 
                            variant='bordered' 
                            className='border-white font-bold opacity-100 !text-white w-full h-[50px] mb-8 hover:bg-secondary' 
                            color='secondary' 
                            onPress={handleNext}
                            type='button'
                            
                            >
                                Next
                            </Button>
                    ) : (
                        <Button 
                            color='secondary'
                            type='submit'
                            variant='bordered' 
                            isDisabled={isLoading} 
                            className='font-bold opacity-100 text-white w-full h-[50px] mb-8 border-white hover:bg-slate-500 hover:text-black'
                        >
                            {isLoading ? 'Signing up...' : 'Sign Up'}
                        </Button>
                    )}
                    <div className='flex justify-center'>
                        <small className='text-white'>Already have an account? <a className='text-gray-300 underline' href='./login'>Sign in</a></small>
                    </div>
                </div>
            </CardFooter>
        </Card>
    </form>
    )
}
