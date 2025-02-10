'use client';
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from "next/navigation"
import { Divider, Avatar, Form, Input, Listbox, ListboxItem } from '@heroui/react';
import Button1 from '@/components/ui/ButtonC';

export default function SettingsPage() {
    const pathName = usePathname();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // dispatch(setUserDeatails(formData))
        return true
    }

    return (

        <div>
            <div className="profile flex w-full max-w-xs">
                <Divider orientation="vertical" />
                <div className="profile--pane">
                    <Form className="w-full max-w-xs" validationBehavior='native' onSubmit={handleSubmit}>
                        <Input isRequired name="firstName" type="text" placeholder="First name"
                            label="First Name" labelPlacement='outside' errorMessage="First name must not be blank"
                        />

                        <Input isRequired name="lastName" type="text" placeholder="Last name"
                            label="Last Name" labelPlacement='outside' errorMessage="Last name must not be blank"
                        />

                        <Input isRequired name="email" type="email" placeholder="Email Address"
                            label="Email Address" labelPlacement='outside' errorMessage="Must be a valid email address"
                        />

                        <Button1 type="submit">Save Settings</Button1>
                    </Form>
                </div>
            </div>
        </div>
    )
}