import Image from 'next/image';
import * as React from 'react';

interface ICardDocumentionsProps {
}

const CardDocumentions: React.FunctionComponent<ICardDocumentionsProps> = (props) => {
    return (
        <div className='col-span-1 relative documentation-card cursor-pointer overflow-hidden p-5 sm:p-0'>
            <Image src='/assets/plants/plant_1.png' className='bg-cover rounded-lg' width={500} height={500} alt="Logo Kebun Raya" />
            <div className='absolute  text-white documentation-description'>
                <h4 className='text-white'>Nizar Fazari</h4>
            </div>
        </div>
    );
};

export default CardDocumentions;
