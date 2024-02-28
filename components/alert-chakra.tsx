import * as React from 'react';
import {
    Alert,
    AlertIcon,
    CloseButton,
    useDisclosure,
} from '@chakra-ui/react'

// Define an enum for status values
enum AlertStatus {
    Error = 'error',
    Info = 'info',
    Warning = 'warning',
    Success = 'success',
    Loading = 'loading',
}

interface IAlertChakraProps {
    status?: AlertStatus
    description?: string
}

const AlertChakra: React.FunctionComponent<IAlertChakraProps> = ({ status = AlertStatus.Error, description }) => {
    const {
        isOpen: isVisible,
        onClose,
        onOpen,
    } = useDisclosure({ defaultIsOpen: true })

    return (
        <>
            {isVisible ? <Alert status={status} className='rounded-lg flex justify-between'>
                <div className='flex items-center'>
                    <AlertIcon />
                    {description}
                </div>
                <CloseButton
                    alignSelf='flex-end'
                    position='relative'
                    className='w-full'
                    onClick={onClose}
                />
            </Alert> : ''}
        </>
    );
};

export default AlertChakra;
