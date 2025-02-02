'use client'

import { Button } from "@heroui/button";
import { usePress } from '@react-aria/interactions';
import { useRef, useState } from "react";
import clsx from "clsx";
import type { MouseEvent as ReactMouseEvent } from 'react';

interface ButtonProps {
    onPress: () => void;
    children: React.ReactNode;
    isDisabled?: boolean;
    className?: string;
    variant?: string;
}

const Button1 = ({
    onPress,
    children,
    isDisabled = false,
    className,
}: ButtonProps) => {
    const ref = useRef<HTMLButtonElement>(null);
    const [isPressed, setIsPressed] = useState(false);
    const { pressProps } = usePress({
        onPress,
        isDisabled
    });

    // Extract only the mouse-related press properties
    //const { onMouseDown, onMouseUp, onMouseEnter, onMouseLeave } = pressProps;
    const handleMouseDown = (e: ReactMouseEvent<HTMLButtonElement>) => {
        setIsPressed(true);
        pressProps.onMouseDown?.(e);
    };

    const handleMouseUp = (e: ReactMouseEvent<HTMLButtonElement>) => {
        setIsPressed(false);
        pressProps.onMouseUp?.(e);
    };

    const handleMouseLeave = (e: ReactMouseEvent<HTMLButtonElement>) => {
        setIsPressed(false);
        pressProps.onMouseLeave?.(e);
    };

    return (
        <Button
            onPress={onPress}  // HeroUI's press handler
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseEnter={pressProps.onMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={ref}
            isDisabled={isDisabled}
            style={{backgroundColor: '#4ade80', color: '#1b2722'}}
            className={clsx(`
                px-4 py-2 rounded-md transition-colors
                ${isPressed ? 'scale-95' : ''}
                ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
            `, className
        )}
        >
            {children}
        </Button>
    )
}

export default Button1