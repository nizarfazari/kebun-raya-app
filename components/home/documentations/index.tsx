
import * as React from 'react';
import CardDocumentions from './card';
import SliderDocumentations from './slider';

interface IDocumentationsPlantProps {
}

const DocumentationsPlant: React.FunctionComponent<IDocumentationsPlantProps> = (props) => {
  return (
    <div className='my-20'>
      <div className='flex justify-center'>
        <h1 className=' text-dark-500 md:text-5xl text-2xl font-bold border-black pb-2 px-4 border-b-[2px] inline'>Celebs <span className='text-primary-600'>You</span> Love, <span className='text-primary-600'>Love Us</span></h1>
      </div>
      <div className='mt-10'>
        <div className='hidden sm:block'>
          <div className='grid grid-cols-4 gap-[20px] mb-[20px]'>
            <CardDocumentions />
            <CardDocumentions />
            <CardDocumentions />
            <CardDocumentions />
          </div>
          <div className='grid grid-cols-3 gap-[20px]'>
            <CardDocumentions />
            <CardDocumentions />
            <CardDocumentions />
          </div>
        </div>
        <div className='sm:hidden'>
          <SliderDocumentations />
        </div>
      </div>
    </div>
  );
};

export default DocumentationsPlant;
