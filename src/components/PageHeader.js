import React from 'react'

function PageHeader({ title }) {
    return (
        <div className='py-4'>
            <span className='text-lg font-bold'>{title}</span>
        </div>
    )
}

export default PageHeader