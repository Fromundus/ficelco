import React from 'react'

function FeatureCard({ image, title, description }) {
    return (
        <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-2 h-full'>
            <div className='flex flex-col items-center p-4 justify-center rounded-lg'>
                <img className='w-[100px] h-full' src={image} alt="" />
                <div className='flex flex-col w-[200px]'>
                    <span className='text-lg font-bold mt-2 text-center'>{title}</span>
                    <span className='text-wrap text-center'>{description}</span>
                </div>
            </div>
        </div>
    )
}

export default FeatureCard