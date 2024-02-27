import { FormControl, FormHelperText, FormLabel, Input, Select } from '@chakra-ui/react';
import Image from 'next/image';
import React, { useState } from 'react';
import { BiPlus, BiMinus } from "react-icons/bi";
import Buttons from '~/components/button';
interface ICartProps {
}

const Cart: React.FunctionComponent<ICartProps> = (props) => {
    const [count, setCount] = useState<number>(0)

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
    return (
        <div className='container mx-auto store-cart py-20'>
            <table className='w-full '>
                <thead className='h-[70px]'>
                    <tr >
                        <td className=''>Gambar</td>
                        <td>Nama</td>
                        <td>Harga</td>
                        <td>Jumlah</td>
                        <td>Menu</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='w-[20%]'><Image src={'/assets/shop/tanaman.jpg'} height={100} width={500} className='cart-image' alt={'gambar tipe 1'} /></td>
                        <td className='w-[20%]'>
                            <h1 className='product-title'>Tanaman Rambut</h1>
                        </td>
                        <td className='w-[20%]'>
                            <p className='product-title'>Rp.20000</p>
                        </td>
                        <td className='w-[20%]'>
                            <div className='flex items-center gap-5'>
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
                        <FormLabel>Email address</FormLabel>
                        <Input type='email' className='!bg-slate-200' />
                    </div>
                    <div>
                        <FormLabel>Email address</FormLabel>
                        <Input type='email' className='!bg-slate-200' />
                    </div>
                </div>
                <div className='grid grid-cols-3 gap-7 my-5'>
                    <div>
                        <FormLabel>Country</FormLabel>
                        <Select placeholder='Select country' className='!bg-slate-200'>
                            <option>United Arab Emirates</option>
                            <option>Nigeria</option>
                        </Select>
                    </div>
                    <div>
                        <FormLabel>Country</FormLabel>
                        <Select placeholder='Select country' className='!bg-slate-200'>
                            <option>United Arab Emirates</option>
                            <option>Nigeria</option>
                        </Select>
                    </div>
                    <div>
                        <FormLabel>Email address</FormLabel>
                        <Input type='email' className='!bg-slate-200' />
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
            </FormControl>
            <hr className='my-4 text-[#757575] h-[2px]' />
            <h2 className='my-4'>Detail Pembayaran</h2>
            <div className='grid grid-cols-6'>
                <div>
                    <div className="product-title">Rp.5000</div>
                    <div className="product-subtitle">Pajak</div>
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
                <Buttons name='Tambahkan Ke Keranjang' color='primary' variant='fillDarkVariant' className='!font-bold !px-10 mt-4 !rounded-lg' />
                </div>
            </div>
        </div>
    );
};

export default Cart;
