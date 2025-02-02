'use client'
import React, { useState } from 'react';
import { Card, CardBody,CardHeader, Button, Progress, Input, Alert } from "@heroui/react";
import { RecoverLogo } from '@/app/Components/RecoverLogo';
import Button1 from '@/app/Components/ButtonC';
import { useRouter } from 'next/navigation';

interface FormData {
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
    companyId: string; // number?
    role: string;
    termsAccepted: boolean | string;
}

const SignUpCard = () => {
    
    const [stage, setStage] = useState(1);
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
    const [errors, setErrors] = useState<Partial<FormData>>({});

    const roles = [
        'Secretary',
        'Technician',
        'Project Manager',
        'Adjuster',
        'Client'
    ];

    const validateEmail = (email: string) : boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password: string): boolean => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value}));
        setErrors(prev => ({ ...prev, [name]: ''}));
    };

    const validateStage = (): boolean => {
        const newErrors: Partial<FormData> = {};

        switch (stage) {
            case 1:
                if (!validateEmail(formData.email)) {
                    newErrors.email = 'Pleae enter a valid email address';
                }
                break;
            case 2:
                if (!validatePassword(formData.password)) {
                    newErrors.password = 'Password must be at least 8 characters with 1 uppercase, 1 lowervase, and 1 number';
                }
                if (formData.password !== formData.confirmPassword) {
                    newErrors.confirmPassword = 'Passwords do not match';
                }
                break;
            case 3:
                if (formData.username.length < 5) {
                    newErrors.username = 'Username must be at least 5 characters long';
                }
                if (!formData.firstName) {
                    newErrors.firstName = 'Please enter your first name';
                }
                if (!formData.lastName) {
                    newErrors.lastName = 'Please enter your last name';
                }
                break;
            case 4:
                break;
            case 5:
                if (!formData.termsAccepted) {
                    newErrors.termsAccepted = 'You must accept the terms and conditions';
                }
                break;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStage()) {
            setStage(prev => prev + 1);
        }
    };

    const handleBack = () => {
        setStage(prev => prev - 1);
    }

    const router = useRouter();
    const handleHome = () => {
        router.push('/');
    }

    const handleSubmit = async () => {
        //if (validateStage()) {
            // TODO handle form submission here
            console.log("Form submitted: ", formData);
            router.push('/Auth/Login')
        //}
    };

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
                <RecoverLogo/>
                <Progress aria-label='Progress bar' size='sm' value={progress[stage]} />
                <p className='w-[10vw]'>Step {stage} of 5</p>
            </CardHeader>
            <CardBody>
                <form onSubmit={handleSubmit}>
                    {stage === 1 && (
                        <div>
                            <p>Enter your email</p>
                            <Input 
                                className='w-[30vw]' 
                                label='Email' 
                                type='email'
                                id='email'
                                name='email'
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            {errors.email && (
                                <Alert color='danger' title={errors.email}/>
                            )}
                        </div>
                    )}

                    {stage === 2 && (
                        <div>
                            <div>
                                <p>Create a password</p>
                                <Input 
                                    className='w-[30vw]' 
                                    label='Password' 
                                    type='password'
                                    id='password'
                                    name='password'
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                                {errors.password && (
                                    <Alert color='danger' title={errors.password}/>
                                )}
                            </div>

                            <div>
                                <p>Create a password</p>
                                <Input 
                                    className='w-[30vw]' 
                                    label='Password Confirmation' 
                                    type='confirmPassword'
                                    id='confirmPassword'
                                    name='confirmPassword'
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                />
                                {errors.password && (
                                    <Alert color='danger' title={errors.confirmPassword}/>
                                )}
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
                                    value={formData.username}
                                    onChange={handleInputChange}
                                />
                                {errors.username && (
                                    <Alert color='danger' title={errors.username} />
                                )}
                            </div>

                            <div>
                                <p>Enter your name</p>
                                <Input 
                                    className='w-[30vw]'
                                    label='First Name'
                                    type='firstName'
                                    id='firstName'
                                    name='firstName'
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                />
                                {errors.firstName && (
                                    <Alert color='danger' title={errors.firstName} />
                                )}
                                <Input 
                                    className='w-[30vw]'
                                    label='Last Name'
                                    type='lastName'
                                    id='lastName'
                                    name='lastName'
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                />
                                {errors.lastName && (
                                    <Alert color='danger' title={errors.lastName} />
                                )}
                            </div>
                            <div>
                                <p>Enter company details</p>
                                <Input 
                                    className='w-[30vw]'
                                    label='Company ID'
                                    type='companyId'
                                    id='companyId'
                                    name='companyId'
                                    value={formData.companyId}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div>
                                <p>Select your role</p>
                                {roles.map((role) => (
                                    <Button1
                                        key={role}
                                        onPress={() => setFormData(prev => ({ ...prev, role}))}
                                        variant={formData.role === role ? "default" : "outline"}
                                        className='mb-4'
                                    >
                                        {role}
                                    </Button1>
                                ))}
                            </div>
                        </div>
                    )}

                    {stage === 4 && (
                        <div>
                            <p>create a checkbox for legals here</p>
                        </div>
                    )}

                    <div>
                        {stage === 1 && (
                            <Button1 onPress={handleHome}>Home</Button1>
                        )}
                        {stage > 1 && ( //TODO change the function of back and home buttons are just the back arrow in the header
                            <Button1 onPress={handleBack}>Back</Button1>
                        )}
                        {stage < 4 ? (
                            <Button1 onPress={handleNext}>Next</Button1>
                        ) : (
                            <Button1 onPress={handleSubmit}>Sign Up</Button1>
                        )}
                    </div>
                </form>
            </CardBody>
        </Card>
    )
}
export default SignUpCard;