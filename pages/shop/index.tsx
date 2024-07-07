import axios from 'axios';
import { CiSearch } from "react-icons/ci";
import CardPlant from '~/components/shop/card-plants';
import { InferGetStaticPropsType } from 'next';
import { ProductTypes } from '~/types/product';
import { CategoriesTypes } from '~/types/categories';
import React, { useEffect, useRef, useState } from 'react';

import useToastStatus from '~/hooks/useToast';

interface IShopProps {
    products: ProductTypes[];
    categories: CategoriesTypes[];
}

export const getStaticProps = async () => {
    try {
        const [productsResponse, categoriesResponse] = await Promise.all([
            axios.get(`${process.env.APP_DOMAIN}/api/products`),
            axios.get(`${process.env.APP_DOMAIN}/api/categories`)
        ]);



        const productsData: ProductTypes[] = productsResponse.data.data
        const categoriesData: CategoriesTypes[] = categoriesResponse.data.data
        return {
            props: {
                products: productsData || [],
                categories: categoriesData || [],
            }
        };
    } catch (error) {
        console.error("Error saat mengambil data:", error);
        return {
            props: {
                products: [],
                categories: [],
            }
        };
    }
};


const Shop: React.FC<IShopProps> = ({
    products, categories
}) => {
    const [dataProducts, setDataProducts] = useState<ProductTypes[]>(products);
    const inputRef = useRef<HTMLInputElement>(null);
    const showToast = useToastStatus();

    const onSearchProduct = async (query: string) => {
        console.log(query)
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/find/products`, {
                params: { name: query }
            });

            setDataProducts(response.data.data.data);
        } catch (error) {
            console.error("Error during product search:", error);
        }
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                const query = inputRef.current?.value || '';
                onSearchProduct(query);
            }
        };

        const inputElement = inputRef.current;
        inputElement?.addEventListener('keydown', handleKeyDown);

        return () => {
            inputElement?.removeEventListener('keydown', handleKeyDown);
        };
    }, []);


    

    return (
        <>
            <div className='h-[400px] bg-cover ' style={{ backgroundImage: 'url(/assets/banners.jpg)' }}>
                <div className='flex flex-col justify-center items-center h-full'>
                    <h1 className='text-white text-4xl mb-7'>Selamat Datang pada Toko Kebun Raya</h1>
                    <div className=' w-[400px] flex items-center px-5 py-2 bg-white rounded-lg border border-[#55555]'>
                        <CiSearch className='mr-4 text-2xl' />
                        <input type="text" ref={inputRef} className='outline-none w-full' />
                    </div>
                </div>
            </div>
            <div className='container mx-auto  grid grid-cols-8 gap-6 mt-5'>
                <div className='col-span-2 p-4 bg-slate-200 rounded-lg h-fit'>
                    <h2 className='sm:text-2xl text-lg'>Category</h2>
                    <div className='mt-4 flex flex-col gap-2'>
                        <p className='mt-4'>Plant</p>
                        <p>Seed</p>
                        <p>Plant</p>
                    </div>
                </div>
                <div className='col-span-6 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5'>
                    {dataProducts && dataProducts.map((val, i) => (
                        <CardPlant key={i} data={val} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Shop;
