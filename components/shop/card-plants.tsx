import Image from 'next/image';
import * as React from 'react';
import Buttons from '../button';
import Link from 'next/link';

interface PlantData {
    name: string;
    harga: number;
    stock: number;
    slug: string;
    categories: { name: string }[];
}

interface ICardPlantProps {
    data: PlantData
}

const CardPlant: React.FunctionComponent<ICardPlantProps> = ({ data }) => {
    console.log( data)
    return (
        <>
            <div className='p-5 shadow rounded-lg'>
                <Image src='/assets/plants/plant_1.png' width={250} height={175} alt="Logo Kebun Raya" className='w-full' />
                <h1 className='mt-4 font-bold sm:text-2xl mb-2'>{data?.name}</h1>
                <p className='text-lg'>{data?.harga}</p>
                <p className='text-lg'>Stock {data?.stock}</p>
                <div className='flex items-center gap-4 mt-1 mb-4'>
                    {data.categories && data.categories.map((val, i) => (
                        <p className='category-plant ' key={i}>{val?.name}</p>
                    ))}
                </div>
                <div className='flex gap-4'>
                    <Link href={`/shop/${data.slug}`} className='px-10 py-2 bg-primary-600 rounded-lg text-white text-sm'>detail</Link>
                    {/* <Buttons name='detail' color='primary.400' variant='outlineVariant' className='!font-bold w-full' /> */}
                    <Buttons name='like' color='primary.400' variant='outlineVariant' className='!font-bold w-full' />
                </div>
            </div>
        </>
    );
};

export default CardPlant;
