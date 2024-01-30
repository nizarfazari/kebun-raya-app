
import { Button } from '@chakra-ui/react'


type PropsButtons = {
    color?: string,
    variant?: string,
    name: string,
    className? : string
}

const Buttons: React.FC<PropsButtons> = ({ color = 'blue', variant = 'solid', name, className }) => {
    return (
        <Button colorScheme={color} variant={variant} className={className}>{name}</Button>
    );
};

export default Buttons;
