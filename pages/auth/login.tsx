import { FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import AlertChakra from '~/components/alert-chakra';


interface ILoginProps {
}

const schema = yup
    .object({
        email: yup.string().email().required(),
        password: yup.string().required(),
    })
    .required()

const Login: React.FunctionComponent<ILoginProps> = (props) => {
    const [show, setShow] = useState<boolean>(false)
    const handleClick = () => setShow(!show)
    type Inputs = {
        email: string
        password: string
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
                        <form action="" className='flex flex-col gap-4 max-w-[500px] mx-auto' onSubmit={handleSubmit(onSubmit)}>
                        {Object.keys(errors).length > 0 && (
                            <AlertChakra description='Terdapat masalah pada form' />
                        )}
                            <FormControl className='h-[80px]'>
                                <FormLabel htmlFor='email'>Email address</FormLabel>
                                <Input type='email' id='email' className='!bg-slate-100 !border !border-slate-600 focus-visible:!border-primary-500 focus-visible:!shadow-none' {...register('email')} />
                                <p className='text-rose-600'>
                                    {errors.email && errors.email.message}
                                </p>
                            </FormControl>
                            <FormControl className='h-[80px]'>
                                <FormLabel htmlFor='password'>Password</FormLabel>
                                <InputGroup >
                                    <Input type={show ? 'text' : 'password'} id='password' placeholder='Enter password' className='!bg-slate-100 !border !border-slate-600 focus-visible:!border-primary-500 focus-visible:!shadow-none' {...register("password")} />
                                    <InputRightElement width='4.5rem'>
                                        <div onClick={handleClick}>
                                            {show ? <AiFillEye /> : <AiFillEyeInvisible />}
                                        </div>
                                    </InputRightElement>
                                </InputGroup>
                                <p className='text-rose-600'>
                                    {errors.password && errors.password.message}
                                </p>
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
