import Image from 'next/image';
import React from 'react';
import Buttons from '~/components/button';
import Category from '~/components/home/category';
import CategoryCard from '~/components/home/category/card';




export default function Home() {
  return (
    <main >
      <div className="container mx-auto">
        <div className=''>
          <div className='grid grid-cols-1 md:grid-cols-2 mt-20'>
            <div className='col-span-1 flex justify-center items-start flex-col order-2 sm:order-1'>
              <div className='text-center md:text-start'>
                <h1 className='lg:text-6xl  font-bold text-4xl max-w-[400px]'>Plants Make People Merrytt</h1>
                <p className='my-4 lg:text-xl text-md font-normal max-w-[600px]'>Plant gifts, care accesories, and more holday magic delivered do their door-happiness guaranteed</p>
                <Buttons name='Visit Collections' color='primary.400' variant='outlineVariant' className='!font-bold'/>
              </div>
            </div>
            <div className='col-span-1 flex justify-center order-1 sm:order-2' >
              <Image src='/assets/banner.png' width={350} height={200} alt="Logo Kebun Raya" />
            </div>
          </div>
        </div>

        <div className='my-20'>
          <Category />
        </div>
      </div>
    </main >
  )
}
