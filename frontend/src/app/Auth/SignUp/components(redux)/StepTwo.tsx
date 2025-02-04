'use client'

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { checkUsername, setFormField, prevStep } from "@/redux/slices/signupSlice";

import { Input } from "@heroui/react";
import Button1 from "@/app/Components/ButtonC";

export default function StepTwo() {
    const dispatch = useDispatch<AppDispatch>();
    const { status } = useSelector((state: RootState) => state.signup);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(setFormField({ field: 'password', value: password }));
        dispatch(checkUsername(username));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Input
                    type='text'
                    label='Username'
                    id='username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    variant="bordered"
                    required
                />
            </div>
            <div>
                <Input 
                    label="Password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div className="flex justify-between">
                <Button1
                    onPress={() => dispatch(prevStep())}
                >
                    Back
                </Button1>
                <Button1
                    isDisabled={status === 'loading' ? true : false}
                >
                    {status === 'loading' ? 'Checking...' : 'Next'}
                </Button1>
            </div>
        </form>
    );
}