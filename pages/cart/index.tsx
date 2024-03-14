import { FormControl, FormHelperText, FormLabel, Input, Select } from '@chakra-ui/react';
import Image from 'next/image';
import React, { ChangeEvent, useState } from 'react';
import { BiPlus, BiMinus } from "react-icons/bi";
import Buttons from '~/components/button';
import axios from 'axios';
import { InferGetStaticPropsType } from 'next';
interface ICartProps {
    province: any[]
}


export const getStaticProps = async () => {
    try {
        const { data } = await axios.get(`${process.env.APP_DOMAIN}/api/provinces`);
        return {
            props: {
                province: data.data || []
            }
        };
    } catch (error) {
        console.error("Error saat mengambil data:", error);
        return {
            props: {
                province: [] // Mengembalikan array kosong jika terjadi kesalahan
            }
        };
    }
};
const Cart: React.FunctionComponent<ICartProps> = ({
    province
}: InferGetStaticPropsType<typeof getStaticProps>) => {

    const [count, setCount] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [cities, setCities] = useState([]);

    console.log(cities)
    const onPlusCount = () => {
        setCount(count + 1)
    }

    const onMinusCount = () => {
        if (count <= 0) {
            setCount(0)
        } else {
            setCount(count - 1)
        }
    }

    const handleProvinceChange = async (e : ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        setCities([])
        try {
            setIsLoading(true)
            const { data } = await axios.get(`http://127.0.0.1:8000/api/city/${selectedValue}`);
            setCities(data.data);
            setIsLoading(false)
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };


    return (
        <div className='container mx-auto store-cart py-20'>
            <table className='w-full '>
                <thead className='h-[70px]'>
                    <tr className='text-center'>
                        <td className=''>Gambar</td>
                        <td>Nama</td>
                        <td>Harga</td>
                        <td>Berat per satuan</td>
                        <td>Jumlah</td>
                        <td>Menu</td>
                    </tr>
                </thead>
                <tbody>
                    <tr className='text-center'>
                        <td className='w-[20%] '>
                            <Image src={'/assets/shop/tanaman.jpg'} height={100} width={500} className='cart-image mx-auto' alt={'gambar tipe 1'} />
                        </td>
                        <td className='w-[20%]'>
                            <h1 className='product-title'>Tanaman Rambut</h1>
                        </td>
                        <td className='w-[20%] '>
                            <p className='product-title'>Rp.20000</p>
                        </td>
                        <td className='w-[15%] text-center'>
                            <p className='product-title'>250</p>
                        </td>
                        <td className='w-[20%] '>
                            <div className='flex items-center gap-5 justify-center'>
                                <span className='w-[30px] h-[30px] rounded-lg flex justify-center items-center bg-primary-400  cursor-pointer' onClick={onPlusCount}><BiPlus className='text-white' /></span>
                                <span>{count}</span>
                                <span className='w-[30px] h-[30px] rounded-lg flex justify-center items-center bg-[#C4C4C4] cursor-pointer' onClick={onMinusCount}><BiMinus className='text-black' /></span>

                            </div>
                        </td>
                        <td className='w-[20%]'>
                            <button>X</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <hr className='my-4 text-[#757575] h-[2px]' />
            <h2 className='my-4'>Detail Pengiriman</h2>
            <FormControl >
                <div className='grid grid-cols-2 gap-7'>
                    <div>
                        <FormLabel>Nama</FormLabel>
                        <Input type='email' className='!bg-slate-200' />
                    </div>
                    <div>
                        <FormLabel>Email address</FormLabel>
                        <Input type='email' className='!bg-slate-200' />
                    </div>
                </div>
                <div className='grid grid-cols-3 gap-7 my-5'>
                    <div>
                        <FormLabel>Provinsi</FormLabel>
                        <Select placeholder='Select country' className='!bg-slate-200' onChange={handleProvinceChange}>
                            {province && province.map((val: any, i: number) => (
                                <option value={val.province_id} key={i}>{val.province}</option>
                            ))}
                        </Select>
                    </div>
                    <div>
                        <FormLabel>Kota</FormLabel>
                        <Select placeholder='Select country' className='!bg-slate-200'>
                            {cities && cities.map((val: any, i: number) => (
                                <option value={val.city_id} key={i}>{val.city_name}</option>
                            ))}
                        </Select>
                    </div>
                    <div>
                        <FormLabel>Kota</FormLabel>
                        <Select placeholder='Select country' className='!bg-slate-200'>
                            <option value="jne">JNE</option>
                            <option value="pos">POS</option>
                            <option value="tiki">TIKI</option>
                        </Select>
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-7'>
                    <div>
                        <FormLabel>Email address</FormLabel>
                        <Input type='email' className='!bg-slate-200' />
                    </div>
                    <div>
                        <FormLabel>Email address</FormLabel>
                        <Input type='email' className='!bg-slate-200' />
                    </div>
                </div>
                <Buttons name='Cek Detail Pembayaran' color='primary' variant='fillDarkVariant' className='!font-bold !px-10 mt-4 !rounded-lg' />
            </FormControl>
            <hr className='my-4 text-[#757575] h-[2px]' />
            <h2 className='my-4'>Detail Pembayaran</h2>
            <div className='grid grid-cols-6'>
                <div>
                    <div className="product-title">5000 gram</div>
                    <div className="product-subtitle">Total Berat</div>
                </div>
                <div>
                    <div className="product-title">Rp.5000</div>
                    <div className="product-subtitle">Total Harga Produk</div>
                </div>
                <div>
                    <div className="product-title">Rp.5000</div>
                    <div className="product-subtitle">Biaya Pengiriman</div>
                </div>
                <div>
                    <div className="product-title">Rp.5000</div>
                    <div className="product-subtitle">Total</div>
                </div>
                <div className='col-span-2'>
                    <Buttons name='Tambahkan Ke Pesanan' color='primary' variant='fillDarkVariant' className='!font-bold !px-10 mt-4 !rounded-lg' />
                </div>
            </div>
        </div>
    );
};

export default Cart;
