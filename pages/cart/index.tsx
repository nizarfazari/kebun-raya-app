import { FormControl, FormLabel, Input, Radio, RadioGroup, Select, Skeleton } from '@chakra-ui/react';
import Image from 'next/image';
import React, { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import Head from 'next/head';
import { getData, postData, updateData } from '~/hooks/getData';
import Buttons from '~/components/button';
import { useDelivery } from '~/stores/delivery';
import { BiPlus, BiMinus } from "react-icons/bi";
import { useRouter } from 'next/router';

interface ICartProps {
    province: any[]
}


const Cart: React.FunctionComponent<ICartProps> = () => {
    const [isLoadingStarted, setIsLoadingStarted] = useState<boolean>(false);
    const [cities, setCities] = useState([]);
    const [provincies, setProvincies] = useState([]);
    const [carts, setCarts] = useState([]);
    const [services, setServices] = useState([]);
    const router = useRouter()
    const [count, setCount] = useState<number>(1)

    const onPlusCount = (data: any) => {
        const tokenString = localStorage.getItem('token')
        const token = tokenString ? JSON.parse(tokenString) : null;
        const qty = +data.qty + 1
        updateData(`/cart/${data.id}`, {
            Authorization: `Bearer ${token}`,
        }, {
            quantity: qty
        })

        getDataCart();
    }

    const onMinusCount = (data: any) => {
        const tokenString = localStorage.getItem('token')
        const token = tokenString ? JSON.parse(tokenString) : null;
        const qty = +data.qty - 1
        updateData(`/cart/${data.id}`, {
            Authorization: `Bearer ${token}`,
        }, {
            quantity: qty
        })

        getDataCart();
    }

    const [pengiriman, setPengiriman] = useState(0)
    let totalHarga = 0;
    let totalBerat = 0
    const schema = yup
        .object({
            provinsi: yup.string().required(),
            kota: yup.string().required(),
            kurir: yup.string().required(),
        })
        .required()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })



    const getDataCart = async () => {
        try {
            const tokenString = localStorage.getItem('token')
            const token = tokenString ? JSON.parse(tokenString) : null;

            setIsLoadingStarted(true)
            const [provinces, cart] = await Promise.all([
                getData('/provinces'),
                getData('/cart', {
                    Authorization: `Bearer ${token}`,
                })
            ])
            setCarts(cart?.data.data)
            setProvincies(provinces?.data.data)
            setIsLoadingStarted(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getDataCart()
    }, [])

    const handleProvinceChange = async (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        const [selectedProvinceId, selectedProvince] = selectedValue.split(',');
        console.log(selectedProvinceId)
        setCities([])
        try {
            const cities = await getData(`/city/${selectedProvinceId}`)
            setCities(cities?.data?.data);
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };

    const onSubmitPembayaran = async (data: any) => {
        const tokenString = localStorage.getItem('token')
        const token = tokenString ? JSON.parse(tokenString) : null;
        console.log(data)
        const formData = new FormData();
        formData.append('origin', '501')
        formData.append('destination', data.kota)
        formData.append('weight', '500')
        formData.append('courier', data.kurir)

        console.log(formData)
        try {
            const test = await axios.post(`http://127.0.0.1:8000/api/check_ongkir`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            setServices(test.data.data.costs)
            console.log(test.data.data)
        } catch (error) {
            console.log(error)
        }
    }


    const onDeleteCart = async (id: number) => {
        const tokenString = localStorage.getItem('token')
        const token = tokenString ? JSON.parse(tokenString) : null;
        console.log(id)
        try {
            await axios.delete(`http://127.0.0.1:8000/api/cart/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        } catch (error) {
            console.log(error)
        }

    }

    const onCheckoutCart = async () => {
        const tokenString = localStorage.getItem('token')
        const token = tokenString ? JSON.parse(tokenString) : null;

        const test = await postData("/cart/checkout", {}, {
            Authorization: `Bearer ${token}`,
        })
        router.push('/order')

    }

    const handlePayButtonClick = async (data: any) => {
        const tokenString = localStorage.getItem('token')
        const token = tokenString ? JSON.parse(tokenString) : null;
        console.log(data)
        const totalBiaya = totalHarga + pengiriman;
        const formData = {
            name: "test",
            email: "test@gmail.com",
            province: "Kalimantan",
            city: "asdas",
            total_harga: totalBiaya
        }
        // const formData = new FormData();
        // formData.append('name', 'test')
        // formData.append('email', "test@gmail.com")
        // formData.append('province', 'Kalimantan')
        // formData.append('city', 'SADSA')
        // formData.append('total_harga', totalBiaya)

        try {
            const test = await axios.post(`http://127.0.0.1:8000/api/midtrans`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            console.log(test)
        } catch (error) {
            console.log(error)
        }
        console.log(data)

        // Mengganti TRANSACTION_TOKEN_HERE dengan token transaksi yang sebenarnya
        // window.snap.pay(test, {
        //     onSuccess: function (result) {
        //         alert("Pembayaran berhasil!");
        //         console.log(result);
        //     },
        //     onPending: function (result) {
        //         alert("Menunggu pembayaran Anda!");
        //         console.log(result);
        //     },
        //     onError: function (result) {
        //         alert("Pembayaran gagal!");
        //         console.log(result);
        //     },
        //     onClose: function () {
        //         alert('Anda menutup popup tanpa menyelesaikan pembayaran');
        //     }
        // });
    };




    // if (isLoadingStarted) {
    //     return <p>Tunggu dulu</p>
    // }
    return (
        <div>
            <Head>
                <title>Halaman Cart</title>
                <meta name="description" content="Ini adalah halaman keranjang" />
                <script
                    type="text/javascript"
                    src="https://app.sandbox.midtrans.com/snap/snap.js"
                    data-client-key="SB-Mid-client-8cICejslwLQH-F0u"
                    defer ></script>
                <link rel="icon" href="/favicon.ico" />
            </Head>


            <div className='container mx-auto store-cart'>
                <table className='w-full '>
                    <thead className='h-[70px]'>
                        <tr className='text-center'>
                            <td className=''>Gambar</td>
                            <td>Nama</td>
                            <td>Harga</td>
                            <td>Berat per satuan</td>
                            <td>Jumlah</td>
                            <td>Menu</td>
                            <td>Jumlah Subtotal</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isLoadingStarted ? (
                                <tr className='text-center ' >
                                    <td className='w-[20%] '>



                                    </td>
                                    <td className='w-[20%]'>


                                    </td>
                                    <td className='w-[20%] '>


                                    </td>
                                    <td className='w-[15%] text-center'>


                                    </td>
                                    <td className='w-[15%] text-center'>


                                    </td>
                                    <td className='w-[20%]'>


                                    </td>
                                    <td className='w-[20%]'>


                                    </td>
                                </tr>
                            ) : (
                                <>
                                    {carts?.length > 0 ? carts.map((val, key) => {
                                        totalHarga += +val.product.harga * +val.qty
                                        totalBerat += +val.product.berat * +val.qty
                                        return (
                                            <tr className='text-center ' key={key}>
                                                <td className='w-[20%] '>
                                                    <Image src={'/assets/shop/tanaman.jpg'} height={100} width={500} className='cart-image mx-auto' alt={'gambar tipe 1'} />
                                                </td>
                                                <td className='w-[20%]'>
                                                    <h1 className='product-title'>{val.product.name}</h1>
                                                </td>
                                                <td className='w-[20%] '>
                                                    <p className='product-title'>Rp.{val.product.harga}</p>
                                                </td>
                                                <td className='w-[15%] text-center'>
                                                    <p className='product-title'>{val.product.berat}</p>
                                                </td>
                                                <td className='w-[15%] text-center'>
                                                    <div className='flex items-center gap-5 justify-center'>
                                                        <span className='w-[30px] h-[30px] rounded-lg flex justify-center items-center bg-primary-400  cursor-pointer text-white' onClick={() => onPlusCount(val)}><BiPlus /></span>
                                                        <span>{val.qty}</span>
                                                        <button className={`w-[30px] h-[30px] rounded-lg flex justify-center items-center  cursor-pointer ${val.qty <= 1 ? 'bg-[#C4C4C4] text-black' : 'bg-primary-400 text-white'}`} disabled={val.qty <= 1 ? true : false} onClick={() => onMinusCount(val)}><BiMinus /></button>

                                                    </div>
                                                </td>
                                                <td className='w-[20%]'>
                                                    <button onClick={() => onDeleteCart(val.id)}>X</button>
                                                </td>
                                                <td className='w-[20%]'>
                                                    {val.qty * val.product.harga}
                                                </td>
                                            </tr>

                                        )
                                    }) :
                                        <></>
                                    }
                                </>)
                        }
                    </tbody>
                </table>
            </div>

            <div className='container mx-auto store-cart pb-20' >
                <hr className='my-4 text-[#757575] h-[2px]' />
                <h2 className='my-4'>Cek Detail Pengiriman</h2>

                <form action="" onSubmit={handleSubmit(onSubmitPembayaran)}>
                    <div className='grid grid-cols-3 gap-7 my-5'>
                        <FormControl>
                            <FormLabel>Provinsi</FormLabel>
                            <Select placeholder='Select country' {...register('provinsi')} className='!bg-slate-200' onChange={handleProvinceChange} >
                                {provincies && provincies.map((val: any, i: number) => (
                                    <option value={`${val.province_id},${val.province}`} key={i} >{val.province}</option>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Kota</FormLabel>
                            <Select placeholder='Select country'{...register('kota')} className='!bg-slate-200'>
                                {cities && cities.map((val: any, i: number) => (
                                    <option value={val.city_id} key={i}>{val.city_name}</option>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Kurir</FormLabel>
                            <Select placeholder='Select country' {...register('kurir')} className='!bg-slate-200'>
                                <option value="jne">JNE</option>
                                <option value="pos">POS</option>
                                <option value="tiki">TIKI</option>
                            </Select>
                        </FormControl>
                    </div>
                    <button type="submit" className='w-full py-2 rounded-lg bg-primary-700 text-white mt-7'>Cek Detail Pembayaran</button>
                </form>
                <div>
                    {services.length > 0 ?
                        <TableContainer>
                            <Table variant='simple'>
                                <Thead>
                                    <Tr>
                                        <Th>Pilihan</Th>
                                        <Th>Services</Th>
                                        <Th>Estimasi</Th>
                                        <Th >Harga</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {services && services.map((val: any, i: number) => (
                                        <Tr key={i}>
                                            <Td>
                                                <input type="radio" name="test" id="" onClick={() => setPengiriman(val.cost[0].value)} />
                                            </Td>
                                            <Td>{val.description} ( {val.service} ) </Td>
                                            <Td>{val.cost[0].etd}</Td>
                                            <Td >{val.cost[0].value}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>

                        : <></>}
                </div>

                <hr className='my-4 text-[#757575] h-[2px]' />
                <h2 className='my-4'>Detail Pembayaran</h2>
                <form className='grid grid-cols-6'>
                    <div>
                        {isLoadingStarted
                            ? <Skeleton height='20px' />
                            : <input className="product-title" value={totalBerat} readOnly />
                        }
                        <div className="product-subtitle">Total Berat</div>
                    </div>
                    <div>
                        {isLoadingStarted
                            ? <Skeleton height='20px' />
                            : <div className="product-title">Rp. {totalHarga}</div>
                        }

                        <div className="product-subtitle">Total Harga Produk</div>
                    </div>
                    <div>
                        <div className="product-title">Rp. {pengiriman}</div>
                        <div className="product-subtitle">Biaya Pengiriman</div>
                    </div>
                    <div>
                        <div className="product-title">Rp. {totalHarga + pengiriman}</div>
                        <div className="product-subtitle">Total</div>
                    </div>
                    <div className='col-span-2'>
                        <Buttons name='Tambahkan Ke Pesanan' colorScheme='primary' variant='fillDarkVariant' className='!font-bold !px-10 mt-4 !rounded-lg' onClick={onCheckoutCart} />
                    </div>
                </form>
            </div>

        </div>
    );
};

export default Cart;
