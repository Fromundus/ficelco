import React from 'react'
import { Link } from 'react-router-dom'

function ServicesCard({ title, image }) {
    return (
        <Link to={'/'} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 flex max-h-full'>
            <div className='border border-light-line dark:border-dark-line bg-light-background dark:bg-dark-accent p-4 flex flex-col gap-4 rounded-lg h-full shadow-lg'>
                <div className='flex justify-center'>
                    <img className='w-[200px]' src={image} alt="" />
                </div>
                <div className='flex flex-col gap-2'>
                    <span className='text-lg font-semibold'>{title}</span>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus minus, autem dignissimos accusamus ad dicta nobis quo repellat, culpa voluptatibus et iste nihil officiis est nesciunt animi, neque voluptate cum?</p>
                </div>
                <button className='bg-secondary p-2 text-white rounded-lg mt-auto'>Read More</button>
            </div>
        </Link>
    )
}

export default ServicesCard