import * as React from 'react';
import { FaFacebookSquare, FaInstagram, FaYoutube } from "react-icons/fa";
interface IFooterProps {
}

const Footer: React.FunctionComponent<IFooterProps> = (props) => {
    return (
        <>
            <footer className="bg-[#F3F4F8]  border-gray-300 text-white p-14">
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-5 container mx-auto'>
                    <div className='max-w-[450px]'>
                        <h1 className='text-black text-[24px] font-bold mb-5    '>Kebun Raya</h1>
                        <p className='text-gray-300'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem sunt eos nostrum beatae harum fuga perspiciatis doloribus doloremque itaque dolores.</p>
                        <p></p>
                    </div>
                    <div className='sm:ml-20'>
                        <h1 className='font-medium font-normal text-gray-300'>Links</h1>
                        <ul className='text-black mt-5 font-medium flex sm:flex-col gap-4'>
                            <li>Home</li>
                            <li>Shop</li>
                            <li>About</li>
                            <li>Contact Us</li>
                        </ul>
                    </div>
                    <div className=''>
                        <h1 className='font-medium font-normal text-gray-300'>Social Media</h1>
                        <div className='flex items-center text-2xl gap-5 mt-5 text-black'>
                            <FaInstagram className=''/>
                            <FaFacebookSquare />
                            <FaYoutube />
                        </div>
                    </div>
                    <div>
                        <ul>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
