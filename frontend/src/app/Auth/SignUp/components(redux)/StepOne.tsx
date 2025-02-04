'use client'

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { checkEmail } from "@/redux/slices/signupSlice";

import { Input } from "@heroui/react";
import Button1 from "@/app/Components/ButtonC";


export default function StepOne() {
    const dispatch = useDispatch<AppDispatch>();
    const { status } = useSelector((state: RootState) => state.signup);
    const [email, setEmail] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(checkEmail(email));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Input 
                    label="Email"
                    variant="bordered" 
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <Button1 type='submit' isDisabled={status === 'loading' ? true : false}>{status === 'loading' ? 'Checking...' : 'Next'}</Button1>

        </form>
    )
}