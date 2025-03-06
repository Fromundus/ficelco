import React from 'react'
import ThemeToggleButton from '../ThemeToggleButton'
import BackButton from '../BackButton'

function AdminPageHeader({ title, to }) {
    return (
        <div className='fixed top-0 z-50 left-0 md:left-56 lg:left-64 right-0 p-3 border-b border-light-line dark:border-dark-line flex items-center bg-light-background dark:bg-dark-accent'>
            {to && <BackButton to={to} />}
            <span className='text-lg font-semibold truncate mx-4'>{title}</span>
            <div className='ms-auto'>
                <ThemeToggleButton />
            </div>
        </div>
    )
}

export default AdminPageHeader