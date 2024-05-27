import Image from 'next/image';
import * as React from 'react';
import Buttons from '~/components/button';

interface IPlantCardProps {
}

const PlantCard: React.FunctionComponent<IPlantCardProps> = (props) => {
    return (
        <>
            <div className='p-5 shadow rounded-lg'>
                <Image src='/assets/plants/plant_1.png' width={250} height={175} alt="Logo Kebun Raya" className='w-full' />
                <h1 className='mt-4 font-bold sm:text-lg'>Jade Terrarium</h1>
                <p className='mt-1 mb-4 font-medium'>Rp. 2.000.000</p>
                <Buttons name='Visit Collections' colorScheme='primary' variant='fillDarkVariant' className='!font-bold w-full' />
            </div>
        </>
    );
};

export default PlantCard;
