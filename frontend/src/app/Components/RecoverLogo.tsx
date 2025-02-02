import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: number;
    width?: number;
    height?: number;
    strokeWidth?: number;
    fill?: string;
};

export const RecoverLogo: React.FC<IconProps> = ({
    size = 32,
    width,
    height,
    strokeWidth = 1.5,
    fill = 'none',
    ...props
}) => {
    return (
        <svg
        aria-hidden="true"
        fill={fill}
        focusable="false"
        height={size || height}
        role="presentation"
        viewBox="0 0 24 24"
        width={size || width}
        {...props}
        >
            <path
                d='M16,15V11a2,2,0,0,0-2-2H8V23h2V17h1.48l2.34,6H16l-2.33-6H14A2,2,0,0,0,16,15Zm-6-4h4v4H10Z'
                stroke='currentColor'
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={strokeWidth}
            />
        </svg>
    );
};