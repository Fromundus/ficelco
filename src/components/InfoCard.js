import React from 'react'
import { Link } from 'react-router-dom'

function InfoCard({ link, image, title, header, description }) {
    return (
        <Link to={link} className='p-2 w-full sm:w-1/2 md:w-1/2 lg:w-1/3 rounded-lg'>
            <div className="group relative bg-black h-full rounded-lg">
                <img
                    alt=""
                    src={image}
                    className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50 rounded-lg"
                />

                <div className="relative p-4 sm:p-6 lg:p-8">
                    <p className="text-sm font-medium uppercase tracking-widest text-primary">{title}</p>

                    <p className="text-xl font-bold text-white sm:text-2xl">{header}</p>

                    <div className="mt-32 sm:mt-48 lg:mt-64">
                    <div
                        className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
                    >
                        <p className="text-sm text-white">
                            {description}
                        </p>
                    </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default InfoCard