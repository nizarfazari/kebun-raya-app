import * as React from 'react';
import PlantCard from './card';
import { FaArrowRight } from "react-icons/fa";

interface PlantsProps {
}

const Plants: React.FunctionComponent<PlantsProps> = (props) => {
    return (
        <>
            <div className='flex justify-between items-center mb-10'>
                <h1 className='text-center text-dark-500 md:text-5xl text-2xl font-bold'>Trending Plant</h1>
                <p className='text-primary-500 flex items-center'>See All Variants <FaArrowRight className='ml-3'/></p>
            </div>
            <div className='grid grid-cols-2 lg:grid-cols-4  gap-4 sm:gap-7'>
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
