'use client'

import { Button } from "@heroui/button";
import { usePress } from '@react-aria/interactions';
import { useRef, useState } from "react";
import clsx from "clsx";
import type { MouseEvent as ReactMouseEvent } from 'react';

interface ButtonProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onPress?: (e?: any) => void | Promise<void> | { payload: undefined; type: 'signup/prevStep'; };
    children: React.ReactNode;
    isDisabled?: boolean;
    className?: string;
    variant?: ButtonVariant;
    color?: ButtonColor;
    type?: 'button' | 'submit' | 'reset';
}

type ButtonVariant = 'solid' | 'faded' | 'bordered' | 'light' | 'flat' | 'ghost' | 'shadow';

type ButtonColor = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'; 

const Button1 = ({
    onPress,
    type,
    children,
    isDisabled = false,
    className,
    variant,
    color,
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
            variant={variant}
            ref={ref}
            isDisabled={isDisabled}
            color={color}
            type={type}
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