import React from 'react'
import AdminPage from '../../components/Admin/AdminPage'
import { FaUsers } from "react-icons/fa6";
import { BiMoneyWithdraw } from "react-icons/bi";
import { LuZapOff } from "react-icons/lu";
import { FaMoneyBill } from "react-icons/fa6";

function AdminHome() {
    return (
        <AdminPage title={"Dashboard"}>
            <div className='flex flex-wrap'>

                <div className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
                    <div className='flex bg-light-background dark:bg-dark-accent border border-light-line dark:border-dark-line rounded-lg p-4 gap-8 h-32'>
                        <div className='text-4xl flex items-center'>
                            <FaUsers />
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-lg font-semibold'>Member Consumers</span>
                            <span className='text-xl mt-auto'>12,204</span>
                        </div>
                    </div>
                </div>

                <div className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
                    <div className='flex bg-light-background dark:bg-dark-accent border border-light-line dark:border-dark-line rounded-lg p-4 gap-8 h-32'>
                        <div className='text-4xl flex items-center'>
                            <BiMoneyWithdraw />
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-lg font-semibold'>Revenue</span>
                            <span className='text-xl mt-auto'>$1.2M</span>
                        </div>
                    </div>
                </div>

                <div className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
                    <div className='flex bg-light-background dark:bg-dark-accent border border-light-line dark:border-dark-line rounded-lg p-4 gap-8 h-32'>
                        <div className='text-4xl flex items-center'>
                            <LuZapOff />
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-lg font-semibold'>Reported Outages</span>
                            <span className='text-xl mt-auto'>5</span>
                        </div>
                    </div>
                </div>

                <div className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
                    <div className='flex bg-light-background dark:bg-dark-accent border border-light-line dark:border-dark-line rounded-lg p-4 gap-8 h-32'>
                        <div className='text-4xl flex items-center'>
                            <FaMoneyBill />
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-lg font-semibold'>Pending Bills</span>
                            <span className='text-xl mt-auto'>324</span>
                        </div>
                    </div>
                </div>

            </div>
        </AdminPage>
    )
}

export default AdminHome