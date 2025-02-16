import React from 'react'

export const CircleX = () => {
    return (
        <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="12" cy="12" r="9" className="stroke-white"/>
            <path d="M15 9l-6 6m0-6l6 6" className="stroke-white dark:stroke-sky-300"/>
        </svg>
    )
}


