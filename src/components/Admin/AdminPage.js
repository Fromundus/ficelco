import React from 'react'
import AdminPageHeader from './AdminPageHeader'

function AdminPage({ title, children, className, to, onClick }) {
    return (
        <div className={`absolute inset-0 ${className}`} onClick={onClick}>
            <AdminPageHeader title={title} to={to} />
            <div className='pt-[61px] bg-light-background dark:bg-dark-background'>{children}</div>
        </div>
    )
}

export default AdminPage