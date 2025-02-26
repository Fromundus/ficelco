import React from 'react'
import { NavLink } from 'react-router-dom';
import { HiOutlineUserCircle } from "react-icons/hi2";
import { GoHome } from 'react-icons/go';
import { GoBell } from "react-icons/go";
import { motion } from 'framer-motion';
import { AiTwotoneShop } from 'react-icons/ai';
import { LiaShoppingBagSolid } from "react-icons/lia";
import { AiOutlineInbox } from "react-icons/ai";

function Navbar({ orders, notifications }) {
    const [ordersBadge, setOrdersBadge] = React.useState(false);
    const [notificationsBadge, setNotificationsBadge] = React.useState(false);

    React.useEffect( () => {
        if(orders.ordersPending?.length > 0 || orders.ordersToPay?.length > 0 || orders.ordersToShip?.length > 0 || orders.ordersToReceive?.length > 0 || orders.toRate?.length > 0){
            setOrdersBadge(true);
        } else {
            setOrdersBadge(false);
        }
    }, [orders]);

    React.useEffect( () => {
        let unseen = 0;

        notifications?.forEach( (item) => {
            if(item.status === "unseen"){
                unseen += 1
            }
        });

        if(unseen > 0){
            setNotificationsBadge(true);
        } else {
            setNotificationsBadge(false);
        }
    }, [notifications]);

    // console.log(notifications);

    return (
        <nav className="fixed bottom-0 flex justify-around items-center w-full py-2 text-2xl bg-white rounded-t-2xl">
            <NavLink end to="/U2FsdGVkX1+Rv7W03=">
                {({isActive}) => (isActive ? 
                    <motion.div
                        whileTap={{ scale: 0.8 }}
                        className='flex flex-col items-center relative mb-4 justify-center'>
                        <GoHome className="text-primary" />
                        <span className='text-xs absolute bottom-[-17px] text-primary'>Home</span>
                    </motion.div>
                    :
                    <motion.div
                        whileTap={{ scale: 0.8 }}
                        className='flex flex-col items-center relative mb-4 justify-center'>
                        <GoHome className="text-neutral-600" />
                        <span className='text-xs absolute bottom-[-17px]'>Home</span>
                    </motion.div>
                )}
            </NavLink>
            <NavLink to="/U2FsdGVkX1+Rv7W03=/products">
                {({isActive}) => (isActive ? 
                    <motion.div
                        whileTap={{ scale: 0.8 }}
                        className='flex flex-col items-center relative mb-4 justify-center'>
                        <LiaShoppingBagSolid className="text-primary" /> 
                        <span className='text-xs absolute bottom-[-17px] text-primary'>Products</span>
                    </motion.div>
                    : 
                    <motion.div
                        whileTap={{ scale: 0.8 }}
                        className='flex flex-col items-center relative mb-4 justify-center'>
                        <LiaShoppingBagSolid className="text-neutral-600" />
                        <span className='text-xs absolute bottom-[-17px]'>Products</span>
                    </motion.div>
                )}
            </NavLink>
            <NavLink to="/U2FsdGVkX1+Rv7W03=/shops">
                {({isActive}) => (isActive ? 
                    <motion.div
                        whileTap={{ scale: 0.8 }}
                        className='flex flex-col items-center relative mb-4 justify-center'>
                        <AiTwotoneShop className="text-primary" /> 
                        <span className='text-xs absolute bottom-[-17px] text-primary'>Shops</span>
                    </motion.div>
                    : 
                    <motion.div
                        whileTap={{ scale: 0.8 }}
                        className='flex flex-col items-center relative mb-4 justify-center'>
                        <AiTwotoneShop className="text-neutral-600" />
                        <span className='text-xs absolute bottom-[-17px]'>Shops</span>
                    </motion.div>
                    )}
            </NavLink>
            <NavLink to="orders">
                {/* {({isActive}) => (isActive ? 
                    <motion.div
                        whileTap={{ scale: 0.8 }}
                        className='flex flex-col items-center relative mb-4 justify-center relative'>
                        <FaList className="mb-5 mt-0.5 text-primary" />
                        <span className='text-xs absolute bottom-[-17px] absolute bottom-1 text-primary'>Orders</span>
                        {ordersBadge && <div className='absolute bg-white p-0.5 rounded-full top-[-3px] right-[-3px]'><div className='bg-primary h-[9px] w-[9px] rounded-full'></div></div>}
                    </motion.div>
                    : 
                    <motion.div
                        whileTap={{ scale: 0.8 }}
                        className='flex flex-col items-center relative mb-4 justify-center relative'>
                        <FaList className="mb-5 mt-0.5 text-neutral-600" />
                        <span className='text-xs absolute bottom-[-17px] absolute bottom-1'>Orders</span>
                        {ordersBadge && <div className='absolute bg-white p-0.5 rounded-full top-[-3px] right-[-3px]'><div className='bg-primary h-[9px] w-[9px] rounded-full'></div></div>}
                    </motion.div>
                    )} */}

                    {({isActive}) => (isActive ? 
                        <motion.div
                            whileTap={{ scale: 0.8 }}
                            className='flex flex-col items-center relative mb-4 justify-center'>
                            <AiOutlineInbox className="text-primary" />
                            <span className='text-xs absolute bottom-[-17px] text-primary'>Orders</span>
                        </motion.div>
                        : 
                        <motion.div
                            whileTap={{ scale: 0.8 }}
                            className='flex flex-col items-center relative mb-4 justify-center'>
                            <AiOutlineInbox className="text-neutral-600" />
                            <span className='text-xs absolute bottom-[-17px]'>Orders</span>
                        </motion.div>
                    )}
            </NavLink>
            <NavLink to="notifications">
                {/* {({isActive}) => (isActive ? 
                    <motion.div
                        whileTap={{ scale: 0.8 }}
                        className='flex flex-col items-center relative mb-4 justify-center relative'>
                        <GoBellFill className="mb-5 mt-0.5 text-primary" />
                        <span className='text-xs absolute bottom-[-17px] absolute bottom-1 text-primary'>Notifications</span>
                        {notificationsBadge && <div className='absolute bg-white p-0.5 rounded-full top-[-3px] right-[-3px]'><div className='bg-primary h-[9px] w-[9px] rounded-full'></div></div>}
                    </motion.div>
                    : 
                    <motion.div
                        whileTap={{ scale: 0.8 }}
                        className='flex flex-col items-center relative mb-4 justify-center relative'>
                        <GoBell className="mb-5 mt-0.5 text-neutral-600" />
                        <span className='text-xs absolute bottom-[-17px] absolute bottom-1'>Notifications</span>
                        {notificationsBadge && <div className='absolute bg-white p-0.5 rounded-full top-[-3px] right-[-3px]'><div className='bg-primary h-[9px] w-[9px] rounded-full'></div></div>}
                    </motion.div>
                    )} */}
                    {({isActive}) => (isActive ? 
                        <motion.div
                            whileTap={{ scale: 0.8 }}
                            className='flex flex-col items-center relative mb-4 justify-center'>
                            <GoBell className="text-primary" />
                            <span className='text-xs absolute bottom-[-17px] text-primary'>Notifications</span>
                            {notificationsBadge && <div className='absolute bg-white p-0.5 rounded-full top-[-3px] right-[-3px]'><div className='bg-primary h-[9px] w-[9px] rounded-full'></div></div>}
                        </motion.div>
                        : 
                        <motion.div
                            whileTap={{ scale: 0.8 }}
                            className='flex flex-col items-center relative mb-4 justify-center'>
                            <GoBell className="text-neutral-600" />
                            <span className='text-xs absolute bottom-[-17px]'>Notifications</span>
                            {notificationsBadge && <div className='absolute bg-white p-0.5 rounded-full top-[-3px] right-[-3px]'><div className='bg-primary h-[9px] w-[9px] rounded-full'></div></div>}
                        </motion.div>
                    )}
            </NavLink>
            <NavLink to="profile">
                {({isActive}) => (isActive ? 
                    <motion.div
                        whileTap={{ scale: 0.8 }}
                        className='flex flex-col items-center relative mb-4 justify-center'>
                        <HiOutlineUserCircle className="text-primary" />
                        <span className='text-xs absolute bottom-[-17px] text-primary'>Account</span>
                    </motion.div>
                    : 
                    <motion.div
                        whileTap={{ scale: 0.8 }}
                        className='flex flex-col items-center relative mb-4 justify-center'>
                        <HiOutlineUserCircle className="text-neutral-600" />
                        <span className='text-xs absolute bottom-[-17px]'>Account</span>
                    </motion.div>
                )}
             </NavLink>
        </nav>
    )
}

export default Navbar