import React from 'react'
import AdminPageHeader from './AdminPageHeader'

function AdminPage({ title, children }) {
    return (
        <div className='absolute inset-0'>
            <AdminPageHeader title={title} />
            <div className='p-4'>{children}</div>
        </div>
    )
}

export default AdminPage