import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import Buttons from '~/components/button';

interface ILoginProps {
}

const Login: React.FunctionComponent<ILoginProps> = (props) => {
    return (
        <>
            <div className='container mx-auto'>
                <div className='grid xl:grid-cols-2 grid-cols-1 p-10'>
                    <div className='xl:flex  hidden justify-center'>
                        <Image
                            src="/assets/login-placeholder.png"
                            alt=""
                            width={400}
                            height={400}
                            className="w-50 mb-4 mb-lg-none"
                        />
                    </div>
                    <div className=''>
                        <h2 className='sm:text-3xl text-2xl mb-7 max-w-[500px] mx-auto'>
                            Belanja kebutuhan utama, <br />
                            menjadi lebih mudah
                        </h2>
                        <form action="" className='flex flex-col gap-4 max-w-[500px] mx-auto'>
                            <FormControl>
                                <FormLabel>Email address</FormLabel>
                                <Input type='email' className='!bg-slate-200 !border !border-slate-400' />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Password</FormLabel>
                                <Input type='email' className='!bg-slate-200' />
                            </FormControl>
                            <button type="submit" className='w-full py-2 rounded-lg bg-primary-700 text-white mt-7'>Login</button>
                            <p className='text-center font-normal text-sm'>Apakah anda sudah punya akun? <Link href={'/auth/register'} className='text-primary-700 font-semibold'>Register</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
