import axios from 'axios';
import Cookies from 'js-cookie';
import Image from 'next/image';
import * as React from 'react';
import Buttons from '~/components/button';
import cookie from 'cookie';
import Head from 'next/head';
import Script from 'next/script';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
} from '@chakra-ui/react'
import { GetServerSideProps } from 'next';
import FormatCurrency from '~/utils/formatCurrency';

interface ModalDataType {
    image: string;
    no_receipt: string;
}


interface IOrderProps {
    res: any
    status: string
}


interface ServerSideProps {
    res: any;
    status: string;
}

declare global {
    interface Window {
        snap: {
            pay: (
                token: string,
                options: {
                    onSuccess: (result: any) => void;
                    onPending: (result: any) => void;
                    onError: (result: any) => void;
                    onClose: () => void;
                }
            ) => void;
        };
    }
}


export const getServerSideProps: GetServerSideProps<ServerSideProps> = async ({ req, query }) => {
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.token as string;

    const status = typeof query.status === 'string' ? query.status : 'pending';

    try {
        const { data } = await axios.get(`${process.env.APP_DOMAIN}/api/get-order?status=${status}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(data);

        // Pass data to the page via props
        return { props: { res: data.data, status } };
    } catch (error) {
        console.error("Error fetching data:", error);
        return { props: { res: null, status } }; // Handle error case gracefully
    }
};

const onPayment = async (id: number) => {
    const tokenString = localStorage.getItem('token')
    const token = tokenString ? JSON.parse(tokenString) : null;
    try {
        const { data } = await axios.post(`http://127.0.0.1:8000/api/midtrans`, { id: id }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        

        window.snap.pay(data.data, {
            onSuccess: async function (result: any) {

                try {
                    await axios.post(`http://127.0.0.1:8000/api/midtrans-success`, { order_id: result.order_id }, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                } catch (error) {
                    console.log(error)
                }
            },
            onPending: function (result: any) {
                alert("Menunggu pembayaran Anda!");
                console.log(result);
            },
            onError: function (result: any) {
                alert("Pembayaran gagal!");
                console.log(result);
            },
            onClose: function () {
                alert('Anda menutup popup tanpa menyelesaikan pembayaran');
            }
        });
        // console.log(test)
    } catch (error) {
        console.log(error)
    }
}


const checkStatus = (status: string) => {
    if (status == 'PENDING') {
        return (<span className='category-plant !bg-blue-500'> PENDING </span>)
    } else if (status == "SUDAH-DIBAYAR") {
        return (<span className='category-plant !bg-amber-500'> MENUNGGU PENGIRIMAN </span>)
    } else if (status == "DIKIRIM") {
        return (<span className='category-plant !bg-purple-500'> DIKIRIM </span>)
    } else if (status == "DITERIMA") {
        return (<span className='category-plant !bg-teal-500'> DITERIMA </span>)
    }
}


const Order: React.FunctionComponent<IOrderProps> = ({ res, status }) => {
    console.log(res)
    const { query, push, pathname } = useRouter()
    const [active, setActive] = React.useState(query.status || 'pending')
    const [modalData, setModalData] = React.useState<ModalDataType | null>(null)
    const { isOpen, onOpen, onClose } = useDisclosure()
    console.log(res)
    const statusTransaction = [
        {
            id: 1,
            name: "PENDING",
            url: 'pending',
        },
        {
            id: 2,
            name: "SUDAH DIBAYAR",
            url: 'sudah-dibayar'
        },
        {
            id: 3,
            name: "DIKIRIM",
            url: 'dikirim'
        },
        {
            id: 4,
            name: "DITERIMA",
            url: 'diterima'
        }
        ,
        {
            id: 4,
            name: "DIBATALKAN",
            url: 'dibatalkan'
        }
    ]

    const buttonLeftSide = [
        {
            name: "Profil Saya",
            url: "/profil"
        },
        {
            name: "Pesanan Saya",
            url: "/order"
        },
    ]

    const onOpenModal = (data: any) => {
        console.log(data)
        setModalData(data)
        onOpen()
    }

    const onSuccessStatus = async (order_id: string) => {
        const tokenString = localStorage.getItem('token')
        const token = tokenString ? JSON.parse(tokenString) : null;
        try {
            await axios.post(`http://127.0.0.1:8000/api/transaction/accepted`, { order_id: order_id }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Head>
                <title>Halaman Cart</title>
                <meta name="description" content="Ini adalah halaman keranjang" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />

                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Script
                src="https://app.sandbox.midtrans.com/snap/snap.js"
                data-client-key="SB-Mid-client-8cICejslwLQH-F0u"
                strategy="afterInteractive"
            />
            <div className='container mx-auto  px-5 m-10'>
                <div className="grid grid-cols-4 gap-6">
                    <div className="flex flex-col gap-4 bg-slate-200 p-5 h-fit rounded-lg">
                        {buttonLeftSide.map((val, i) => (
                            <Link key={i} className={`text-center p-2 rounded-lg ${pathname == val.url ? " bg-primary-600 text-white font-medium" : " bg-white   font-normal"}`} href={val.url}>{val.name}</Link>
                        ))}
                    </div>
                    <div className="col-span-3 bg-[#f5f3f3] h-fit rounded-lg shadow-lg">
                        <div className='flex outline-1  rounded-sm  border-b border-gray-400'>
                            {statusTransaction.map((val, i) => (
                                <div className={`flex-1 text-center p-4 cursor-pointer  ${status == val.url ? 'border-b-4 border-solid border-primary-400 font-semibold text-primary-400' : 'asd'}`} key={i} onClick={() => push(`/order?status=${val.url}`)}>{val.name} </div>
                            ))}
                        </div>
                        <div className='bg-white '>
                            <div className='p-5'>

                                {res && res.map((value: any, key: number) =>
                                (
                                    <div key={key} className='mb-7 p-5 bg-white border border-slate-200 shadow-lg rounded-lg'>
                                        <div className="flex justify-between w-full ">
                                            <h1>No Transaction : {value.no_transaction} </h1>
                                            {checkStatus(value.status)}
                                        </div>
                                        <h1 className='mb-5'>Pesanan - {value?.transaction_buyer?.first_name + " " + value?.transaction_buyer?.last_name}</h1>
                                        {value.detail.map((val: any, keys: number) => (
                                            <div className='flex gap-5 mb-5' key={keys}>
                                                <Image src='/assets/plants/plant_1.png' width={150} height={150} alt='plants' />
                                                <div className='w-full'>
                                                    <h1 className='text-lg'>{val.product.name}</h1>
                                                    <h2 className='text-xl font-semibold'>{FormatCurrency(val.product.harga)} - {val.qty} </h2>
                                                    <p>Berat : {val.product.berat} gram</p>
                                                    <p>Biaya Pengiriman : {FormatCurrency(value.transaction_buyer?.cost_courier)}</ p>
                                                    <p>Total Harga per Item : {FormatCurrency(val.product.harga * val.qty)}</p>
                                                </div>
                                            </div>
                                        ))}
                                        <div className='flex justify-between items-end gap-5'>
                                            <div>
                                                Total Harga {FormatCurrency(+value?.total_biaya_product + +value.transaction_buyer?.cost_courier)}
                                            </div>
                                            {value.status === 'PENDING' ? (
                                                <>
                                                    <Buttons name='Bayar Sekarang' onClick={() => onPayment(value.id)} colorScheme='primary.400' variant='fillVariant' />
                                                </>) : value.status == 'sudah-dibayar' ?
                                                (
                                                    <>

                                                    </>
                                                ) : value.status == 'DIKIRIM' ?
                                                    <>
                                                        <Buttons name='Cek Resi' colorScheme='primary.400' variant='fillVariant' onClick={() => onOpenModal(value.receipt)} />
                                                        <Buttons name='Diterima' colorScheme='primary.400' variant='fillVariant' onClick={() => onSuccessStatus(value.order_id_midtrans)} />
                                                    </> :
                                                    <>
                                                    </>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {modalData ? (<>
                            <Image src={`${modalData.image}`} height={200} width={200} alt='bukti resi' />
                            <h1>{modalData.no_receipt}</h1>
                        </>) : ''}

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='ghost'>Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default Order;
