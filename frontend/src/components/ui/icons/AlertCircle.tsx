import React from 'react'

export const AlertCircle = () => {
    return (
        <svg className="size-6 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9"/>
            <path d="M12 8v4"/>
            <path d="M12 16h.01"/>
        </svg>
    )
}