import React from 'react'
import { Link, Navigate, NavLink, Outlet, useLocation } from 'react-router-dom'
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
    const location = useLocation();

    if(role){
        return <Navigate to={`${role}`} />
    }

    const handleDropDownToggle = () => {
        setDropDown(prev => !prev);
    }

    const handleCloseDropDown = () => {
        setDropDown(false);
    }

    const hideNavbarRoutes = ["/login"];
    const dynamicRoutes = [];

    const shouldHideNavbar =
    hideNavbarRoutes.includes(location.pathname) || 
    dynamicRoutes.some((route) => location.pathname.startsWith(route));

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
                        to={'/news-and-updates'}
                        onClick={handleCloseDropDown}
                    >
                        {({isActive}) => (isActive ? 
                            <span className='text-secondary dark:text-primary'>Updates</span>
                            :
                            <span className='hover:text-secondary hover:dark:text-primary'>Updates</span>
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
                        to={'/biddings'}
                        onClick={handleCloseDropDown}
                    >
                        {({isActive}) => (isActive ? 
                            <span className='text-secondary dark:text-primary'>Biddings</span>
                            :
                            <span className='hover:text-secondary hover:dark:text-primary'>Biddings</span>
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
                </div>
                <div className='flex items-center gap-4'>
                    <Link className='p-2 bg-secondary dark:bg-primary-darker text-white rounded-lg' to={'/login'}>Login</Link>
                    <ThemeToggleButton />
                    <button className='md:hidden lg:hidden' onClick={handleDropDownToggle}>
                        <RiMenu3Fill className='text-2xl' />
                    </button>
                </div>
            </nav>
            <div className='pt-[82px]'>
                {dropdown &&
                    <div 
                        className='flex flex-col justify-center bg-light-background dark:bg-dark-accent text-light-foreground dark:text-dark-foreground md:hidden lg:hidden fixed z-50 w-full'>
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
                        to={'/news-and-updates'}
                        onClick={handleCloseDropDown}
                    >
                        {({isActive}) => (isActive ? 
                            <span className='text-secondary dark:text-primary'>Updates</span>
                            :
                            <span className='hover:text-secondary hover:dark:text-primary'>Updates</span>
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
                    <NavLink
                        className='p-4'
                        to={'/biddings'}
                        onClick={handleCloseDropDown}
                    >
                        {({isActive}) => (isActive ? 
                            <span className='text-secondary dark:text-primary'>Biddings</span>
                            :
                            <span className='hover:text-secondary hover:dark:text-primary'>Biddings</span>
                        )}
                    </NavLink>
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
                </div>}
            </div>
            <div className={`${!shouldHideNavbar && "min-h-[100svh]"} bg-light-background dark:bg-dark-background text-light-foreground dark:text-dark-foreground`}>
                <Outlet />
            </div>
                    
            {!shouldHideNavbar && <div>
                <Footer />
            </div>}
        </>
    )
}

export default GuestLayout