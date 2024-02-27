import { Input } from '@chakra-ui/react';
import * as React from 'react';

interface ILabelInputProps {
}

const LabelInput: React.FunctionComponent<ILabelInputProps> = (props) => {
    return (
        <>
            <div>
                <Input variant='filled' placeholder='Filled' />
            </div>
        </>
    );
};

export default LabelInput;
