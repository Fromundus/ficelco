import React from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider'
import Logo from '../components/Logo';
import ThemeToggleButton from '../components/ThemeToggleButton';
import { AiOutlineMenu } from "react-icons/ai";
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

function GuestLayout() {
    const { role } = useStateContext();
    const [dropdown, setDropDown] = React.useState(false);

    if(role){
        return <Navigate to={`${role}`} />
    }


    return (
        <>
            <nav className='w-full p-4 flex items-center justify-between text-light-foreground dark:text-dark-foreground bg-light-background dark:bg-dark-accent fixed'>
                <a href='/' className='flex items-center gap-4 text-black dark:text-white'>
                    <Logo width={"50px"} height={"50px"} />
                </a>
                <div className='md:flex lg:flex gap-6 font-semibold hidden'>
                    <a href='/' className='hover:text-primary'>
                        <span>Home</span>
                    </a>
                    <Link
                        className='hover:text-primary' to={'/bill-inquiry'}>
                        <span>Bill Inquiry</span>
                    </Link>
                    <Link
                        className='hover:text-primary' to={'/biddings'}>
                        <span>Biddings</span>
                    </Link>
                    <Link
                        className='hover:text-primary' to={'/consumer-services'}>
                        <span>Consumer Services</span>
                    </Link>
                    <Link
                        className='hover:text-primary' to={'/about'}>
                        <span>About</span>
                    </Link>
                    <Link
                        className='hover:text-primary' to={'/contact'}>
                        <span>Contact</span>
                    </Link>
                </div>
                <div className='flex items-center gap-4'>
                    <ThemeToggleButton />
                    <button className='md:hidden lg:hidden' onClick={() => setDropDown(prev => !prev)}>
                        <AiOutlineMenu className='text-xl' />
                    </button>
                </div>
            </nav>
            <div className='pt-[82px]'>
                {dropdown &&
                    <div 
                        className='flex flex-col justify-center bg-light-background dark:bg-dark-accent text-light-foreground dark:text-dark-foreground md:hidden lg:hidden'>
                    <a href='/' className='p-4 flex hover:text-primary' onClick={() => setDropDown(false)}>
                        <span>Home</span>
                    </a>
                    <Link className='p-4 flex hover:text-primary' to={'/bill-inquiry'} onClick={() => setDropDown(false)}>
                        <span>Bill Inquiry</span>
                    </Link>
                    <Link className='p-4 flex hover:text-primary' to={'/biddings'} onClick={() => setDropDown(false)}>
                        <span>Biddings</span>
                    </Link>
                    <Link className='p-4 flex hover:text-primary' to={'/consumer-services'} onClick={() => setDropDown(false)}>
                        <span>Consumer Services</span>
                    </Link>
                    <Link className='p-4 flex hover:text-primary' to={'/about'} onClick={() => setDropDown(false)}>
                        <span>About</span>
                    </Link>
                    <Link className='p-4 flex hover:text-primary' to={'/contact'} onClick={() => setDropDown(false)}>
                        <span>Contact</span>
                    </Link>
                </div>}
            </div>
            <div className='min-h-[100svh] bg-light-background dark:bg-dark-background text-light-foreground dark:text-dark-foreground'>
                <Outlet />
            </div>
                    
            <div>
                <Footer />
            </div>
        </>
    )
}

export default GuestLayout