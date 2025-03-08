'use client'

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { authApi } from '@/api/features/authApi';
import { validateEmail, validatePassword } from '@/api/utils/validation';
import { BackArrow } from '@/components/ui/icons/BackArrow';
import { RecoverLogo } from '@/components/ui/icons/RecoverLogo';
import { Alert, Button, Card, CardBody, CardFooter, CardHeader, Input, Progress, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { NavLink } from '@/components/navbars/DashboardNavbar';
import { EyeFilledIcon, EyeSlashFilledIcon } from '@/components/ui/icons/eyePasswordIcon';

// Available roles
const ROLES = [
    'Technician', 'Manager', 'Client', 
    'Adjuster', 'Secretary', 'Viewer', 'Editor'
];

export default function SignUpCard() {
    const router = useRouter();
    
    // UI state
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<{ field: string, message: string } | null>(null);
    const [passwordVisibility, setPasswordVisibility] = useState({
        password: false,
        confirmPassword: false
    });

    // Form data
    const [formData, setFormData] = useState({
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
    const [confirmPassword, setConfirmPassword] = useState('');
    
    // Toggle password visibility
    const toggleVisibility = (field: 'password' | 'confirmPassword') => {
        setPasswordVisibility(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };
    
    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        
        if (name === 'confirmPassword') {
            setConfirmPassword(value);
        } else {
            setFormData(prev => ({
                ...prev,
                user: {
                    ...prev.user,
                    [name]: value
                }
            }));
        }
        
        setError(null);
    };
    
    // Handle role selection
    const handleRoleChange = (role: string) => {
        setFormData(prev => ({
            ...prev,
            globalRole: role
        }));
    };
    
    // Validate current step
    const validateStep = (): boolean => {
        switch (step) {
            case 1:
                if (!validateEmail(formData.user.email)) {
                    setError({ field: 'email', message: 'Please enter a valid email address' });
                    return false;
                }
                return true;
                
            case 2:
                if (formData.user.username.length < 5) {
                    setError({ field: 'username', message: 'Username must be at least 5 characters long' });
                    return false;
                }
                if (!validatePassword(formData.user.password)) {
                    setError({ field: 'password', message: 'Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number' });
                    return false;
                }
                if (formData.user.password !== confirmPassword) {
                    setError({ field: 'confirmPassword', message: 'Passwords do not match' });
                    return false;
                }
                return true;
                
            case 3:
                if (!formData.user.firstName) {
                    setError({ field: 'firstName', message: 'Please enter your first name' });
                    return false;
                }
                if (!formData.user.lastName) {
                    setError({ field: 'lastName', message: 'Please enter your last name' });
                    return false;
                }
                return true;
                
            default:
                return false;
        }
    };
    
    // Navigation handlers
    const handleNext = () => {
        if (validateStep()) {
            setStep(prev => prev + 1);
        }
    };
    
    const handleBack = () => {
        setStep(prev => prev - 1);
    };
    
    // Handle Enter key press
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (step < 3) {
                handleNext();
            } else {
                handleSubmit();
            }
        }
    };
    
    // Submit the form
    const handleSubmit = async () => {
        if (!validateStep()) return;
        
        setIsLoading(true);
        
        try {
            // Clean up payload
            const payload = {...formData};
            
            await authApi.signup(payload);
            router.push('./login');
        } catch (err) {
            setError({ 
                field: 'server', 
                message: err instanceof Error ? err.message : 'Registration failed' 
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    // Render the step content
    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <div>
                        <p className="text-white">Enter your email</p><br/>
                        <Input 
                            className="w-full h-[50px] text-white"
                            classNames={{
                                label: 'text-white',
                                errorMessage: 'font-semibold'
                            }}
                            radius="sm" 
                            label="Email" 
                            type="email"
                            id="email"
                            name="email"
                            color="primary"
                            variant="bordered"
                            value={formData.user.email}
                            errorMessage="Please enter a valid email"
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            isInvalid={error?.field === 'email'}
                        />
                    </div>
                );
                
            case 2:
                return (
                    <div className="space-y-4">
                        <div>
                            <p className="text-white">Create username</p>
                            <Input 
                                required
                                className="w-full text-white"
                                classNames={{
                                    label: 'text-white',
                                    errorMessage: 'font-semibold'
                                }}
                                label="Username"
                                type="text"
                                id="username"
                                name="username"
                                variant="bordered"
                                color="primary"
                                value={formData.user.username}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                errorMessage={error?.message}
                                isInvalid={error?.field === 'username'}
                            />
                        </div>
                        <div>
                            <p className="text-white">Create a password</p>
                            <Input 
                                className="w-full text-white" 
                                classNames={{
                                    label: 'text-white',
                                    errorMessage: 'font-semibold'
                                }}
                                label="Password" 
                                type={passwordVisibility.password ? 'text' : 'password'}
                                id="password"
                                name="password"
                                variant="bordered"
                                color="primary"
                                value={formData.user.password}
                                onChange={handleInputChange}
                                errorMessage={error?.message}
                                onKeyDown={handleKeyDown}
                                isInvalid={error?.field === 'password'}
                                endContent={
                                    <button
                                        aria-label="toggle password visibility"
                                        className="focus:outline-none"
                                        type="button"
                                        onClick={() => toggleVisibility('password')}
                                    >
                                        {passwordVisibility.password ? (
                                            <EyeFilledIcon className="mb-[.4rem] text-2xl text-default-400 pointer-events-none" />
                                        ) : (
                                            <EyeSlashFilledIcon className="mb-[.4rem] text-2xl text-default-400 pointer-events-none" />
                                        )}
                                    </button>
                                }
                            /> 
                        </div>
                        <div>
                            <p className="text-white">Confirm password</p>
                            <Input 
                                className="w-full text-white" 
                                classNames={{
                                    label: 'text-white',
                                    errorMessage: 'font-semibold'
                                }}
                                label="Password Confirmation" 
                                type={passwordVisibility.confirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                name="confirmPassword"
                                variant="bordered"
                                color="primary"
                                value={confirmPassword}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                errorMessage={error?.message}
                                isInvalid={error?.field === 'confirmPassword'}
                                endContent={
                                    <button
                                        aria-label="toggle password visibility"
                                        className="focus:outline-none"
                                        type="button"
                                        onClick={() => toggleVisibility('confirmPassword')}
                                    >
                                        {passwordVisibility.confirmPassword ? (
                                            <EyeFilledIcon className="mb-[.4rem] text-2xl text-default-400 pointer-events-none" />
                                        ) : (
                                            <EyeSlashFilledIcon className="mb-[.4rem] text-2xl text-default-400 pointer-events-none" />
                                        )}
                                    </button>
                                }
                            />
                        </div>
                    </div>
                );
                
            case 3:
                return (
                    <div className="space-y-4">
                        <div>
                            <p className="text-white">Enter your name</p>
                            <div className="flex gap-1">
                                <Input 
                                    required
                                    className="w-1/2 text-white"
                                    classNames={{
                                        label: '!text-white'
                                    }}
                                    label="First Name"
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    variant="bordered"
                                    color="primary"
                                    value={formData.user.firstName}
                                    onChange={handleInputChange}
                                    onKeyDown={handleKeyDown}
                                    errorMessage="Please enter your first name"
                                    isInvalid={error?.field === 'firstName'}
                                />
                                <Input 
                                    className="w-1/2 text-white"
                                    classNames={{
                                        label: '!text-white'
                                    }}
                                    label="Last Name"
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    variant="bordered"
                                    color="primary"
                                    value={formData.user.lastName}
                                    onChange={handleInputChange}
                                    onKeyDown={handleKeyDown}
                                    errorMessage="Please enter your last name"
                                    isInvalid={error?.field === 'lastName'}
                                />
                            </div>
                        </div>
                        <div>
                            <p className="text-white">Enter company details</p>
                            <Input 
                                className="w-full text-white"
                                classNames={{
                                    label: '!text-white'
                                }}
                                label="Company ID"
                                type="text"
                                id="companyId"
                                name="companyId"
                                variant="bordered"
                                color="primary"
                                value={formData.user.companyId}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                        <div>
                            <p className="text-white">Select your role</p>
                            <Dropdown className="bg-slate-500">
                                <DropdownTrigger>
                                    <Button color="primary" variant="bordered" className="rounded-md w-1/2 border-white text-white hover:bg-slate-500"> 
                                        {formData.globalRole || "Viewer"}
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                    className="bg-recovernavy border-1 border-recovernavy rounded lg"
                                    itemClasses={{
                                        base: [
                                            'bg-slate-100',
                                            'data-[hover=true]:bg-slate-300',
                                            'text-center',
                                            'self-center'
                                        ]
                                    }}
                                    onAction={(key) => handleRoleChange(key.toString())}
                                >
                                    {ROLES.map((role: string) => (
                                        <DropdownItem key={role}>
                                            {role}
                                        </DropdownItem>
                                    ))}
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                );
                
            default:
                return null;
        }
    };

    return (
        <form 
            onSubmit={(e) => {
                e.preventDefault();
                if (step === 3) handleSubmit();
            }} 
            className="h-[clamp(30rem,40vh+10rem,60rem)] w-[clamp(25rem,25vw+5rem,45rem)]"
        >
            <Card
                isBlurred
                className="border-[10px] !bg-recovernavy border-slate-500 min-h-[30rem] rounded-2xl h-auto bg-clip-padding overflow-hidden"
                shadow="md"
            >
                <CardHeader className="w-[100%]">
                    <div className="w-full">
                        <div className="flex justify-center items-center">
                            <RecoverLogo size={50}/>
                        </div>
                        <br/>
                        <div className="w-[95%]">
                            <Progress 
                                aria-label="Progress bar" 
                                color="secondary" 
                                size="sm" 
                                value={step === 1 ? 33 : step === 2 ? 66 : 100} 
                            />
                        </div>
                        <br/>
                        <div className="flex gap-4">
                            {step === 1 ? (
                                <NavLink href="/">
                                    <BackArrow />
                                </NavLink>
                            ) : (
                                <button type="button" onClick={handleBack}>
                                    <BackArrow />
                                </button>
                            )}
                            <p className="w-[10vw] text-white">Step {step} of 3</p>
                            {error?.field === 'server' && (
                                <Alert 
                                    color="default" 
                                    hideIconWrapper 
                                    variant="bordered" 
                                    className="bg-transparent color-red" 
                                    title={error.message} 
                                />
                            )}
                        </div>
                    </div>
                </CardHeader>
                
                <CardBody className="flex flex-col">
                    {renderStepContent()}
                </CardBody>
                
                <CardFooter>
                    <div className="mt-auto w-full">
                        {step < 3 ? (
                            <Button 
                                variant="bordered" 
                                className="border-white font-bold opacity-100 !text-white w-full h-[50px] mb-8 hover:bg-secondary" 
                                color="secondary" 
                                onClick={handleNext}
                                type="button"
                            >
                                Next
                            </Button>
                        ) : (
                            <Button 
                                color="secondary"
                                type="submit"
                                variant="bordered" 
                                isDisabled={isLoading} 
                                className="font-bold opacity-100 text-white w-full h-[50px] mb-8 border-white hover:bg-slate-500 hover:text-black"
                            >
                                {isLoading ? 'Signing up...' : 'Sign Up'}
                            </Button>
                        )}
                        <div className="flex justify-center">
                            <small className="text-white">
                                Already have an account? <a className="text-gray-300 underline" href="./login">Sign in</a>
                            </small>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </form>
    );
}