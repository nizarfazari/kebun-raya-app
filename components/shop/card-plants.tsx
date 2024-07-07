import Image from 'next/image';
import * as React from 'react';
import Buttons from '../button';
import Link from 'next/link';
import axios from 'axios';
import useToastStatus from '~/hooks/useToast';

interface PlantData {
    id: number;
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
    const showToast = useToastStatus();
    const addToCart = async (id: number) => {
        const tokenString = localStorage.getItem('token')
        const token = tokenString ? JSON.parse(tokenString) : null;
        try {
            const { data } = await axios.post(`http://127.0.0.1:8000/api/cart/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },

            })

            if (data.status == 301) {
                return showToast('warning', 'Produk telah di ambil');
            }

            showToast('success', 'Item telah masuk keranjang');
        } catch (error) {
            console.log(error);
            showToast('error', 'Failed to add item to cart');
        }

    }
    return (
        <>
            <div className='p-5 shadow rounded-lg'>
                <Link href={`/shop/${data.slug}`}>
                    <div>
                        <Image src='/assets/plants/plant_1.png' width={250} height={175} alt="Logo Kebun Raya" className='w-full' />
                        <div className='flex items-center gap-4 mt-4'>
                            {data.categories && data.categories.map((val, i) => (
                                <p className='category-plant  !bg-[#26C281]' key={i}>{val?.name}</p>
                            ))}
                        </div>
                        <h1 className='font-bold sm:text-2xl mt-2'>{data?.harga}</h1>
                        <p className='text-lg'>{data?.name}</p>
                        <p className='text-md'>Stock :  {data?.stock}</p>
                    </div>
                </Link>
                <div className='flex gap-4 mt-5'>
                    <Buttons name='Tambahkan Ke Keranjang' colorScheme='primary.400' variant='outlineVariant' className='!font-bold w-full pointer-events-auto' onClick={() => addToCart(data.id)} />
                </div>
            </div>
        </>
    );
};

export default CardPlant;
