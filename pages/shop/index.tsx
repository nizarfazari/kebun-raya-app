import axios from 'axios';
import { CiSearch } from "react-icons/ci";
import CardPlant from '~/components/shop/card-plants';
import { InferGetStaticPropsType } from 'next';
import { ProductTypes } from '~/types/product';
import { CategoriesTypes } from '~/types/categories';
import React from 'react';



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

        console.log(productsResponse)
        // Ambil data dari response
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

    console.log(products)
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
                    <h2 className='sm:text-2xl text-lg'>Category</h2>
                    <div className='mt-4 flex flex-col gap-2'>
                        <p className='mt-4'>Plant</p>
                        <p>Seed</p>
                        <p>Plant</p>
                    </div>
                </div>
                <div className='col-span-6 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5'>
                    {products && products.map((val, i) => (
                        <CardPlant key={i} data={val} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Shop;
