import * as React from 'react';

import { CiSearch } from "react-icons/ci";
import CardPlant from '~/components/shop/card-plants';
interface IShopProps {
}

const Shop: React.FunctionComponent<IShopProps> = (props) => {
    return (
        <>
            <div className='h-[400px] bg-cover ' style={{ backgroundImage: 'url(/assets/banners.jpg)' }}>
                <div className='flex flex-col justify-center items-center h-full'>
                    <h1 className='text-white text-4xl mb-7'>Selamat Datang pada Toko Kebun Raya</h1>
                    <div className=' w-[400px] flex items-center px-5 py-2 bg-white rounded-lg border border-[#55555]'>
                        <CiSearch className='mr-4 text-2xl' />
                        <input type="text" className='outline-none w-full' />
                    </div>
                </div>
            </div>
            <div className='container mx-auto  grid grid-cols-8 gap-6 mt-5'>
                <div className='col-span-2'>
                    <h2 className='text-2xl'>Category</h2>
                    <div className='mt-4 flex flex-col gap-2'>
                        <p className='mt-4'>Plant</p>
                        <p>Seed</p>
                        <p>Plant</p>
                    </div>
                </div>
                <div className='col-span-6 grid grid-cols-3'>
                    <CardPlant />
                </div>
            </div>
        </>
    );
};

export default Shop;
