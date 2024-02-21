import Image from 'next/image';
import * as React from 'react';
import Buttons from '../button';

interface ICardPlantProps {
}

const CardPlant: React.FunctionComponent<ICardPlantProps> = (props) => {
    return (
        <>
            <div className='p-5 shadow rounded-lg'>
                <Image src='/assets/plants/plant_1.png' width={250} height={175} alt="Logo Kebun Raya" className='w-full' />
                <h1 className='mt-4 font-bold sm:text-2xl mb-2'>Jade Terrarium</h1>
                <p className='text-lg'>Rp. 2.000.000</p>
                <p className='text-lg'>Stock 5</p>
                <div className='flex items-center gap-4 mt-1 mb-4'>
                    <p className='category-plant '>Plants</p>
                    <p className='category-plant'>Seed</p>
                </div>
                {/* <p className='mt-1 font-medium'>Harga : </p>
                <p className='mt-1 mb-4 font-medium'>Stock : 5</p> */}
                <div className='flex gap-4'>
                    <Buttons name='detail' color='primary.400' variant='outlineVariant' className='!font-bold w-full' />
                    <Buttons name='like' color='primary.400' variant='outlineVariant' className='!font-bold w-full' />
                </div>
            </div>
        </>
    );
};

export default CardPlant;
