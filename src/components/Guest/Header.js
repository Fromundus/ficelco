import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdOutlineShoppingCart } from "react-icons/md";
import { motion } from 'framer-motion';

function Modal({ setIsModalOpen }){
    const navigate = useNavigate();

    function closeModal(){
        setIsModalOpen(false);
        document.body.classList.remove('no-scroll');
    }

    function signup(){
        setIsModalOpen(false);
        document.body.classList.remove('no-scroll');
        navigate("/signup");
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 overflow-y-scroll p-2 lg:px-10 lg:pt-20">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-lg max-w-xs w-full">
                <div className='flex items-center flex-col rounded-lg'>
                    <div className='flex flex-col justify-center items-center p-5'>
                        <span className='font-semibold'>Create account to access your cart.</span>
                    </div>
                </div>
                <div className='flex flex-col w-full'>
                    <button className='w-full text-primary font-bold p-3 border-t hover:bg-whover active:bg-wactive' onClick={signup}>Create Account</button>
                    <button className='w-full p-3 rounded-b-lg font-semibold border-t hover:bg-whover active:bg-wactive' onClick={closeModal}>Cancel</button>
                </div>
            </motion.div>
        </div>
    )
}

function Header() {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    function toggleModal(){
        setIsModalOpen(prev => !prev);
        document.body.classList.add("no-scroll");
    }

    return (
        <>
            <nav className="fixed z-50 w-full py-2 ps-4 pe-2 border-b flex items-center bg-white lg:px-40">
                <Link className="flex items-center" to="/">
                    {/* <img className='w-[50px]' src={logo} alt="" /> */}
                    {/* <span className='text-xl font-bold text-primary'>brielle.</span> */}
                </Link>

                <button className="relative ms-auto" onClick={toggleModal}>
                    <MdOutlineShoppingCart className="text-3xl mt-2" />
                </button>

                <div className='ms-5 lg:ms-10 flex gap-2'>
                    <Link to="login" className='border-2 border-white text-black py-1 px-2 rounded hover:text-primary'>Login</Link>
                    <Link to="signup" className='border-2 border-primary bg-primary text-white py-1 px-2 rounded hover:text-primary hover:bg-white'>Signup</Link>
                </div>
            </nav>
            {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />}
        </>
    )
}

export default Header