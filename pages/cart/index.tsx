import { FormControl, FormLabel, Input, Radio, RadioGroup, Select, Skeleton } from '@chakra-ui/react';
import Image from 'next/image';
import React, { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { getData, postData, updateData } from '~/hooks/getData';
import Buttons from '~/components/button';
import { useDelivery } from '~/stores/delivery';
import { BiPlus, BiMinus } from "react-icons/bi";
import { useRouter } from 'next/router';
import useToastStatus from '~/hooks/useToast';
import FormatCurrency from '~/utils/formatCurrency';
import ErrorMessage from '~/components/error-message';

interface ICartProps {
    province: any[]
}


const Cart: React.FunctionComponent<ICartProps> = () => {
    const [isLoadingStarted, setIsLoadingStarted] = useState<boolean>(false);
    const [cities, setCities] = useState([]);
    const [provincies, setProvincies] = useState([]);
    const [carts, setCarts] = useState([]);
    const [services, setServices] = useState([]);
    const { setDataDelivery, dataDelivery, resetDataDelivery } = useDelivery()
    const router = useRouter()
    const showToast = useToastStatus();


    const onPlusCount = (data: any) => {
        const qty = +data.qty + 1
        updateData(`/cart/${data.id}`, {
            quantity: qty
        })

        getDataCart();
    }

    const onMinusCount = (data: any) => {

        const qty = +data.qty - 1
        updateData(`/cart/${data.id}`, {
            quantity: qty
        })

        getDataCart();
    }

    const [pengiriman, setPengiriman] = useState({ value: 0, estimation: '' });
    let totalHarga = 0;
    let totalBerat = 0
    const schema = yup.object({
        first_name: yup.string().required('First name is required'),
        last_name: yup.string().required('Last name is required'),
        email: yup.string().required('Email is required').email('Invalid email format'),
        province: yup.string().required('Province is required'),
        city: yup.string().required('City is required'),
        courier: yup.string().required('Courier is required'),
    }).required();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            first_name: dataDelivery.first_name || '',
            last_name: dataDelivery.last_name || '',
            email: dataDelivery.email || '',
            province: dataDelivery.province || '',
            city: dataDelivery.city || '',
            courier: dataDelivery.courier || '',
        },
        values: {
            first_name: dataDelivery.first_name || '',
            last_name: dataDelivery.last_name || "",
            email: dataDelivery.email || "",
            courier: dataDelivery.courier || "",
            province: dataDelivery.province || "",
            city: dataDelivery.city || "",
        }
    })

    const handleRadioClick = (value: number, estimation: string) => {
        setPengiriman({ value, estimation });
    };



    const getDataCart = async () => {
        try {
            setIsLoadingStarted(true)
            const [provinces, cart] = await Promise.all([
                getData('/provinces'),
                getData('/cart',)
            ])
            setCarts(cart?.data)
            setProvincies(provinces?.data)
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
            setCities(cities?.data);
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };

    const onSubmitPembayaran = async (data: any) => {
        const tokenString = localStorage.getItem('token')
        const token = tokenString ? JSON.parse(tokenString) : null;
        console.log(data)

        setDataDelivery(data);

        const formData = new FormData();
        formData.append('origin', '501')
        formData.append('destination', data.city)
        formData.append('weight', `200`)
        formData.append('courier', data.courier)

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
            const { data } = await axios.delete(`http://127.0.0.1:8000/api/cart/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            showToast('success', 'Item telah berhasil di hapus');
            getDataCart();


        } catch (error) {
            showToast('error', 'Item gagal berhasil di hapus');
        }

    }

    const onCheckoutCart = async () => {
        try {


            if (carts?.length == 0) {
                return showToast('error', "Tambahkan Pesananmu dulu");
            }
            if (!pengiriman.value && !pengiriman.estimation) {
                showToast('error', "Isilah Detail Pengirimanmu");
            }
            const data = {
                total_biaya_product: totalHarga,
                data_buyer: {
                    ...dataDelivery,
                    cost_courier: pengiriman.value,
                    estimasi: pengiriman.estimation
                }
            }

            console.log(data)
            const checkout = await postData("/cart/checkout", data)
            resetDataDelivery()
            router.push('/order')
            showToast('success', 'Produk telah berhasil di pesan');

        } catch (error) {
            showToast('error', 'Produk gagal di pesan');
        }
    }



    return (
        <div>
            <div className='container mx-auto store-cart'>
                <table className="min-w-full table-auto mt-10">
                    <thead>
                        <tr className="text-center bg-gray-200">
                            <th className="w-[14%] py-2">Gambar</th>
                            <th className="w-[14%] py-2">Nama Produk</th>
                            <th className="w-[14%] py-2">Harga</th>
                            <th className="w-[14%] py-2">Berat</th>
                            <th className="w-[14%] py-2">Kuantitas</th>
                            <th className="w-[14%] py-2">Aksi</th>
                            <th className="w-[14%] py-2">Total Harga</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isLoadingStarted ? (
                                <tr className="text-center">
                                    <td className="py-4" colSpan="7">Loading...</td>
                                </tr>
                            ) : (
                                <>
                                    {carts?.length > 0 ? carts.map((val: any, key: number) => {
                                        totalHarga += +val.product.harga * +val.qty;
                                        totalBerat += +val.product.berat * +val.qty;
                                        return (
                                            <tr className="text-center" key={key}>
                                                <td className="py-2">
                                                    <Image src={'/assets/shop/tanaman.jpg'} height={100} width={500} className='cart-image mx-auto' alt={'gambar tipe 1'} />
                                                </td>
                                                <td className="py-2">
                                                    <h1 className="product-title">{val.product.name}</h1>
                                                </td>
                                                <td className="py-2">
                                                    <p className="product-title">{FormatCurrency(val.product.harga)}</p>
                                                </td>
                                                <td className="py-2">
                                                    <p className="product-title">{val.product.berat}</p>
                                                </td>
                                                <td className="py-2">
                                                    <div className="flex items-center gap-5 justify-center">
                                                        <span className="w-[30px] h-[30px] rounded-lg flex justify-center items-center bg-primary-400 cursor-pointer text-white" onClick={() => onPlusCount(val)}><BiPlus /></span>
                                                        <span>{val.qty}</span>
                                                        <button className={`w-[30px] h-[30px] rounded-lg flex justify-center items-center cursor-pointer ${val.qty <= 1 ? 'bg-[#C4C4C4] text-black' : 'bg-primary-400 text-white'}`} disabled={val.qty <= 1} onClick={() => onMinusCount(val)}><BiMinus /></button>
                                                    </div>
                                                </td>
                                                <td className="py-2">
                                                    <button onClick={() => onDeleteCart(val.id)}>X</button>
                                                </td>
                                                <td className="py-2">
                                                    {FormatCurrency(val.qty * val.product.harga)}
                                                </td>
                                            </tr>
                                        );
                                    }) : (
                                        <tr className="text-center">
                                            <td className="py-4" colSpan="7">Tidak ada produk di keranjang.</td>
                                        </tr>
                                    )}
                                </>
                            )
                        }
                    </tbody>
                </table>
            </div>

            <div className='container mx-auto store-cart pb-20' >
                <hr className='my-4 text-[#757575] h-[2px]' />
                <h2 className='my-4'>Cek Detail Pengiriman</h2>

                <form action="" onSubmit={handleSubmit(onSubmitPembayaran)}>
                    <div className='grid grid-cols-3 gap-7'>
                        <div>
                            <FormLabel>First Name</FormLabel>
                            <Input type='text' className='!bg-slate-200' {...register('first_name')} />
                            {errors.first_name && <ErrorMessage message={errors.first_name.message} />}
                        </div>
                        <div>
                            <FormLabel>Last Name</FormLabel>
                            <Input type='text' className='!bg-slate-200' {...register('last_name')} />
                            {errors.last_name && <ErrorMessage message={errors.last_name.message} />}
                        </div>
                        <div>
                            <FormLabel>Email</FormLabel>
                            <Input type='email' className='!bg-slate-200' {...register('email')} />
                            {errors.email && <ErrorMessage message={errors.email.message} />}
                        </div>
                    </div>
                    <div className='grid grid-cols-3 gap-7 my-5'>
                        <FormControl>
                            <FormLabel>Provinsi</FormLabel>
                            <Select placeholder='Select province' {...register('province')} className='!bg-slate-200' onChange={handleProvinceChange}>
                                {provincies && provincies.map((val: any, i: number) => (
                                    <option value={`${val.province_id},${val.province}`} key={i}>{val.province}</option>
                                ))}
                            </Select>
                            {errors.province && <ErrorMessage message={errors.province.message} />}
                        </FormControl>
                        <FormControl>
                            <FormLabel>Kota</FormLabel>
                            <Select placeholder='Select city' {...register('city')} className='!bg-slate-200'>
                                {cities && cities.map((val: any, i: number) => (
                                    <option value={val.city_id} key={i}>{val.city_name}</option>
                                ))}
                            </Select>
                            {errors.city && <ErrorMessage message={errors.city.message} />}
                        </FormControl>
                        <FormControl>
                            <FormLabel>Kurir</FormLabel>
                            <Select placeholder='Select courier' {...register('courier')} className='!bg-slate-200'>
                                <option value="jne">JNE</option>
                                <option value="pos">POS</option>
                                <option value="tiki">TIKI</option>
                            </Select>
                            {errors.courier && <ErrorMessage message={errors.courier.message} />}
                        </FormControl>
                    </div>
                    <Buttons name='Cek Detail Pembayaran' colorScheme='primary' variant='fillDarkVariant' className='!font-bold !px-10 mt-4 !rounded-lg' type='submit' />
                </form>
                <div>
                    {services.length > 0 ?
                        <TableContainer className='my-10'>
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
                                        <Tr key={i} onClick={() => handleRadioClick(val.cost[0].value, val.cost[0].etd)} className='cursor-pointer'>
                                            <Td>
                                                <input
                                                    type='radio'
                                                    name='pengiriman'
                                                    checked={pengiriman.value === val.cost[0].value}
                                                    onChange={() => handleRadioClick(val.cost[0].value, val.cost[0].etd)}
                                                />
                                            </Td>
                                            <Td>{val.description} ( {val.service} ) </Td>
                                            <Td>{val.cost[0].etd}</Td>
                                            <Td >{FormatCurrency(val.cost[0].value)}</Td>
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
                            : <input className="product-title" value={totalBerat.toFixed(1)} readOnly />
                        }
                        <div className="product-subtitle">Total Berat</div>
                    </div>
                    <div>
                        {isLoadingStarted
                            ? <Skeleton height='20px' />
                            : <div className="product-title">{FormatCurrency(totalHarga)}</div>
                        }

                        <div className="product-subtitle">Total Harga Produk</div>
                    </div>
                    <div>
                        <div className="product-title">{FormatCurrency(pengiriman.value)}</div>
                        <div className="product-subtitle">Biaya Pengiriman</div>
                    </div>
                    <div>
                        <div className="product-title">{FormatCurrency(totalHarga + pengiriman.value)}</div>
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
