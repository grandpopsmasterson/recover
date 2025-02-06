'use client'
import React, { useState } from 'react';
import { Button, Card, CardBody,CardHeader, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Progress, Input, Alert, Checkbox } from "@heroui/react";
import { RecoverLogo } from '@/styles/constants/RecoverLogo';
import Button1 from '@/components/ui/ButtonC';
import { useRouter } from 'next/navigation';
import apiClient from '@/config/apiClient';
import { EyeFilledIcon, EyeSlashFilledIcon } from './ui/eyePasswordIcon';



//Start of SignUpCard logic
const SignUpCard = () => {
    //password visible state
    const[isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const[isVisibleConf, setIsVisibleConf] = useState(false);
    const toggleVisibilityConf = () => setIsVisibleConf(!isVisibleConf);
    //router init
    const router = useRouter();
    //Stage state for place in sign up path
    const [stage, setStage] = useState(1);
    //Loading state
    const [isLoading, setIsLoading] = useState(false);
    //state for errors
    const [errors, setErrors] = useState<SignUpError | null>(null);
    const [isSelected, setIsSelected] = useState(false)
    //form data state
    const [formData, setFormData] = useState<FormData>({
        email:'',
        username: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
        companyId: '',
        role: '',
        termsAccepted: false,
    });
    // Roles enum
    const roles = [
        'Viewer',
        'Secretary',
        'Technician',
        'Project Manager',
        'Adjuster',
        'Client'
    ];
    //email validation
    const validateEmail = (value: string) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);

    const isInvalid = React.useMemo(() => {
        if (formData.email === "") return false;

        return validateEmail(formData.email) ? false : true;
    }, [formData.email]);
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
                if (formData.password !== formData.confirmPassword) {
                    setErrors({ message: 'Passwords do not match', field: 'confirmPassword'});
                    return false;
                }
                break;
            case 3:
                if (formData.username.length < 5) {
                    setErrors({message: 'Username must be at least 5 characters long', field: 'username'});
                    return false;
                }
                if (!formData.firstName) {
                    setErrors({ message: 'Please enter your first name', field: 'firstName'});
                    return false;
                }
                if (!formData.lastName) {
                    setErrors({ message: 'Please enter your last name', field: 'lastName'});
                    return false;
                }
                break;
            case 4:
                break;
            case 5:
                if (!formData.termsAccepted) {
                    setErrors({ message: 'You must accept the terms and conditions', field: 'termsAccepted'});
                    return false;
                }
                break;
        }
        return true;
    };

    // input change handler
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | boolean, name?: string) => {
        if (typeof e === 'boolean' && name) {
            //HeroUI checkbox passes the boolean directly
            setFormData( prev => ({ ...prev, [name]: e}));
        } else if (e instanceof Object && 'target' in e) {
        // Regular input handline
            const { name, value, type, checked } = e.target as HTMLInputElement;
            setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value,}));
        }
        setErrors(null);
    };

    // role dropdown state and handler
        const handleRoleChange = (role: string) => {
        setFormData(prev => ({
            ...prev,
            role: role
        }));
        setErrors(null)
    };

    // stage handlers
    const handleNext = () => {
        if (validateStage()) {
            setStage(prev => prev + 1);
        }
    };

    const handleBack = () => {
        setStage(prev => prev - 1);
    }
    // routing for beginning and end
    
    const handleHome = () => {
        router.push('/');
    }


    const handleSubmit = async () => {
        console.log('submit handler called')
            
        if (!validateStage()) {
            console.log('stage validation failed')
            return;
        }
        console.log('final verification passed', formData)
        setIsLoading(true);
        setErrors(null);

        try {
            await apiClient.post('/auth/signup', formData);
            router.push('/auth/login')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'An error occurred during signup';

            switch (error.response?.status) {
                case 409:
                    setErrors({ message: 'This email is already registered', field: 'email'});
                    break;
                case 400:
                    setErrors({ message: error.response.data.message || 'Invalid input data'});
                    break;
                case 422:
                    setErrors({ message: 'Please check your input and try again'});
                    break;
                default:
                    setErrors({ message: errorMessage });
            }
        } finally {
            setIsLoading(false)
        }
    };

    //progress bar values
    const progress: Record<number, number> = {
        1: 25,
        2: 50,
        3: 75,
        4: 100
    }

    return (
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
                    <div>
                    {stage === 1 && (
                            <Button1 onPress={handleHome}>Home</Button1>
                        )}
                        {stage > 1 && ( //TODO change the function of back and home buttons are just the back arrow in the header
                            <Button1 onPress={handleBack}>Back</Button1>
                        )}
                    <p className='w-[10vw]'>Step {stage} of 4</p>
                    {errors && (
                        <Alert color='danger' title={errors.message} />
                    )}
                    </div>
                </div>
            </CardHeader>
            <CardBody>
                <form className='flex flex-col h-[100%] mb-16' onSubmit={(e) => e.preventDefault()}>
                    {stage === 1 && (
                        <div>
                            <div>
                            <p>Enter your email</p> <br/>
                            <Input 
                                className='w-[100%] h-[50px] '
                                radius='sm' 
                                label='Email' 
                                type='email'
                                id='email'
                                name='email'
                                variant='bordered'
                                value={formData.email}
                                isInvalid={isInvalid}
                                errorMessage='Please enter a valid email. Format: example@recover.com'
                                onChange={handleInputChange}
                            /> <br/>
                        </div>
                        </div>
                    )}

                    {stage === 2 && (
                        <div>
                            <div>
                                <p>Create a password</p>
                                <Input 
                                    className='w-[30vw]' 
                                    label='Password' 
                                    type={isVisible ? 'text' : 'password'}
                                    id='password'
                                    name='password'
                                    variant='bordered'
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    endContent={
                                        <button
                                            aria-label="toggle password visibility"
                                            className="focus:outline-none"
                                            type="button"
                                            onClick={toggleVisibility}
                                        >
                                        {isVisible ? (
                                            <EyeFilledIcon className=" mb-[.4rem] text-2xl text-default-400 pointer-events-none" />
                                        ) : (
                                            <EyeSlashFilledIcon className="mb-[.4rem] text-2xl text-default-400 pointer-events-none" />
                                        )}
                                        </button>
                                    }
                                />
                                {errors && (
                                    <Alert color='danger' title={errors.message}/>
                                )}
                                <br/>
                            </div>

                            <div>
                                <p>Confirm password</p>
                                <Input 
                                    className='w-[30vw]' 
                                    label='Password Confirmation' 
                                    type={isVisibleConf ? "text" : "password"}
                                    id='confirmPassword'
                                    name='confirmPassword'
                                    variant='bordered'
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    endContent={
                                        <button
                                            aria-label="toggle password visibility"
                                            className="focus:outline-none"
                                            type="button"
                                            onClick={toggleVisibilityConf}
                                        >
                                        {isVisibleConf ? (
                                            <EyeFilledIcon className=" mb-[.4rem] text-2xl text-default-400 pointer-events-none" />
                                        ) : (
                                            <EyeSlashFilledIcon className="mb-[.4rem] text-2xl text-default-400 pointer-events-none" />
                                        )}
                                        </button>
                                    }
                                />
                                {errors && (<Alert color='danger' title={errors.message}/>)}
                                <br/>
                            </div>
                        </div>
                    )}

                    {stage === 3 && (
                        <div>
                            <div>
                                <p>Create username</p>
                                <Input 
                                    className='w-[30vw]'
                                    label='Username'
                                    type='username'
                                    id='username'
                                    name='username'
                                    variant='bordered'
                                    value={formData.username}
                                    onChange={handleInputChange}
                                />
                                {errors && (<Alert color='danger' title={errors.message} /> )}
                            </div> <br/>

                            <div>
                                <p>Enter your name</p>
                                <Input 
                                    className='w-[30vw]'
                                    label='First Name'
                                    type='firstName'
                                    id='firstName'
                                    name='firstName'
                                    variant='bordered'
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                />
                                {errors && (
                                    <Alert color='danger' title={errors.message} />
                                )} <br/>
                                <Input 
                                    className='w-[30vw]'
                                    label='Last Name'
                                    type='lastName'
                                    id='lastName'
                                    name='lastName'
                                    variant='bordered'
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                />
                                {errors && (
                                    <Alert color='danger' title={errors.message} />
                                )}
                            </div> <br/>
                            <div>
                                <p>Enter company details</p>
                                <Input 
                                    className='w-[30vw]'
                                    label='Company ID'
                                    type='companyId'
                                    id='companyId'
                                    name='companyId'
                                    variant='bordered'
                                    value={formData.companyId}
                                    onChange={handleInputChange}
                                />
                            </div> <br/>

                            <div>
                                <p>Select your role</p>
                                <Dropdown>
                                    <DropdownTrigger>
                                        <Button color='success' className='rounded-md'> {/**TODO Try again later to integrate the Button1 */}
                                            {formData.role || "Select Role"}
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu
                                    aria-label='Role Selection'
                                    onAction={(key) => handleRoleChange(key.toString())}
                                    >
                                        {roles.map((role) => (
                                            <DropdownItem
                                                key={role}
                                            >
                                                {role}
                                            </DropdownItem>
                                        ))}
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        </div>
                    )}

                    {stage === 4 && (
                        <div>
                            <Checkbox 
                            name='termsAccepted'
                            color='success'
                            isSelected={isSelected}
                            onChange={() => {console.log(!isSelected); handleInputChange(!isSelected, "termsAccepted")}}
                            onValueChange={setIsSelected}
                            >I accept the terms and conditions</Checkbox>
                            
                            
                        </div>
                    )}

                    <div className='mt-auto'>
                        {stage < 4 ? (
                            <Button1 
                                variant='ghost' 
                                className='!bg-transparent text-bold !text-green-500 w-[100%] h-[50px]' 
                                color='success' 
                                onPress={handleNext}
                                >
                                    Next
                                </Button1>
                        ) : (
                            <Button1 isDisabled={isLoading} onPress={handleSubmit}>{isLoading ? 'Signing up...' : 'Sign Up'}</Button1>
                        )}
                    </div>
                </form>
            </CardBody>
        </Card>
    )
}
export default SignUpCard;