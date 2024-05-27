import { Button, ButtonProps } from '@chakra-ui/react'; // Mengimpor ButtonProps dari Chakra UI

type PropsButtons = ButtonProps & {
    // Gunakan & untuk menggabungkan PropsButtons dengan ButtonProps dari Chakra UI
    name: string;
    className?: string;
};

const Buttons = ({ name, className, ...rest }: PropsButtons) => {
    // Tidak perlu menyertakan color dan variant karena ini sudah ada di ButtonProps dari Chakra UI
    return (
        <Button {...rest} className={className}>
            {name}
        </Button>
    );
};

export default Buttons;
