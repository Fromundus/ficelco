import React from 'react'
import { Link, Navigate, NavLink, Outlet } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider'
import Logo from '../components/Logo';
import ThemeToggleButton from '../components/ThemeToggleButton';
import { AiOutlineMenu } from "react-icons/ai";
import { motion } from 'framer-motion';
import { RiMenu3Fill } from "react-icons/ri";
import Footer from '../components/Footer';

function GuestLayout() {
    const { role } = useStateContext();
    const [dropdown, setDropDown] = React.useState(false);
    const [biddings, setBiddings] = React.useState(false);

    if(role){
        return <Navigate to={`${role}`} />
    }

    const handleDropDownToggle = () => {
        setDropDown(prev => !prev);
        window.scrollTo(0, 0);
    }

    const handleCloseDropDown = () => {
        setBiddings(false)
        setDropDown(false);
        window.scrollTo(0, 0);
    }

    return (
        <>
            <nav className='w-full p-4 flex items-center justify-between text-light-foreground dark:text-dark-foreground bg-light-background dark:bg-dark-accent fixed z-50'>
                <a href='/' className='flex items-center gap-4 text-black dark:text-white'>
                    <Logo width={"50px"} height={"50px"} />
                </a>
                <div className='md:flex lg:flex gap-6 font-semibold hidden'>
                    <NavLink
                        to={'/'}
                        onClick={handleCloseDropDown}
                    >
                        {({isActive}) => (isActive ? 
                            <span className='text-secondary dark:text-primary'>Home</span>
                            :
                            <span className='hover:text-secondary hover:dark:text-primary'>Home</span>
                        )}
                    </NavLink>
                    <NavLink
                        to={'/bill-inquiry'}
                        onClick={handleCloseDropDown}
                    >
                        {({isActive}) => (isActive ? 
                            <span className='text-secondary dark:text-primary'>Bill Inquiry</span>
                            :
                            <span className='hover:text-secondary hover:dark:text-primary'>Bill Inquiry</span>
                        )}
                    </NavLink>
                    <div
                        className='cursor-pointer relative'
                        onClick={() => setBiddings(prev => !prev)}
                    >
                        <span className='hover:text-secondary hover:dark:text-primary'>Biddings</span>

                        {biddings && <div className='absolute top-10 w-[200px] bg-light-muted dark:bg-dark-secondary rounded-lg shadow-lg flex flex-col py-2'>
                            <Link
                                to={'/biddings/invitation-to-bid'}
                                className='dark:hover:bg-dark-primary py-2 px-4 font-normal'
                            >
                                <span>Invitation to Bid</span>
                            </Link>
                            <Link
                                to={'/biddings/awards'}
                                className='dark:hover:bg-dark-primary py-2 px-4 font-normal'
                            >
                                <span>Awards</span>
                            </Link>
                        </div>}
                    </div>
                    <NavLink
                        to={'/consumer-services'}
                        onClick={handleCloseDropDown}
                    >
                        {({isActive}) => (isActive ? 
                            <span className='text-secondary dark:text-primary'>Consumer Services</span>
                            :
                            <span className='hover:text-secondary hover:dark:text-primary'>Consumer Services</span>
                        )}
                    </NavLink>
                    <NavLink
                        to={'/about'}
                        onClick={handleCloseDropDown}
                    >
                        {({isActive}) => (isActive ? 
                            <span className='text-secondary dark:text-primary'>About</span>
                            :
                            <span className='hover:text-secondary hover:dark:text-primary'>About</span>
                        )}
                    </NavLink>
                    <NavLink
                        to={'/contact'}
                        onClick={handleCloseDropDown}
                    >
                        {({isActive}) => (isActive ? 
                            <span className='text-secondary dark:text-primary'>Contact</span>
                            :
                            <span className='hover:text-secondary hover:dark:text-primary'>Contact</span>
                        )}
                    </NavLink>
                </div>
                <div className='flex items-center gap-4'>
                    <ThemeToggleButton />
                    <button className='md:hidden lg:hidden' onClick={handleDropDownToggle}>
                        <RiMenu3Fill className='text-2xl' />
                    </button>
                </div>
            </nav>
            <div className='pt-[82px]'>
                {dropdown &&
                    <div 
                        className='flex flex-col justify-center bg-light-background dark:bg-dark-accent text-light-foreground dark:text-dark-foreground md:hidden lg:hidden'>
                    <NavLink
                        className='p-4 flex'
                        to={'/'}
                        onClick={handleCloseDropDown}
                    >
                        {({isActive}) => (isActive ? 
                            <span className='text-secondary dark:text-primary'>Home</span>
                            :
                            <span className='hover:text-secondary hover:dark:text-primary'>Home</span>
                        )}
                    </NavLink>
                    <NavLink
                        className='p-4 flex'
                        to={'/bill-inquiry'}
                        onClick={handleCloseDropDown}
                    >
                        {({isActive}) => (isActive ? 
                            <span className='text-secondary dark:text-primary'>Bill Inquiry</span>
                            :
                            <span className='hover:text-secondary hover:dark:text-primary'>Bill Inquiry</span>
                        )}
                    </NavLink>
                    {/* <NavLink
                        className='p-4 flex'
                        to={'/biddings'}
                        onClick={handleCloseDropDown}
                    >
                        {({isActive}) => (isActive ? 
                            <span className='text-secondary dark:text-primary'>Biddings</span>
                            :
                            <span className='hover:text-secondary hover:dark:text-primary'>Biddings</span>
                        )}
                    </NavLink> */}
                    <div
                        className='cursor-pointer relative p-4'
                        onClick={() => setBiddings(prev => !prev)}
                    >
                        <span className='hover:text-secondary hover:dark:text-primary'>Biddings</span>

                        {biddings && <div className='absolute top-10 w-[200px] bg-light-muted dark:bg-dark-secondary rounded-lg shadow-lg flex flex-col py-2'>
                            <Link
                                to={'/biddings/invitation-to-bid'}
                                className='dark:hover:bg-dark-primary py-2 px-4 font-normal'
                                onClick={handleCloseDropDown}
                            >
                                <span>Invitation to Bid</span>
                            </Link>
                            <Link
                                to={'/biddings/awards'}
                                className='dark:hover:bg-dark-primary py-2 px-4 font-normal'
                                onClick={handleCloseDropDown}
                            >
                                <span>Awards</span>
                            </Link>
                        </div>}
                    </div>
                    <NavLink
                        className='p-4 flex'
                        to={'/consumer-services'}
                        onClick={handleCloseDropDown}
                    >
                        {({isActive}) => (isActive ? 
                            <span className='text-secondary dark:text-primary'>Consumer Services</span>
                            :
                            <span className='hover:text-secondary hover:dark:text-primary'>Consumer Services</span>
                        )}
                    </NavLink>
                    <NavLink
                        className='p-4 flex'
                        to={'/about'}
                        onClick={handleCloseDropDown}
                    >
                        {({isActive}) => (isActive ? 
                            <span className='text-secondary dark:text-primary'>About</span>
                            :
                            <span className='hover:text-secondary hover:dark:text-primary'>About</span>
                        )}
                    </NavLink>
                    <NavLink
                        className='p-4 flex'
                        to={'/contact'}
                        onClick={handleCloseDropDown}
                    >
                        {({isActive}) => (isActive ? 
                            <span className='text-secondary dark:text-primary'>Contact</span>
                            :
                            <span className='hover:text-secondary hover:dark:text-primary'>Contact</span>
                        )}
                    </NavLink>
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