import React from 'react';
import { Input } from "@heroui/react";

import { StepTwoProps } from '@/types/signup';
import { EyeFilledIcon, EyeSlashFilledIcon } from '@/components/ui/icons/eyePasswordIcon';


export default function StepTwo({ formData, handleInputChange, errors, handleKeyDown, confirmPassword }: StepTwoProps) {
    const [isVisible, setIsVisible] = React.useState<boolean>(false);
    const [isVisibleConf, setIsVisibleConf] = React.useState<boolean>(false);
    
    const toggleVisibility = (): void => setIsVisible(!isVisible);
    const toggleVisibilityConf = (): void => setIsVisibleConf(!isVisibleConf);

    return (
        <div className='space-y-4'>
            <div>
                <p>Create username</p>
                <Input 
                    required
                    className='w-full'
                    label='Username'
                    type='username'
                    id='username'
                    name='username'
                    variant='bordered'
                    color='secondary'
                    value={formData.username}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    errorMessage={errors?.message}
                    isInvalid={errors === null ? false : errors.field == 'username' ? true : false}
                />
            </div>
            <div>
                <p>Create a password</p>
                <Input 
                className='w-full' 
                label='Password' 
                type={isVisible ? 'text' : 'password'}
                id='password'
                name='password'
                variant='bordered'
                color='secondary'
                value={formData.password}
                onChange={handleInputChange}
                errorMessage={errors?.message}
                onKeyDown={handleKeyDown}
                isInvalid={errors === null ? false : errors.field == 'password' ? true : false}
                endContent={
                    <button
                    aria-label="toggle password visibility"
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                    >
                    {isVisible ? (
                        <EyeFilledIcon className="mb-[.4rem] text-2xl text-default-400 pointer-events-none" />
                    ) : (
                        <EyeSlashFilledIcon className="mb-[.4rem] text-2xl text-default-400 pointer-events-none" />
                    )}
                    </button>
                }
                /> 
            </div>
            <div>
                <p>Confirm password</p>
                <Input 
                    className='w-full' 
                    label='Password Confirmation' 
                    type={isVisibleConf ? "text" : "password"}
                    id='confirmPassword'
                    name='confirmPassword'
                    variant='bordered'
                    color='secondary'
                    value={confirmPassword}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    errorMessage={errors?.message}
                    isInvalid={errors === null ? false : errors.field == 'confirmPassword' ? true : false}
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
                <br/>
            </div>
            <br/>
        </div>
    );
}
