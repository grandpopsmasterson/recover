'use client'

import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserDetails, prevStep } from "@/store/slices/auth/signupSlice";

import { Input, Dropdown, DropdownItem, DropdownTrigger, DropdownMenu, Button } from "@heroui/react";
import Button1 from "@/components/ui/ButtonC";

export default function StepThree() {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        companyId: '',
        role: 'Viewer',
    });

    const roles = [
        'Secretary',
        'Technician',
        'Project Manager',
        'Adjuster',
        'Client'
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(setUserDetails(formData));
        //todo add backend connectivity

        console.log(formData);
    };

    const handleRoleChange = (role: string) => {
        setFormData(prev => ({
            ...prev,
            role: role
        }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Input 
                    type="text"
                    variant="bordered"
                    id="firstName"
                    name="firstName"
                    label='First name'
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
                <Input 
                    type="text"
                    variant="bordered"
                    id="lastName"
                    name="lastName"
                    label='Last name'
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <Input 
                    type="text"
                    variant="bordered"
                    id="companyId"
                    name="companyId"
                    label='Company ID (Optional)'
                    value={formData.companyId}
                    onChange={handleChange}
                />
            </div>
            <div>
                <Dropdown>
                    <DropdownTrigger>
                        <Button color="success">
                            {formData.role}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        onAction={(key) => handleRoleChange(key.toString())}
                    >
                        {roles.map((role) => (
                            <DropdownItem key={role}>{role}</DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
            </div>
            <div className="flex justify-between">
                <Button1
                    onPress={() => dispatch(prevStep())}
                >
                    Back
                </Button1>
                <Button1>
                    Sign Up
                </Button1>
            </div>
        </form>
    )
}

