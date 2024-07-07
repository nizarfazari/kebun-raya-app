import { Img } from '@chakra-ui/react';
import Image from 'next/image';
import * as React from 'react';

interface ICategoryCardProps {
    name: string,
    image?: string
}

const CategoryCard: React.FunctionComponent<ICategoryCardProps> = ({ name, image = "/assets/category/category_1.png" }) => {
    
    return (
        <>
            <div className='text-center sm:max-w-[250px] cursor-pointer mx-auto'>
                <div className='flex justify-center sm:block'>
                    <Img src={image} width={250} height={250} alt="Logo Kebun Raya" className='rounded-full object-center' />
                </div>
                <h1 className='text-normal text-dark-500 font-bold tracking-[5px] mt-5'>{name}</h1>
            </div>
        </>
    );
};

export default CategoryCard;
