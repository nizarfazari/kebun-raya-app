import Image from 'next/image';
import * as React from 'react';

interface ICategoryCardProps {
}

const CategoryCard: React.FunctionComponent<ICategoryCardProps> = (props) => {
    return (
        <>
            <div className='text-center max-w-[250px] cursor-pointer'>
                <div className=''>
                    <Image src='/assets/category/category_1.png' width={250} height={250} alt="Logo Kebun Raya" objectPosition='center' />
                </div>
                <h1 className='text-normal text-dark-500 font-bold tracking-[5px]'>BONSAI</h1>
            </div>
        </>
    );
};

export default CategoryCard;
