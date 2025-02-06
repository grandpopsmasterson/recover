import React from 'react';
import { Input, Alert, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import type { StepThreeProps } from '../../types/signup';

export default function StepThree({formData, handleInputChange, handleRoleChange, errors, roles}: StepThreeProps) { 
    <div>
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
}

