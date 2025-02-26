import React from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider'
import Logo from '../components/Logo';

function GuestLayout() {
    const { role } = useStateContext();

    if(role){
        return <Navigate to={`${role}`} />
    }

    return (
        <div>
            <nav className='w-full p-4 flex items-center'>
                <Logo width={"50px"} height={"50px"} />
                <div className='flex gap-4'>
                    <Link>
                        <span>Home</span>
                    </Link>
                    <Link>
                        <span>About Us</span>
                    </Link>
                    <Link>
                        <span>Consumer Needs & Services Faqs</span>
                    </Link>
                    <Link>
                        <span>Ficelco Updates</span>
                    </Link>
                    <Link>
                        <span>Bids and Awards Commitee</span>
                    </Link>
                    <Link>
                        <span>Contact Us</span>
                    </Link>
                </div>
            </nav>
            <Outlet />
        </div>
    )
}

export default GuestLayout