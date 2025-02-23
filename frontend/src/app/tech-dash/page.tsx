'use client'

import Assigned from '@/function/tech-dash/Assigned';
import InProgress from '@/function/tech-dash/InProgress';
import { Button } from '@heroui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function TechnicianDashboard() {
    const router = useRouter();


    return (
        <div className='text-black flex flex-col  items-center h-full max-w-full overflow-hidden'>
            <div className='items-start w-full ml-10 mt-4'>
        This is the technician dashboard <Button onPress={() => router.push('/dashboard')}>Back to main view</Button>
            </div>
            <div className='h-[90vh] w-full'>
            <div className='h-1/2 w-full text-center'>
                <Assigned />
            </div>
            <div className='h-1/2 w-full'>
                <InProgress />
            </div>
            </div>
        </div>
    )
}
