import axios from 'axios';
import Cookies from 'js-cookie';
import Image from 'next/image';
import * as React from 'react';
import Buttons from '~/components/button';
import cookie from 'cookie';

interface IOrderProps {
    res: any
}


export const getServerSideProps = (async ({ req }) => {
    const cookies = cookie.parse(req ? req.headers.cookie || '' : '');
    const token = cookies.token;
    const { data } = await axios.get(`${process.env.APP_DOMAIN}/api/get-order`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });


    // Pass data to the page via props
    return { props: { res: data.data } }
})


const Order: React.FunctionComponent<IOrderProps> = ({ res }) => {
    console.log(res)
    return (
        <>
            <div className='container mx-auto bg-slate-200 p-5 m-10'>
                <div className="grid grid-cols-4 gap-6">
                    <div className="flex flex-col gap-4">
                        <div className='text-center p-2 bg-primary-600 rounded-lg text-white'>
                            <button>Pesanan Saya</button>
                        </div>
                        <div className='text-center p-2 bg-primary-600 rounded-lg text-white'>
                            <button>Profil Saya</button>
                        </div>
                    </div>
                    <div className="col-span-3">
                        {res.map((val, key) =>
                        (
                            <div key={key} className='mb-7'>
                                <div className="flex justify-between w-full mb-6">
                                    <h1>Pesanan - {key + 1}</h1>
                                    <span className='category-plant'>PENDING</span>
                                </div>
                                {val.detail.map((val, keys) => (
                                    <div className='flex gap-5 mb-5' key={keys}>
                                        <Image src='/assets/plants/plant_1.png' width={300} height={300} alt='plants' />
                                        <div className='w-full'>
                                            <h1 className='text-lg'>Earphone KZ ZS10 Pro X Black Metal with MIC</h1>
                                            <h2 className='text-xl font-semibold'>Rp465.000 - {val.qty}</h2>
                                            <p className='text-md w-[350px] mt-3 mb-4'>
                                                Sound Signature / Karakter Suara : Vshape
                                                Low/Bass : Deep dan punchy, Score (4/5)
                                                Mid/Vocal : Mud lembut, Score (3/5)
                                                High/Treble : Ngecring dan Smooth, Score (5/5)
                                                Soundstage : Wide, Score (4/5)
                                            </p>
                                            <p>Berat : 240 kg</p>
                                        </div>
                                    </div>
                                ))}
                                <div className='flex justify-end mt-4'>
                                    <Buttons name='Bayar Sekarang' />
                                </div>
                            </div>
                        ))}


                    </div>
                </div>

            </div>
        </>
    );
};

export default Order;
