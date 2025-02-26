import React from 'react'
import { NavLink } from 'react-router-dom';
import { GoHome } from "react-icons/go";
import { motion } from 'framer-motion';
import { HiOutlineUserCircle } from "react-icons/hi2";
import { AiTwotoneShop } from "react-icons/ai";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { AiOutlineInbox } from "react-icons/ai";

function Navbar() {
    return (
        <nav className="fixed bottom-0 flex justify-around items-center w-full py-2 text-2xl bg-white rounded-t-2xl">
            <NavLink to="/guest" end>
                {({isActive}) => (isActive ? 
                    <motion.div
                        whileTap={{ scale: 0.8 }}
                        className='flex flex-col items-center justify-center'>
                        <GoHome className="text-primary" />
                        <span className='text-xs text-primary'>Home</span>
                    </motion.div>
                    :
                    <motion.div
                        whileTap={{ scale: 0.8 }}
                        className='flex flex-col items-center justify-center'>
                        <GoHome className="text-neutral-600" />
                        <span className='text-xs'>Home</span>
                    </motion.div>
                )}
            </NavLink>
            <NavLink to="products">
                {({isActive}) => (isActive ? 
                    <motion.div
                        whileTap={{ scale: 0.8 }}
                        className='flex flex-col items-center justify-center'>
                        <LiaShoppingBagSolid className="text-primary" /> 
                        <span className='text-xs text-primary'>Products</span>
                    </motion.div>
                    : 
                    <motion.div
                        whileTap={{ scale: 0.8 }}
                        className='flex flex-col items-center justify-center'>
                        <LiaShoppingBagSolid className="text-neutral-600" />
                        <span className='text-xs'>Products</span>
                    </motion.div>
                    )}
            </NavLink>
            <NavLink to="shops">
                {({isActive}) => (isActive ? 
                    <motion.div
                        whileTap={{ scale: 0.8 }}
                        className='flex flex-col items-center justify-center'>
                        <AiTwotoneShop className="text-primary" /> 
                        <span className='text-xs text-primary'>Shops</span>
                    </motion.div>
                    : 
                    <motion.div
                        whileTap={{ scale: 0.8 }}
                        className='flex flex-col items-center justify-center'>
                        <AiTwotoneShop className="text-neutral-600" />
                        <span className='text-xs'>Shops</span>
                    </motion.div>
                    )}
            </NavLink>
            <NavLink to="orders">
                {({isActive}) => (isActive ? 
                    <motion.div
                        whileTap={{ scale: 0.8 }}
                        className='flex flex-col items-center justify-center'>
                        <AiOutlineInbox className="text-primary" />
                        <span className='text-xs text-primary'>Orders</span>
                    </motion.div>
                    : 
                    <motion.div
                        whileTap={{ scale: 0.8 }}
                        className='flex flex-col items-center justify-center'>
                        <AiOutlineInbox className="text-neutral-600" />
                        <span className='text-xs'>Orders</span>
                    </motion.div>
                    )}
            </NavLink>
            <NavLink to="/signup">
                {({isActive}) => (isActive ? 
                    <motion.div
                        whileTap={{ scale: 0.8 }}
                        className='flex flex-col items-center justify-center'>
                        <HiOutlineUserCircle className="text-primary" />
                        <span className='text-xs text-primary'>Account</span>
                    </motion.div>
                    : 
                    <motion.div
                        whileTap={{ scale: 0.8 }}
                        className='flex flex-col items-center justify-center'>
                        <HiOutlineUserCircle className="text-neutral-600" />
                        <span className='text-xs'>Account</span>
                    </motion.div>
                    )}
            </NavLink>
        </nav>
    )
}

export default Navbar