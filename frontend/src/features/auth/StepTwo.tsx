import React from 'react';
import { Input, Alert } from "@heroui/react";
import { EyeFilledIcon, EyeSlashFilledIcon } from '../../components/ui/eyePasswordIcon';
import type { StepTwoProps } from '../../types/signup';

export default function StepTwo({ formData, handleInputChange, errors }: StepTwoProps) {
    const [isVisible, setIsVisible] = React.useState<boolean>(false);
    const [isVisibleConf, setIsVisibleConf] = React.useState<boolean>(false);
    
    const toggleVisibility = (): void => setIsVisible(!isVisible);
    const toggleVisibilityConf = (): void => setIsVisibleConf(!isVisibleConf);

    return (
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
                        <EyeFilledIcon className="mb-[.4rem] text-2xl text-default-400 pointer-events-none" />
                    ) : (
                        <EyeSlashFilledIcon className="mb-[.4rem] text-2xl text-default-400 pointer-events-none" />
                    )}
                    </button>
                }
                />
                {errors && <Alert color='danger' title={errors.message}/>}
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
        </div>
    );
}
