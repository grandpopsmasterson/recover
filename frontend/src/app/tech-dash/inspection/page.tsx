'use client'
import { Button } from '@heroui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

const Inspection = () => {
    const router = useRouter();
    return (
        <div className='flex justify-center items-center flex-col h-screen'>
            <p>This does not exist yet, come back soon!</p>
            <Button onPress={() => router.push('/tech-dash')}>Back to dashboard</Button>
        </div>
    )
}

export default Inspection
