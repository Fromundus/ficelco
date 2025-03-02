import React from 'react'
import ThemeToggleButton from '../ThemeToggleButton'

function AdminPageHeader({ title }) {
    return (
        <div className='w-full p-3 border-b border-light-line dark:border-dark-line flex justify-between items-center bg-light-background dark:bg-dark-accent'>
            <span className='text-lg font-semibold'>{title}</span>
            <ThemeToggleButton />
        </div>
    )
}

export default AdminPageHeader