import React from 'react'

export const CircleCheck = () => {
    return (
        <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="12" cy="12" r="9" className="stroke-white"/>
            <path d="M8 11.5L10.5 14L14 8" className="stroke-white dark:stroke-sky-300"/>
        </svg>
    )
}