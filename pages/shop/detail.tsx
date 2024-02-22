import Image from 'next/image';
import React, { useState } from 'react';
import Buttons from '~/components/button';

interface IDetailShopProps {
}

const DetailShop: React.FunctionComponent<IDetailShopProps> = (props) => {
    const [image, setImage] = useState<string>('/assets/shop/tanaman.jpg')

    const changeImage = (value: string) => {
        setImage(value)
    }

    return (
        <div className='container mx-auto py-20'>
            <div className='block sm:grid grid-cols-2'>
                <div className='col-span-1 sm:w-[80%] sm:mx-auto mb-5'>
                    <Image src={image} height={200} width={500} className='w-full mb-4' alt={'gambar tipe main'}/>
                    <div className='grid grid-cols-3 gap-4'>
                        <Image src={'/assets/shop/tanaman.jpg'} height={200} width={500} className='w-full ' alt={'gambar tipe 1'} />
                        <Image src={'/assets/shop/tanaman.jpg'} height={200} width={500} className='w-full ' alt={'gambar tipe 2'}/>
                        <Image src={'/assets/shop/tanaman.jpg'} height={200} width={500} className='w-full ' alt={'gambar tipe 3'}/>
                    </div>
                </div>
                <div>
                    <div className='flex items-center gap-4 mb-2'>
                        <p className='category-plant '>Plants</p>
                        <p className='category-plant'>Seed</p>
                    </div>
                    <h1 className='text-3xl font-semibold mb-2'>Judul Produk</h1>
                    <p className='mb-4'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia molestiae consequuntur unde molestias exercitationem dolorum quisquam fugit. Dolorum, voluptates laudantium!
                    </p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea libero velit aperiam error reprehenderit, doloremque commodi maxime quidem ducimus deleniti voluptas corporis! Voluptates, ipsum voluptatum. Cupiditate rerum delectus eum iste nesciunt autem tempore consequatur expedita voluptates dolorum culpa ut ad eius harum aut dolorem libero provident, molestias commodi repellendus itaque vitae voluptatem sunt. Veniam, consectetur asperiores dolore perspiciatis libero, accusantium voluptatum similique minus, quam itaque nostrum adipisci totam! Ipsum numquam totam itaque optio provident omnis reiciendis cumque suscipit non aliquid inventore, voluptate, rerum sequi, ullam qui quidem quae consectetur dolorum nam eos! Sint provident, tenetur similique, facere nemo nobis illo doloribus recusandae possimus enim placeat quam? Minima enim accusamus aperiam mollitia harum cumque dolor minus dignissimos suscipit pariatur? Magnam, suscipit!</p>
                    <p className='text-primary-700 font-bold text-2xl mt-5'>Rp.2000</p>
                    <Buttons name='Tambahkan Ke Keranjang' color='primary' variant='fillDarkVariant' className='!font-bold !px-10 mt-4 !rounded-none' />
                </div>
            </div>
        </div>
    );
};

export default DetailShop;
