import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

interface ISuccessProps {
}

const Success: React.FunctionComponent<ISuccessProps> = (props) => {
    return (
        <div className='flex justify-center items-center h-[87vh]'>
            <div className='text-center'>
                <div className='flex justify-center mb-8'>
                <Image src="/assets/success.svg" width={200} height={200}   alt="" />
                </div>
                <h2 className='text-3xl font-medium mb-2'>
                    Transaction Processed!
                </h2>
                <p className='max-w-[380px]'>
                    Silahkan tunggu konfirmasi email dari kami dan kami akan
                    menginformasikan resi secept mungkin!
                </p>
                <div className='mt-10 flex flex-col gap-4'>
                    <Link href="/dashboard.html" className="py-2 text-white bg-primary-400 w-50 rounded-lg">
                        My Dashboard
                    </Link>
                    <Link href="/index.html" className="py-2 text-white bg-slate-400 w-50 rounded-lg">
                        Go To Shopping
                    </Link>
                </div>
            </div >
        </div>
    );
};

export default Success;
