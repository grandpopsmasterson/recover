import React, { useState } from 'react';
import { Input, Alert, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import type { StepThreeProps } from './../../../types/signup';

export default function StepThree({formData, handleInputChange, handleRoleChange, errors, roles}: StepThreeProps) {

    return (
    <div>
        <div >
            <p>Enter your name</p>
            <div className='flex gap-[1vw]'>
            <Input 
                className='w-[14vw]'
                label='First Name'
                type='firstName'
                id='firstName'
                name='firstName'
                variant='bordered'
                value={formData.firstName}
                onChange={handleInputChange}
                errorMessage="Please enter your first name"
                isInvalid={errors === null ? false : errors.field == 'firstName' ? true : false}
            />
            <br/>
            <Input 
                className='w-[14vw]'
                label='Last Name'
                type='lastName'
                id='lastName'
                name='lastName'
                variant='bordered'
                value={formData.lastName}
                onChange={handleInputChange}
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
            />
        </div> <br/>

        <div>
            <p>Select your role</p>
            <Dropdown className='bg-[#090f21]'>
                <DropdownTrigger>
                    <Button color='success' className='rounded-md'> {/**TODO Try again later to integrate the Button1 */}
                        {formData.role || "Select Role"}
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                itemClasses={{
                    base: [
                        'bg-[#09090b]',
                        'data-[hover=true]:bg-green-500'
                    ]
                }}
                aria-label='Role Selection'
                onAction={(key) => handleRoleChange(key.toString())}
                >
                    {roles.map((role: string) => (
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

