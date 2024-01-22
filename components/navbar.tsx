import * as React from 'react';

interface IAppProps {
}

const Navbar: React.FunctionComponent = (props) => {
    return (
        <nav>
            <div className='flex'>
                <div>
                    <img src="" alt="" />
                </div>
                <div>
                    <ul className='flex gap-x-4'>
                        <li className='title'>Home</li>
                        <li className='title'>Shop</li>
                        <li className='title'>About</li>
                        <li className='title'>Contact</li>
                    </ul>
                </div>
                <div>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </nav>

    );
};

export default Navbar;
