import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import React, { useState } from 'react';
import Buttons from '~/components/button';
import { ProductTypes } from '~/types/product';
import DOMPurify from "dompurify";
import { AbsoluteCenter, Box, Divider, useToast } from '@chakra-ui/react';
import useToastStatus from '~/hooks/useToast';

interface IDetailShopProps {
    product: ProductTypes
}

const DetailShop: React.FunctionComponent<IDetailShopProps> = ({ product }) => {
    const showToast = useToastStatus();
    const [image, setImage] = useState<string>('/assets/shop/tanaman.jpg')

    const changeImage = (value: string) => {
        setImage(value)
    }

    const addToCart = async (id: number) => {
        const tokenString = localStorage.getItem('token')
        const token = tokenString ? JSON.parse(tokenString) : null;
        try {
            const { data} = await axios.post(`http://127.0.0.1:8000/api/cart/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },

            })

            if(data.status == 301){
            return showToast('warning', 'Produk telah di ambil');    
            }
           
            showToast('success', 'Item telah masuk keranjang');
        } catch (error) {
            console.log(error);
            showToast('error', 'Failed to add item to cart');   
        }

    }

    return (
        <div className='container mx-auto py-20'>
            <div className='block sm:grid grid-cols-2'>
                <div className='col-span-1 sm:w-[80%] sm:mx-auto mb-5'>
                    <Image src={image} height={200} width={500} className='w-full mb-4' alt={'gambar tipe main'} />
                    <div className='grid grid-cols-3 gap-4'>
                        <Image src={'/assets/shop/tanaman.jpg'} height={200} width={500} className='w-full ' alt={'gambar tipe 1'} />
                        <Image src={'/assets/shop/tanaman.jpg'} height={200} width={500} className='w-full ' alt={'gambar tipe 2'} />
                        <Image src={'/assets/shop/tanaman.jpg'} height={200} width={500} className='w-full ' alt={'gambar tipe 3'} />
                    </div>
                </div>
                <div>
                    <div className='flex items-center gap-4 mb-2'>
                        {product.categories && product.categories.map((val, key) => (
                            <p key={key} className='category-plant '>{val.name}</p>
                        ))}

                    </div>
                    <h1 className='text-3xl font-semibold mb-2'>{product?.name}</h1>
                    <div dangerouslySetInnerHTML={{ __html: product.description }} />
                    <p className='text-black font-bold text-4xl mt-5'>Rp. {product?.harga}</p>
                    <Buttons name='Tambahkan Ke Keranjang' colorScheme='primary' variant='fillDarkVariant' className='!font-bold !px-10 mt-4 !rounded-lg' onClick={() => addToCart(product.id)} />
                </div>
            </div>
        </div>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    try {
        const productsResponse = await axios.get(`${process.env.APP_DOMAIN}/api/products`);
        const productsData = productsResponse.data.data || [];

        // Buat paths dari daftar slug produk atau kategori
        const paths = productsData.map((product: any) => ({
            params: {
                slug: product.slug, // Ganti 'slug' dengan nama parameter yang sesuai
            },
        }));

        return {
            paths,
            fallback: true, // true, false, atau 'blocking'
        };
    } catch (error) {
        console.error("Error saat mengambil daftar produk:", error);
        return {
            paths: [],
            fallback: true,
        };
    }
};

export const getStaticProps: GetStaticProps<IDetailShopProps> = async (context) => {
    const { slug }: { slug?: string } = context.params ?? {};
    console.log(slug)
    try {
        // Ambil data produk berdasarkan slug
        const productResponse = await axios.get(`${process.env.APP_DOMAIN}/api/products/${slug}`);
        const productData = productResponse.data.data || {};

        return {
            props: {
                product: productData,
            },
        };
    } catch (error) {
        console.error("Error saat mengambil data produk:", error);
        return {
            props: {
                product: {},
            },
        };
    }
};

export default DetailShop;
