import { Alert, Button, FormControl, FormLabel, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { SubmitHandler, useForm } from 'react-hook-form';
import AlertChakra from '~/components/alert-chakra';
interface IRegisterProps {
}

const schema = yup
    .object({
        name: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().required(),
        confirm_password: yup.string().required().oneOf([yup.ref('password'), ''], 'Passwords must match'),
    })
    .required()

const Register: React.FunctionComponent<IRegisterProps> = (props) => {
    const [show, setShow] = useState<boolean>(false)
    const handleClick = () => setShow(!show)
    const [showConfirm, setShowConfirm] = useState<boolean>(false)
    const handleClickConfirm = () => setShowConfirm(!showConfirm)

    type Inputs = {
        name: string
        email: string
        password: string
        confirm_password: string
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: yupResolver(schema),
    })
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

    console.log(errors)
    return (
        <>
            <div className="container mx-auto p-10">
                <div className=''>
                    <h2 className='sm:text-3xl text-2xl mb-7 max-w-[500px] mx-auto'>
                        Memulai tanaman dan berkebun, <br />
                        menjadi lebih mudah
                    </h2>
                    <form action="" className='flex flex-col gap-4 max-w-[500px] mx-auto' onSubmit={handleSubmit(onSubmit)}>
                        {Object.keys(errors).length > 0 && (
                            <AlertChakra description='Terdapat masalah pada form' />
                        )}
                        <FormControl className='h-[80px]'>
                            <FormLabel>Nama</FormLabel>
                            <Input type='text' className='!bg-slate-100 !border !border-slate-600 focus-visible:!border-primary-500 focus-visible:!shadow-none' {...register('name')} />
                            <p className='text-rose-600'>
                                {errors.name && errors.name.message}
                            </p>
                        </FormControl>
                        <FormControl className='h-[80px]'>
                            <FormLabel>Email</FormLabel>
                            <Input type='email' className='!bg-slate-100 !border !border-slate-600 focus-visible:!border-primary-500 focus-visible:!shadow-none' {...register('email')} />
                            <p className='text-rose-600'>
                                {errors.email && errors.email.message}
                            </p>
                        </FormControl>
                        <FormControl className='h-[80px]'>
                            <FormLabel>Password</FormLabel>
                            <InputGroup >
                                <Input type={show ? 'text' : 'password'} placeholder='Enter password' className='!bg-slate-100 !border !border-slate-600 focus-visible:!border-primary-500 focus-visible:!shadow-none' {...register('password')} autoComplete='password' />
                                <InputRightElement width='4.5rem'>
                                    <div onClick={handleClick}  className='cursor-pointer'>
                                        {show ? <AiFillEye /> : <AiFillEyeInvisible />}
                                    </div>
                                </InputRightElement>
                            </InputGroup>
                            <p className='text-rose-600'>
                                {errors.password && errors.password.message}
                            </p>
                        </FormControl>
                        <FormControl className='h-[80px]'>
                            <FormLabel>Konfirmasi Password</FormLabel>
                            <InputGroup >
                                <Input type={showConfirm ? 'text' : 'password'} placeholder='Enter password' className='!bg-slate-100 !border !border-slate-600 focus-visible:!border-primary-500 focus-visible:!shadow-none' {...register('confirm_password')} autoComplete="confirm_password" />
                                <InputRightElement width='4.5rem'>
                                    <div onClick={handleClickConfirm}  className='cursor-pointer'>
                                        {showConfirm ? <AiFillEye /> : <AiFillEyeInvisible />}
                                    </div>
                                </InputRightElement>
                            </InputGroup>
                            <p className='text-rose-600'>
                                {errors.confirm_password && errors.confirm_password.message}
                            </p>
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
