import React from 'react';
import { Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import type { StepThreeProps } from '../../types/signup';

export default function StepThree({formData, handleInputChange, handleRoleChange, errors, userType, handleKeyDown}: StepThreeProps) {

    return (
    <div>
        <div >
            <p>Enter your name</p>
            <div className='flex gap-[1vw]'>
            <Input 
                className='w-[50%] mr-4'
                label='First Name'
                type='firstName'
                id='firstName'
                name='firstName'
                variant='bordered'
                value={formData.firstName}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                errorMessage="Please enter your first name"
                isInvalid={errors === null ? false : errors.field == 'firstName' ? true : false}
            />
            <br/>
            <Input 
                className='w-[50%] ml-4'
                label='Last Name'
                type='lastName'
                id='lastName'
                name='lastName'
                variant='bordered'
                value={formData.lastName}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                errorMessage='Please enter your last name'
                isInvalid={errors === null ? false : errors.field == 'lastName' ? true : false}
            />
            </div>
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
                // value={formData.companyId}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />
        </div> <br/>

        <div>
            <p>Select your role</p>
            <Dropdown className='bg-[#090f21]'>
                <DropdownTrigger>
                    <Button color='success' className='rounded-md'> {/**TODO Try again later to integrate the Button1 */}
                        {formData.userType || "Viewer"}
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    style={{background: '#09090b', border: '5px solid #090f21', borderRadius: '5px'}}
                    itemClasses={{
                        base: [
                            '!bg-[#09090b]',
                            '!data-[hover=true]:bg-green-500'
                        ]
                }}
                onAction={(key) => handleRoleChange(key.toString())}
                >
                    {userType.map((role: string) => (
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
    )
}

