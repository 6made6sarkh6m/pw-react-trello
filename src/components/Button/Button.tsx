import React, { FC } from 'react';

interface ButtonProps {
    borderRadius: string;
    backgroundColor: string;
    height: string;
    width: string;
    onClick: () => void;
}
const Button: FC<ButtonProps> = ({borderRadius, backgroundColor, height, width, children}) => {
    return (
        <button
            style={{
                backgroundColor: backgroundColor,
                borderRadius: borderRadius,
                height,
                width
            }}>
                {children}
            </button>
    )
}
export default Button;