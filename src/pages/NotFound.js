import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <div className="grid h-screen place-content-center bg-white px-4">
            <div className="text-center flex flex-col items-center">
                <img className='w-[250px]' src="https://www.svgrepo.com/show/509009/avatar-thinking-3.svg" alt="" />

                <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Uh-oh!</p>

                <p className="mt-4 text-gray-500">We can't find that page.</p>

                <Link
                to={'/'}
                className="mt-6 inline-block rounded bg-primary px-5 py-3 text-sm font-medium text-white hover:bg-accent focus:outline-none focus:ring"
                >
                Go Back Home
                </Link>
            </div>
        </div>
    )
}

export default NotFound