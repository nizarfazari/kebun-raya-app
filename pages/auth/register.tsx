import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
interface IRegisterProps {
}

const Register: React.FunctionComponent<IRegisterProps> = (props) => {
    const [show, setShow] = useState<boolean>(false)
    const handleClick = () => setShow(!show)
    const [showConfirm, setShowConfirm] = useState<boolean>(false)
    const handleClickConfirm = () => setShowConfirm(!showConfirm)
    return (
        <>
            <div className="container mx-auto p-10">
                <div className=''>
                    <h2 className='sm:text-3xl text-2xl mb-7 max-w-[500px] mx-auto'>
                        Memulai tanaman dan berkebun, <br />
                        menjadi lebih mudah
                    </h2>
                    <form action="" className='flex flex-col gap-4 max-w-[500px] mx-auto'>
                        <FormControl>
                            <FormLabel>Nama</FormLabel>
                            <Input type='email' className='!bg-slate-100 !border !border-slate-600' />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input type='email' className='!bg-slate-100 !border !border-slate-600' />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <InputGroup >
                                <Input type={show ? 'text' : 'password'} placeholder='Enter password' className='!bg-slate-100 !border !border-slate-600' />
                                <InputRightElement width='4.5rem'>
                                    <div onClick={handleClick}>
                                        {show ? <AiFillEye /> : <AiFillEyeInvisible />}
                                    </div>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Konfirmasi Password</FormLabel>
                            <InputGroup >
                                <Input type={showConfirm ? 'text' : 'password'} placeholder='Enter password' className='!bg-slate-100 !border !border-slate-600 focus-visible:!shadow-primary-500' />
                                <InputRightElement width='4.5rem'>
                                    <div onClick={handleClickConfirm}>
                                        {showConfirm ? <AiFillEye /> : <AiFillEyeInvisible />}
                                    </div>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <button type="submit" className='w-full py-2 rounded-lg bg-primary-700 text-white mt-7'>Register</button>
                        <p className='text-center font-no   rmal text-sm'>Apakah anda sudah punya akun? <Link href={'/auth/login'} className='text-primary-700 font-semibold'>Login</Link></p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Register;
