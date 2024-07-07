import { FormControl, FormLabel ,Input} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import Buttons from '~/components/button';

interface IProfilProps {
}

const Profil: React.FunctionComponent<IProfilProps> = (props) => {
    const { query, push, pathname } = useRouter()
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
    return (
        <div className='container mx-auto  px-5 m-10'>
            <div className="grid grid-cols-4 gap-6">
                <div className="flex flex-col gap-4 bg-slate-200 p-5 h-fit rounded-lg">
                    {buttonLeftSide.map((val, i) => (
                        <Link key={i} className={`text-center p-2 rounded-lg ${pathname == val.url ? " bg-primary-600 text-white font-medium" : " bg-white  font-normal"}`} href={val.url}>{val.name}</Link>
                    ))}
                </div>
                <div className="col-span-3 bg-white border border-slate-200 h-fit rounded-lg shadow-lg p-5">
                    <h1 className='text-xl mb-5'>Profil Saya</h1>
                    <form action="">
                        <FormControl className='h-[80px]'>
                            <FormLabel htmlFor='email'>Nama</FormLabel>
                            <Input type='email' id='email' className='!bg-slate-100 !border !border-slate-600 focus-visible:!border-primary-500 focus-visible:!shadow-none'  />
                            {/* <p className='text-rose-600'>
                                {errors.email && errors.email.message}
                            </p> */}
                        </FormControl>
                        <FormControl className='h-[80px]'>
                            <FormLabel htmlFor='email'>Email address</FormLabel>
                            <Input type='email' id='email' className='!bg-slate-100 !border !border-slate-600 focus-visible:!border-primary-500 focus-visible:!shadow-none'  />
                            {/* <p className='text-rose-600'>
                                {errors.email && errors.email.message}
                            </p> */}
                        </FormControl>
                        <FormControl className='h-[80px]'>
                            <FormLabel htmlFor='email'>Password</FormLabel>
                            <Input type='email' id='email' className='!bg-slate-100 !border !border-slate-600 focus-visible:!border-primary-500 focus-visible:!shadow-none'  />
                            {/* <p className='text-rose-600'>
                                {errors.email && errors.email.message}
                            </p> */}
                        </FormControl>
                        <FormControl className='h-[80px]'>
                            <FormLabel htmlFor='email'>Konfirmasi Password</FormLabel>
                            <Input type='email' id='email' className='!bg-slate-100 !border !border-slate-600 focus-visible:!border-primary-500 focus-visible:!shadow-none'  />
                            {/* <p className='text-rose-600'>
                                {errors.email && errors.email.message}
                            </p> */}
                        </FormControl>
                        <div className='flex justify-end gap-3'>
                        <Buttons name='Ubah Profil' colorScheme='orange' variant='fillDarkVariant'  className='!font-bold !px-10 mt-4 !rounded-lg'  />
                        <Buttons name='Simpan Perubahan' colorScheme='primary' variant='fillDarkVariant'  className='!font-bold !px-10 mt-4 !rounded-lg'  />
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default Profil;
