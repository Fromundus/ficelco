import React from 'react'
import ThemeToggleButton from '../ThemeToggleButton'

function AdminPageHeader({ title }) {
    return (
        <div className='fixed top-0 z-50 left-0 md:left-56 lg:left-64 right-0 p-3 border-b border-light-line dark:border-dark-line flex justify-between items-center bg-light-background dark:bg-dark-accent'>
            <span className='text-lg font-semibold'>{title}</span>
            <ThemeToggleButton />
        </div>
    )
}

export default AdminPageHeader