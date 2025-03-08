import React from 'react'

function PowerRateCard({ price, label }) {
    return (
        <div className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
            <div className='px-4 py-8 bg-light-background dark:bg-dark-accent border border-light-line dark:border-dark-line rounded-lg flex flex-col gap-2 justify-center items-center'>
                <span className='font-bold text-3xl flex items-center gap-1'>&#x20B1; {price}<span className='text-sm'> / kWh</span> </span>
                <span>{label}</span>
            </div>
        </div>
    )
}

export default PowerRateCard