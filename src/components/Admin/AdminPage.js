import React from 'react'
import AdminPageHeader from './AdminPageHeader'

function AdminPage({ title, children, className, to }) {
    return (
        <div className={`absolute inset-0 ${className}`}>
            <AdminPageHeader title={title} to={to} />
            <div className='pt-20 bg-light-background dark:bg-dark-background'>{children}</div>
        </div>
    )
}

export default AdminPage