import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Buttons from './button';
import { theme } from '~/theme/themeConfig';
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import Link from 'next/link';
interface IAppProps {
}

const Navbar: React.FunctionComponent = (props) => {

    const [isOpen, setIsOpen] = useState<boolean>(true)
    const [isActive, setIsActive] = useState<number>(0)

    const datas = [
        {
            name: 'Home',
            path: '/'
        },
        {
            name: 'Shop',
            path: '/shop'
        },
        {
            name: 'About',
            path: '/about'
        },
        {
            name: 'Contact',
            path: '/contact'
        },
    ]

    const isOpenNavbar = () => {
        setIsOpen(!isOpen)
    }
    const isActiveLink = (v: number) => {
        setIsActive(v)
    }
    const handleResize = () => {
        setIsOpen(window.innerWidth > 425 ? false : true)
    };

    useEffect(() => {
        // Tambahkan event listener
        window.addEventListener('resize', handleResize);

        // Bersihkan event listener saat komponen di-unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <header>
            <nav className='shadow-lg fixed w-full bg-white z-50'>
                <div className='flex justify-between items-center container mx-auto py-2 '>
                    <div>
                        <Image src='/assets/logo.png' width={70} height={70} alt="Logo Kebun Raya" priority />
                    </div>
                    <div className='md:block hidden'>
                        <ul className='flex gap-x-4'>
                            {
                                datas.map((v, i) => (
                                    <li key={i} onClick={(_) => isActiveLink(i)}>
                                        <Link href={v.path} className={`title ${isActive === i ? 'active' : ''}`} >{v.name}</Link>
                                    </li>
                                ))
                            }

                        </ul>
                    </div>
                    <div className='items-center gap-4 md:flex  hidden'>
                        <Buttons name='Sign In' color='primary.400' variant='fillVariant' />
                        <Buttons name='Sign Up' variant='outlineVariant' color='primary.400' />
                    </div>
                    <div className='block md:hidden'>
                        {isOpen ? <RxHamburgerMenu className='text-2xl' onClick={isOpenNavbar} /> : <AiOutlineClose className='text-2xl' onClick={isOpenNavbar} />}
                    </div>
                </div>
            </nav>
            <div className={`z-10 block md:hidden absolute left-0 w-full transition-all delay-200 bg-white top-[90px] h-full  ${isOpen ? 'left-[-1500px]' : 'left-0'}`}>
                <div className='container mx-auto mt-7'>
                    <ul className='flex flex-col gap-4'>
                        <li className='title'>Home</li>
                        <li className='title'>Shop</li>
                        <li className='title'>About</li>
                        <li className='title'>Contact</li>
                        <Buttons name='Sign In' color='primary.400' variant='fillVariant' className='mt-10' />
                        <Buttons name='Sign Up' variant='outlineVariant' color='primary.400' />
                    </ul>
                </div>
            </div>
        </header>

    );
};

export default Navbar;
