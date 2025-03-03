import React from 'react'
import AdminPageHeader from './AdminPageHeader'

function AdminPage({ title, children, className }) {
    return (
        <div className={`absolute inset-0 ${className}`}>
            <AdminPageHeader title={title} />
            <div className='p-4 pt-20 bg-light-background dark:bg-dark-background'>{children}</div>
        </div>
    )
}

export default AdminPage