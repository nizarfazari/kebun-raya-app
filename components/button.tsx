import React, { forwardRef } from 'react';
import { Button } from '@chakra-ui/react';

type PropsButtons = {
    color?: string;
    variant?: string;
    name: string;
    className?: string;
};

const Buttons: React.ForwardRefRenderFunction<HTMLButtonElement, PropsButtons> = (
    { color = 'blue', variant = 'solid', name, className, ...rest },
    ref
) => {
    return (
        <Button ref={ref} colorScheme={color} variant={variant} className={className} {...rest}>
            {name}
        </Button>
    );
};

export default forwardRef(Buttons);
