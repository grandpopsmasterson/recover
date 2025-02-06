import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: number;
    width?: number;
    height?: number;
    strokeWidth?: number;
    fill?: string;
};

export const BackArrow: React.FC<IconProps> = ({
    size = 30,
    width,
    height,
    strokeWidth = '2' ,
    fill = 'green',
    ...props
}) => {
    return (
        <svg
        aria-hidden="true"
        fill={fill}
        focusable="false"
        height={size || height}
        role="presentation"
        viewBox="0 0 60 60"
        width={size || width}
        {...props}
        >
            <path
                d='M38,52a2,2,0,0,1-1.41-.59l-24-24a2,2,0,0,1,0-2.82l24-24a2,2,0,0,1,2.82,0,2,2,0,0,1,0,2.82L16.83,26,39.41,48.59A2,2,0,0,1,38,52Z'
                stroke='currentColor'
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={strokeWidth}
            />
        </svg>
    );
};