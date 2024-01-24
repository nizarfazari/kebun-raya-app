import * as React from 'react';
import PlantCard from './card';
import Buttons from '~/components/button';

interface PlantsProps {
}

const Plants: React.FunctionComponent<PlantsProps> = (props) => {
    return (
        <>
            <div className='flex justify-between items-center mb-10'>
                <h1 className='text-center text-dark-500 md:text-5xl text-2xl font-bold'>Trending Plant</h1>
                <p>See All Variants</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7'>
                <div className='col-span-1'>
                    <PlantCard />
                </div>
                <div className='col-span-1'>
                    <PlantCard />
                </div>
                <div className='col-span-1'>
                    <PlantCard />
                </div>
                <div className='col-span-1'>
                    <PlantCard />
                </div>
                <div className='col-span-1'>
                    <PlantCard />
                </div>
                <div className='col-span-1'>
                    <PlantCard />
                </div>
                <div className='col-span-1'>
                    <PlantCard />
                </div>
                <div className='col-span-1'>
                    <PlantCard />
                </div>
            </div>
        </>
    );
};

export default Plants;
