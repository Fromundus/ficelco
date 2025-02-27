import React from 'react'

function PageHeader({ title }) {
    return (
        <div className='py-4'>
            <span className='text-2xl font-bold'>{title}</span>
        </div>
    )
}

export default PageHeader