import React from 'react'
import { FaUser } from "react-icons/fa6";

function BodProfile({ item }) {
    return (
        <div className='p-4 w-full md:w-1/3 lg:w-1/4'>
            <div className='flex flex-col items-center justify-center gap-4'>
                <div className='bg-neutral-200 text-light-accent dark:text-dark-foreground dark:bg-dark-secondary flex items-center justify-center p-10 rounded-full'>
                    <FaUser className='text-7xl' />
                </div>
                <div className='flex flex-col justify-center'>
                    <span className='text-lg font-semibold text-center'>{item.name}</span>
                    <span className='text-center'>{item.municipality}</span>
                </div>
            </div>
        </div>
    )
}

export default BodProfile